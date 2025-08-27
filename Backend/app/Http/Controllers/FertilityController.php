<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FertilityController extends Controller
{
    public function show($personId)
    {
        $fertility = DB::select('CALL sp_get_fertility(?)', [$personId]);
        return response()->json($fertility[0] ?? null);
    }

    public function store(Request $request)
    {
        $validated = $this->validateFertility($request);

        DB::select('CALL sp_upsert_fertility(?, ?, ?, ?, ?, ?, ?, @id)', [
            $validated['person_id'],
            $validated['children_ever_born_male'],
            $validated['children_ever_born_female'],
            $validated['children_surviving_male'],
            $validated['children_surviving_female'],
            $validated['children_born_past_12_months_male'],
            $validated['children_born_past_12_months_female']
        ]);

        return $this->show($validated['person_id']);
    }

    private function validateFertility(Request $request)
    {
        return $request->validate([
            'person_id' => 'required|exists:person,person_id',
            'children_ever_born_male' => 'required|integer|min:0',
            'children_ever_born_female' => 'required|integer|min:0',
            'children_surviving_male' => 'required|integer|min:0',
            'children_surviving_female' => 'required|integer|min:0',
            'children_born_past_12_months_male' => 'required|integer|min:0',
            'children_born_past_12_months_female' => 'required|integer|min:0'
        ]);
    }
}
