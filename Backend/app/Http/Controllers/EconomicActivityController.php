<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EconomicActivityController extends Controller
{
    public function index(Request $request)
    {
        $activities = DB::select('CALL sp_get_all_economic_activities()');
        return response()->json($activities);
    }

public function store(Request $request)
{
    $validated = $this->validateEconomicActivity($request);

    DB::select('CALL sp_insert_economic_activity(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @id)', [
        $validated['person_id'],
        $validated['engaged_in_activity'] ?? false,
        $validated['engagement_status'],
        $validated['reason_not_seeking_work'] ?? null,
        $validated['occupation_code'] ?? null,
        $validated['occupation_description'] ?? null,
        $validated['industry_establishment_name'] ?? null,
        $validated['industry_establishment_location'] ?? null,
        $validated['industry_product_service'] ?? null,
        $validated['employment_status'],
        $validated['employment_sector']  // This was missing
    ]);

    $id = DB::select('SELECT @id as id')[0]->id;
    return $this->show($id);
}

    public function show($id)
    {
        $activity = DB::select('CALL sp_get_economic_activity(?)', [$id]);
        return response()->json($activity[0]);
    }

   public function update(Request $request, $id)
{
    // First get the current record
    $current = DB::select('CALL sp_get_economic_activity(?)', [$id]);
    if (empty($current)) {
        return response()->json(['error' => 'Record not found'], 404);
    }

    // Define all possible fields that can be updated with their proper enum values
    $updatableFields = [
        'person_id',
        'engaged_in_activity',
        'engagement_status' => [
            'Did not work but had job to go back to',
            'Worked before, seeking work and available',
            'Seeking work for the first time and available',
            'Did voluntary work without pay',
            'Did not work and not seeking work'
        ],
        'reason_not_seeking_work' => [
            'Did home duties',
            'In full time education',
            'Pensioner/Retiree',
            'Disabled/sick to work',
            'Too old/too young',
            'Other'
        ],
        'occupation_code',
        'occupation_description',
        'industry_establishment_name',
        'industry_establishment_location',
        'industry_product_service',
        'employment_status' => [
            'Employee',
            'Self employed without employees',
            'Self employed with employees',
            'Casual worker',
            'Contributing family worker',
            'Apprentice',
            'Domestic employee',
            'Other'
        ],
        'employment_sector' => [
            'Public (Government)',
            'Private Formal',
            'Private Informal',
            'Semi-Public/Parastatal',
            'NGO/Local and International',
            'International Organisation'
        ]
    ];

    // Build the dynamic UPDATE query
    $setClauses = [];
    $params = [];

    foreach ($updatableFields as $field => $allowedValues) {
        // If it's a simple field (not an enum with specific values)
        if (is_numeric($field)) {
            $field = $allowedValues;
            $allowedValues = null;
        }

        if (!$request->filled($field)) {
            continue;
        }

        $value = $request->$field;

        // Validate enum values if specified
        if ($allowedValues && !in_array($value, $allowedValues)) {
            return response()->json(['error' => "Invalid value for {$field}"], 422);
        }

        $setClauses[] = "{$field} = ?";
        $params[] = $value;
    }

    // If no fields to update, return current data
    if (empty($setClauses)) {
        return $this->show($id);
    }

    $query = 'UPDATE EconomicActivity SET ' . implode(', ', $setClauses) . ' WHERE activity_id = ?';
    $params[] = $id;

    \Log::info('Economic Activity Update Query:', ['query' => $query, 'params' => $params]);

    // Execute the update
    DB::update($query, $params);

    return $this->show($id);
}

    public function destroy($id)
    {
        try {
            DB::select('CALL sp_delete_economic_activity(?)', [$id]);
            return response()->json(['success' => true, 'message' => 'Economic activity deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function getByPerson($person_id)
    {
        $activities = DB::select('CALL sp_get_economic_activities_by_person(?)', [$person_id]);
        return response()->json($activities);
    }

    private function validateEconomicActivity(Request $request)
    {
        return $request->validate([
            'person_id' => 'required|exists:person,person_id',
            'engaged_in_activity' => 'nullable|boolean',
            'engagement_status' => 'required|in:Did not work but had job to go back to,Worked before, seeking work and available,Seeking work for the first time and available,Did voluntary work without pay,Did not work and not seeking work',
            'reason_not_seeking_work' => 'nullable|in:Did home duties,In full time education,Pensioner/Retiree,Disabled/sick to work,Too old/too young,Other',
            'occupation_code' => 'nullable|string|max:10',
            'occupation_description' => 'nullable|string|max:100',
            'industry_establishment_name' => 'nullable|string|max:100',
            'industry_establishment_location' => 'nullable|string|max:100',
            'industry_product_service' => 'nullable|string|max:100',
            'employment_status' => 'required|in:Employee,Self employed without employees,Self employed with employees,Casual worker,Contributing family worker,Apprentice,Domestic employee,Other',
            'employment_sector' => 'required|in:Public (Government),Private Formal,Private Informal,Semi-Public/Parastatal,NGO/Local and International,International Organisation'
        ]);
    }
}
