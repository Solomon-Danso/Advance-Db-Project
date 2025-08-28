<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FertilityController extends Controller
{
    public function index(Request $request)
    {
        $fertilities = DB::select('CALL sp_get_all_fertilities()');
        return response()->json($fertilities);
    }

    public function store(Request $request)
    {
        $validated = $this->validateFertility($request);

        DB::select('CALL sp_insert_fertility(?, ?, ?, ?, ?, ?, ?, @id)', [
            $validated['person_id'],
            $validated['children_ever_born_male'] ?? null,
            $validated['children_ever_born_female'] ?? null,
            $validated['children_surviving_male'] ?? null,
            $validated['children_surviving_female'] ?? null,
            $validated['children_born_past_12_months_male'] ?? null,
            $validated['children_born_past_12_months_female'] ?? null
        ]);

        $id = DB::select('SELECT @id as id')[0]->id;
        return $this->show($id);
    }

    public function show($id)
    {
        $fertility = DB::select('CALL sp_get_fertility(?)', [$id]);
        return response()->json($fertility[0]);
    }

    public function update(Request $request, $id)
    {
        // First get the current record
        $current = DB::select('CALL sp_get_fertility(?)', [$id]);
        if (empty($current)) {
            return response()->json(['error' => 'Record not found'], 404);
        }

        // Define all possible fields that can be updated
        $updatableFields = [
            'person_id', 'children_ever_born_male', 'children_ever_born_female',
            'children_surviving_male', 'children_surviving_female',
            'children_born_past_12_months_male', 'children_born_past_12_months_female'
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

        $query = 'UPDATE Fertility SET ' . implode(', ', $setClauses) . ' WHERE fertility_id = ?';
        $params[] = $id;

        // Execute the update
        DB::update($query, $params);

        return $this->show($id);
    }

    public function destroy($id)
    {
        try {
            DB::select('CALL sp_delete_fertility(?)', [$id]);
            return response()->json(['success' => true, 'message' => 'Fertility record deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function getByPerson($person_id)
    {
        $fertilities = DB::select('CALL sp_get_fertilities_by_person(?)', [$person_id]);
        return response()->json($fertilities);
    }

    private function validateFertility(Request $request)
    {
        return $request->validate([
            'person_id' => 'required|exists:person,person_id',
            'children_ever_born_male' => 'nullable|integer|min:0',
            'children_ever_born_female' => 'nullable|integer|min:0',
            'children_surviving_male' => 'nullable|integer|min:0',
            'children_surviving_female' => 'nullable|integer|min:0',
            'children_born_past_12_months_male' => 'nullable|integer|min:0',
            'children_born_past_12_months_female' => 'nullable|integer|min:0'
        ]);
    }
}
