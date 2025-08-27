<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EconomicActivityController extends Controller
{
    public function show($personId)
    {
        $activity = DB::select('CALL sp_get_economic_activity(?)', [$personId]);
        return response()->json($activity[0] ?? null);
    }

    public function store(Request $request)
    {
        $validated = $this->validateEconomicActivity($request);

        DB::select('CALL sp_upsert_economic_activity(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @id)', [
            $validated['person_id'],
            $validated['engaged_in_activity'],
            $validated['engagement_status'],
            $validated['reason_not_seeking_work'],
            $validated['occupation_code'],
            $validated['occupation_description'],
            $validated['industry_establishment_name'],
            $validated['industry_establishment_location'],
            $validated['industry_product_service'],
            $validated['employment_status'],
            $validated['employment_sector']
        ]);

        return $this->show($validated['person_id']);
    }

    private function validateEconomicActivity(Request $request)
    {
        return $request->validate([
            'person_id' => 'required|exists:person,person_id',
            'engaged_in_activity' => 'required|boolean',
            'engagement_status' => 'required|string|max:50',
            'reason_not_seeking_work' => 'nullable|string|max:100',
            'occupation_code' => 'nullable|string|max:10',
            'occupation_description' => 'nullable|string|max:100',
            'industry_establishment_name' => 'nullable|string|max:100',
            'industry_establishment_location' => 'nullable|string|max:100',
            'industry_product_service' => 'nullable|string|max:100',
            'employment_status' => 'required|string|max:50',
            'employment_sector' => 'required|string|max:50'
        ]);
    }
}
