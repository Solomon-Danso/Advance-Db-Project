<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HouseholdController extends Controller
{
    public function index(Request $request)
    {
        $households = DB::select('CALL sp_get_all_households');
        return response()->json($households);
    }

    public function store(Request $request)
    {
        $validated = $this->validateHousehold($request);

        DB::select('CALL sp_insert_household(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @id)', [
            $validated['ea_code'],
            $validated['structure_number'],
            $validated['household_number'],
            $validated['type_of_residence'],
            $validated['detailed_address'],
            $validated['contact_phone1'],
            $validated['contact_phone2'],
            $validated['nhis_ecg_vra_number'],
            $validated['date_started'],
            $validated['date_completed'],
            $validated['total_visits'],
            $validated['form_number']
        ]);

        $id = DB::select('SELECT @id as id')[0]->id;
        return $this->show($id);
    }

    public function show($id)
    {
        $household = DB::select('CALL sp_get_household_with_members(?)', [$id]);
        return response()->json($household[0]);
    }

    public function update(Request $request, $id)
    {
        $validated = $this->validateHousehold($request);

        DB::select('CALL sp_update_household(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            $id,
            $validated['ea_code'],
            $validated['structure_number'],
            $validated['household_number'],
            $validated['type_of_residence'],
            $validated['detailed_address'],
            $validated['contact_phone1'],
            $validated['contact_phone2'],
            $validated['nhis_ecg_vra_number'],
            $validated['date_started'],
            $validated['date_completed'],
            $validated['total_visits'],
            $validated['form_number']
        ]);

        return $this->show($id);
    }

    public function destroy($id)
    {

         try {
            DB::select('CALL sp_delete_household(?)', [$id]);
            return response()->json(['success' => true, 'message' => 'Household deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }



    }

    private function validateHousehold(Request $request)
    {
        return $request->validate([
            'ea_code' => 'required|exists:enumeration_area,ea_code',
            'structure_number' => 'nullable|string|max:20',
            'household_number' => 'nullable|string|max:20',
            'type_of_residence' => 'required|in:Occupied,Vacant',
            'detailed_address' => 'nullable|string',
            'contact_phone1' => 'nullable|string|max:15',
            'contact_phone2' => 'nullable|string|max:15',
            'nhis_ecg_vra_number' => 'nullable|string|max:20',
            'date_started' => 'nullable|date',
            'date_completed' => 'nullable|date',
            'total_visits' => 'nullable|integer|min:0',
            'form_number' => 'nullable|string|max:10'
        ]);
    }
}
