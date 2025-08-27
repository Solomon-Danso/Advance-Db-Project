<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DisabilityController extends Controller
{
    public function show($personId)
    {
        $disability = DB::select('CALL sp_get_disability(?)', [$personId]);
        return response()->json($disability[0] ?? null);
    }

    public function store(Request $request)
    {
        $validated = $this->validateDisability($request);

        DB::select('CALL sp_upsert_disability(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @id)', [
            $validated['person_id'],
            $validated['has_disability'],
            $validated['sight_disability'],
            $validated['hearing_disability'],
            $validated['speech_disability'],
            $validated['physical_disability'],
            $validated['intellectual_disability'],
            $validated['emotional_disability'],
            $validated['other_disability'],
            $validated['other_disability_description'],
            $validated['owns_mobile_phone'],
            $validated['uses_internet']
        ]);

        return $this->show($validated['person_id']);
    }

    private function validateDisability(Request $request)
    {
        return $request->validate([
            'person_id' => 'required|exists:person,person_id',
            'has_disability' => 'required|boolean',
            'sight_disability' => 'nullable|boolean',
            'hearing_disability' => 'nullable|boolean',
            'speech_disability' => 'nullable|boolean',
            'physical_disability' => 'nullable|boolean',
            'intellectual_disability' => 'nullable|boolean',
            'emotional_disability' => 'nullable|boolean',
            'other_disability' => 'nullable|boolean',
            'other_disability_description' => 'nullable|string|max:100',
            'owns_mobile_phone' => 'required|boolean',
            'uses_internet' => 'required|boolean'
        ]);
    }
}
