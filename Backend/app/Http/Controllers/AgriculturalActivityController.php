<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AgriculturalActivityController extends Controller
{
    public function index(Request $request)
    {
        $agriculturalActivities = DB::select('CALL sp_get_all_agricultural_activities()');
        return response()->json($agriculturalActivities);
    }

    public function store(Request $request)
    {
        $validated = $this->validateAgriculturalActivity($request);

        DB::select('CALL sp_insert_agricultural_activity(?, ?, ?, ?, ?, ?, ?, ?, @id)', [
            $validated['household_id'],
            $validated['engaged_in_agriculture'] ?? false,
            $validated['crop_farming'] ?? false,
            $validated['tree_growing'] ?? false,
            $validated['livestock_rearing'] ?? false,
            $validated['fish_farming'] ?? false,
            $validated['male_engaged'] ?? null,
            $validated['female_engaged'] ?? null
        ]);

        $id = DB::select('SELECT @id as id')[0]->id;
        return $this->show($id);
    }

    public function show($id)
    {
        $agriculturalActivity = DB::select('CALL sp_get_agricultural_activity(?)', [$id]);
        return response()->json($agriculturalActivity[0]);
    }

    public function update(Request $request, $id)
    {
        // First get the current record
        $current = DB::select('CALL sp_get_agricultural_activity(?)', [$id]);
        if (empty($current)) {
            return response()->json(['error' => 'Record not found'], 404);
        }

        // Define all possible fields that can be updated
        $updatableFields = [
            'household_id', 'engaged_in_agriculture', 'crop_farming', 'tree_growing',
            'livestock_rearing', 'fish_farming', 'male_engaged', 'female_engaged'
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

        $query = 'UPDATE AgriculturalActivity SET ' . implode(', ', $setClauses) . ' WHERE agriculture_id = ?';
        $params[] = $id;

        // Execute the update
        DB::update($query, $params);

        return $this->show($id);
    }

    public function destroy($id)
    {
        try {
            DB::select('CALL sp_delete_agricultural_activity(?)', [$id]);
            return response()->json(['success' => true, 'message' => 'Agricultural activity record deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function getByHousehold($household_id)
    {
        $agriculturalActivities = DB::select('CALL sp_get_agricultural_activities_by_household(?)', [$household_id]);
        return response()->json($agriculturalActivities);
    }

    private function validateAgriculturalActivity(Request $request)
    {
        return $request->validate([
            'household_id' => 'required|exists:household,household_id',
            'engaged_in_agriculture' => 'nullable|boolean',
            'crop_farming' => 'nullable|boolean',
            'tree_growing' => 'nullable|boolean',
            'livestock_rearing' => 'nullable|boolean',
            'fish_farming' => 'nullable|boolean',
            'male_engaged' => 'nullable|integer|min:0',
            'female_engaged' => 'nullable|integer|min:0'
        ]);
    }
}
