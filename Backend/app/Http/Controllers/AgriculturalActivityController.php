<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AgriculturalActivityController extends Controller
{
    public function show($householdId)
    {
        $activity = DB::select('CALL sp_get_agricultural_activity(?)', [$householdId]);
        return response()->json($activity[0] ?? null);
    }

    public function store(Request $request)
    {
        $validated = $this->validateAgriculturalActivity($request);

        DB::select('CALL sp_upsert_agricultural_activity(?, ?, ?, ?, ?, ?, @id)', [
            $validated['household_id'],
            $validated['engaged_in_agriculture'],
            $validated['crop_farming'],
            $validated['tree_growing'],
            $validated['livestock_rearing'],
            $validated['fish_farming'],
            $validated['male_engaged'],
            $validated['female_engaged']
        ]);

        return $this->show($validated['household_id']);
    }

    private function validateAgriculturalActivity(Request $request)
    {
        return $request->validate([
            'household_id' => 'required|exists:household,household_id',
            'engaged_in_agriculture' => 'required|boolean',
            'crop_farming' => 'required|boolean',
            'tree_growing' => 'required|boolean',
            'livestock_rearing' => 'required|boolean',
            'fish_farming' => 'required|boolean',
            'male_engaged' => 'required|integer|min:0',
            'female_engaged' => 'required|integer|min:0'
        ]);
    }
}
