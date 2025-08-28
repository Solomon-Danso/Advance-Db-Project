<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EducationController extends Controller
{
    public function index(Request $request)
    {
        $educations = DB::select('CALL sp_get_all_educations()');
        return response()->json($educations);
    }

    public function store(Request $request)
    {
        $validated = $this->validateEducation($request);

        DB::select('CALL sp_insert_education(?, ?, ?, ?, ?, @id)', [
            $validated['person_id'],
            $validated['literacy_language'] ?? null,
            $validated['ever_attended_school'] ?? false,
            $validated['highest_level_schooling'],
            $validated['highest_grade_completed'] ?? null
        ]);

        $id = DB::select('SELECT @id as id')[0]->id;
        return $this->show($id);
    }

    public function show($id)
    {
        $education = DB::select('CALL sp_get_education(?)', [$id]);
        return response()->json($education[0]);
    }

public function update(Request $request, $id)
{
    // First get the current record
    $current = DB::select('CALL sp_get_education(?)', [$id]);
    if (empty($current)) {
        return response()->json(['error' => 'Record not found'], 404);
    }

    // Define all possible fields that can be updated
    $updatableFields = [
        'person_id', 'literacy_language', 'ever_attended_school',
        'highest_level_schooling', 'highest_grade_completed'
    ];

    // Build the dynamic UPDATE query
    $setClauses = [];
    $params = [];

    foreach ($updatableFields as $field) {
        if (!$request->filled($field)) {
            continue;
        }

        $value = $request->$field;
        $setClauses[] = "{$field} = ?";
        $params[] = $value;
    }

    // If no fields to update, return current data
    if (empty($setClauses)) {
        return $this->show($id);
    }

    $query = 'UPDATE Education SET ' . implode(', ', $setClauses) . ' WHERE education_id = ?';
    $params[] = $id;

    // Execute the update
    DB::update($query, $params);

    return $this->show($id);
}

    public function destroy($id)
    {
        try {
            DB::select('CALL sp_delete_education(?)', [$id]);
            return response()->json(['success' => true, 'message' => 'Education record deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function getByPerson($person_id)
    {
        $educations = DB::select('CALL sp_get_educations_by_person(?)', [$person_id]);
        return response()->json($educations);
    }

    private function validateEducation(Request $request)
    {
        return $request->validate([
            'person_id' => 'required|exists:person,person_id',
            'literacy_language' => 'nullable|string|max:50',
            'ever_attended_school' => 'nullable|boolean',
            'highest_level_schooling' => 'required|in:Nursery,Kindergarten,Primary,JSS/JHS,Middle,SSS/SHS,Secondary,Voc/technical/commercial,Post middle/secondary certificate,Post secondary Diploma,Bachelor degree,Post graduate',
            'highest_grade_completed' => 'nullable|integer|min:0|max:20'
        ]);
    }
}
