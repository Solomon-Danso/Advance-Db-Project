<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DisabilityController extends Controller
{
    public function index(Request $request)
    {
        $disabilities = DB::select('CALL sp_get_all_disabilities()');
        return response()->json($disabilities);
    }

    public function store(Request $request)
    {
        $validated = $this->validateDisability($request);

        DB::select('CALL sp_insert_disability(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @id)', [
            $validated['person_id'],
            $validated['has_disability'] ?? false,
            $validated['sight_disability'] ?? false,
            $validated['hearing_disability'] ?? false,
            $validated['speech_disability'] ?? false,
            $validated['physical_disability'] ?? false,
            $validated['intellectual_disability'] ?? false,
            $validated['emotional_disability'] ?? false,
            $validated['other_disability'] ?? false,
            $validated['other_disability_description'] ?? null,
            $validated['owns_mobile_phone'] ?? false,
            $validated['uses_internet'] ?? false
        ]);

        $id = DB::select('SELECT @id as id')[0]->id;
        return $this->show($id);
    }

    public function show($id)
    {
        $disability = DB::select('CALL sp_get_disability(?)', [$id]);
        return response()->json($disability[0]);
    }

    public function update(Request $request, $id)
    {
        // First get the current record
        $current = DB::select('CALL sp_get_disability(?)', [$id]);
        if (empty($current)) {
            return response()->json(['error' => 'Record not found'], 404);
        }

        // Define all possible fields that can be updated
        $updatableFields = [
            'person_id', 'has_disability', 'sight_disability', 'hearing_disability',
            'speech_disability', 'physical_disability', 'intellectual_disability',
            'emotional_disability', 'other_disability', 'other_disability_description',
            'owns_mobile_phone', 'uses_internet'
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

        $query = 'UPDATE Disability SET ' . implode(', ', $setClauses) . ' WHERE disability_id = ?';
        $params[] = $id;

        // Execute the update
        DB::update($query, $params);

        return $this->show($id);
    }

    public function destroy($id)
    {
        try {
            DB::select('CALL sp_delete_disability(?)', [$id]);
            return response()->json(['success' => true, 'message' => 'Disability record deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function getByPerson($person_id)
    {
        $disabilities = DB::select('CALL sp_get_disabilities_by_person(?)', [$person_id]);
        return response()->json($disabilities);
    }

    private function validateDisability(Request $request)
    {
        return $request->validate([
            'person_id' => 'required|exists:person,person_id',
            'has_disability' => 'nullable|boolean',
            'sight_disability' => 'nullable|boolean',
            'hearing_disability' => 'nullable|boolean',
            'speech_disability' => 'nullable|boolean',
            'physical_disability' => 'nullable|boolean',
            'intellectual_disability' => 'nullable|boolean',
            'emotional_disability' => 'nullable|boolean',
            'other_disability' => 'nullable|boolean',
            'other_disability_description' => 'nullable|string|max:100',
            'owns_mobile_phone' => 'nullable|boolean',
            'uses_internet' => 'nullable|boolean'
        ]);
    }
}
