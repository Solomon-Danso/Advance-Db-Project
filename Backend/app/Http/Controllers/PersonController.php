<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PersonController extends Controller
{
    public function index(Request $request)
    {
        $persons = DB::select('CALL sp_get_all_persons()');
        return response()->json($persons);
    }

public function store(Request $request)
{
    $validated = $this->validatePerson($request);

    DB::select('CALL sp_insert_person(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @id)', [
        $validated['household_id'],
        $validated['full_name'],
        $validated['relationship_to_head'],
        $validated['sex'],
        $validated['date_of_birth'] ?? null,
        $validated['age'] ?? null,
        $validated['nationality'],
        $validated['ethnicity_code'] ?? null,
        $validated['ethnicity_name'] ?? null,
        $validated['born_in_locality'] ?? false,
        $validated['birth_region_country_code'] ?? null,
        $validated['birth_region_country_name'] ?? null,
        $validated['lived_in_locality_since_birth'] ?? false,
        $validated['years_lived_in_locality'] ?? null,
        $validated['religion'],
        $validated['marital_status'],
        $validated['present_on_census_night'] ?? false,
        $validated['status']
    ]);

    $id = DB::select('SELECT @id as id')[0]->id;
    return $this->show($id);
}

    public function show($id)
    {
        $person = DB::select('CALL sp_get_person(?)', [$id]);
        return response()->json($person[0]);
    }

public function update(Request $request, $id)
{
    // First get the current record
    $current = DB::select('CALL sp_get_person(?)', [$id]);
    if (empty($current)) {
        return response()->json(['error' => 'Record not found'], 404);
    }

    // Define all possible fields that can be updated
    $updatableFields = [
        'household_id', 'full_name', 'relationship_to_head', 'sex', 'date_of_birth',
        'age', 'nationality', 'ethnicity_code', 'ethnicity_name', 'born_in_locality',
        'birth_region_country_code', 'birth_region_country_name', 'lived_in_locality_since_birth',
        'years_lived_in_locality', 'religion', 'marital_status', 'present_on_census_night', 'status'
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

    $query = 'UPDATE Person SET ' . implode(', ', $setClauses) . ' WHERE person_id = ?';
    $params[] = $id;

  
    // Execute the update
    DB::update($query, $params);

    return $this->show($id);
}

    public function destroy($id)
    {
        try {
            DB::select('CALL sp_delete_person(?)', [$id]);
            return response()->json(['success' => true, 'message' => 'Person deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function getByHousehold($household_id)
    {
        $persons = DB::select('CALL sp_get_persons_by_household(?)', [$household_id]);
        return response()->json($persons);
    }

    private function validatePerson(Request $request)
    {
        return $request->validate([
            'household_id' => 'required|exists:household,household_id',
            'full_name' => 'required|string|max:100',
            'relationship_to_head' => 'required|in:Head,Spouse,Child,Parent/Parent in-law,Son/Daughter in-law,Grandchild,Brother/Sister,Step child,Foster child,Other relative,Non-relative',
            'sex' => 'required|in:Male,Female',
            'date_of_birth' => 'nullable|date',
            'age' => 'nullable|integer|min:0|max:120',
            'nationality' => 'required|in:Ghanaian by birth,Dual Nationality,Ghanaian by naturalization,Nigerian,Liberian,Sierra Leonean,Gambian,Togolese,Burkinabe,Ivorian,Other ECOWAS National,African, other than ECOWAS,European,American,Asian,Oceanian',
            'ethnicity_code' => 'nullable|string|max:10',
            'ethnicity_name' => 'nullable|string|max:50',
            'born_in_locality' => 'nullable|boolean',
            'birth_region_country_code' => 'nullable|string|max:10',
            'birth_region_country_name' => 'nullable|string|max:50',
            'lived_in_locality_since_birth' => 'nullable|boolean',
            'years_lived_in_locality' => 'nullable|integer|min:0',
            'religion' => 'required|in:No Religion,Catholic,Protestant,Pentecostal/Charismatic,Other Christian,Islam,Ahmadi,Traditionalist,Other',
            'marital_status' => 'required|in:Never married,Informal/consensual union/living together,Married,Separated,Divorced,Widowed',
            'present_on_census_night' => 'nullable|boolean',
            'status' => 'required|in:Usual member present,Visitor present,Usual member absent'
        ]);
    }
}
