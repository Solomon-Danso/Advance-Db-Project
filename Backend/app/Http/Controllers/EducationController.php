<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EducationController extends Controller
{
    public function show($personId)
    {
        $education = DB::select('CALL sp_get_education(?)', [$personId]);
        return response()->json($education[0] ?? null);
    }

    public function store(Request $request)
    {
        $validated = $this->validateEducation($request);

        DB::select('CALL sp_upsert_education(?, ?, ?, ?, ?, @id)', [
            $validated['person_id'],
            $validated['literacy_language'],
            $validated['ever_attended_school'],
            $validated['highest_level_schooling'],
            $validated['highest_grade_completed']
        ]);

        return $this->show($validated['person_id']);
    }

    private function validateEducation(Request $request)
    {
        return $request->validate([
            'person_id' => 'required|exists:person,person_id',
            'literacy_language' => 'nullable|string|max:50',
            'ever_attended_school' => 'required|boolean',
            'highest_level_schooling' => 'required|string|max:50',
            'highest_grade_completed' => 'required|integer|min:0|max:20'
        ]);
    }
}
