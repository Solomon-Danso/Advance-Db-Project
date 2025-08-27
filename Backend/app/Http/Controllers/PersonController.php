<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PersonController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 10);
        $people = DB::select('CALL sp_paginate_people(?, ?)', [$page, $perPage]);
        return response()->json($people);
    }

    public function store(Request $request)
    {
        $validated = $this->validatePerson($request);

        DB::select('CALL sp_insert_person(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @id)', [
            $validated['household_id'],
            $validated['full_name'],
            $validated['relationship_to_head'],
            $validated['sex'],
            $validated['date_of_birth'],
            $validated['age'],
            $validated['nationality'],
            $validated['ethnicity_code'],
            $validated['ethnicity_name'],
            $validated['born_in_locality'],
            $validated['birth_region_country_code'],
            $validated['birth_region_country_name'],
            $validated['lived_in_locality_since_birth'],
            $validated['years_lived_in_locality'],
            $validated['religion'],
            $validated['marital_status'],
            $validated['present_on_census_night'],
            $validated['status']
        ]);

        $id = DB::select('SELECT @id as id')[0]->id;
        return $this->show($id);
    }

    public function show($id)
    {
        $person = DB::select('CALL sp_get_person_details(?)', [$id]);
        return response()->json($person[0]);
    }

    public function update(Request $request, $id)
    {
        $validated = $this->validatePerson($request);

        DB::select('CALL sp_update_person(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            $id,
            $validated['household_id'],
            $validated['full_name'],
            $validated['relationship_to_head'],
            $validated['sex'],
            $validated['date_of_birth'],
            $validated['age'],
            $validated['nationality'],
            $validated['ethnicity_code'],
            $validated['ethnicity_name'],
            $validated['born_in_locality'],
            $validated['birth_region_country_code'],
            $validated['birth_region_country_name'],
            $validated['lived_in_locality_since_birth'],
            $validated['years_lived_in_locality'],
            $validated['religion'],
            $validated['marital_status'],
            $validated['present_on_census_night'],
            $validated['status']
        ]);

        return $this->show($id);
    }

    public function destroy($id)
    {
        DB::select('CALL sp_delete_person(?)', [$id]);
        return response()->json(null, 204);
    }

    private function validatePerson(Request $request)
    {
        return $request->validate([
            'household_id' => 'required|exists:household,household_id',
            'full_name' => 'required|string|max:100',
            'relationship_to_head' => 'required|in:Head,Spouse,Child,Parent,Grandchild,Sibling,Other',
            'sex' => 'required|in:Male,Female',
            'date_of_birth' => 'nullable|date',
            'age' => 'nullable|integer|min:0|max:120',
            'nationality' => 'required|string|max:50',
            'ethnicity_code' => 'nullable|string|max:10',
            'ethnicity_name' => 'nullable|string|max:50',
            'born_in_locality' => 'nullable|boolean',
            'birth_region_country_code' => 'nullable|string|max:10',
            'birth_region_country_name' => 'nullable|string|max:50',
            'lived_in_locality_since_birth' => 'nullable|boolean',
            'years_lived_in_locality' => 'nullable|integer|min:0',
            'religion' => 'required|string|max:50',
            'marital_status' => 'required|string|max:50',
            'present_on_census_night' => 'required|boolean',
            'status' => 'required|in:Usual member present,Visitor present,Usual member absent'
        ]);
    }
}
