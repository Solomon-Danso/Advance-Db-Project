<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MortalityController extends Controller
{
    public function index($householdId)
    {
        $mortality = DB::select('CALL sp_get_mortality_records(?)', [$householdId]);
        return response()->json($mortality);
    }

    public function store(Request $request)
    {
        $validated = $this->validateMortality($request);

        DB::select('CALL sp_insert_mortality(?, ?, ?, ?, ?, ?, @id)', [
            $validated['household_id'],
            $validated['deceased_name'],
            $validated['sex'],
            $validated['age_at_death'],
            $validated['death_due_to_accident_violence'],
            $validated['female_12_54_death_related_to_pregnancy'],
            $validated['year_of_death']
        ]);

        $id = DB::select('SELECT @id as id')[0]->id;
        return response()->json(['id' => $id], 201);
    }

    private function validateMortality(Request $request)
    {
        return $request->validate([
            'household_id' => 'required|exists:household,household_id',
            'deceased_name' => 'required|string|max:100',
            'sex' => 'required|in:Male,Female',
            'age_at_death' => 'required|integer|min:0',
            'death_due_to_accident_violence' => 'required|boolean',
            'female_12_54_death_related_to_pregnancy' => 'nullable|boolean',
            'year_of_death' => 'required|integer|min:1900|max:' . (date('Y') + 1)
        ]);
    }
}
