<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HousingConditionController extends Controller
{
    public function index(Request $request)
    {
        $housingConditions = DB::select('CALL sp_get_all_housing_conditions');
        return response()->json($housingConditions);
    }

    public function store(Request $request)
    {
        $validated = $this->validateHousingCondition($request);

        DB::select('CALL sp_insert_housing_condition(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @id)', [
            $validated['household_id'],
            $validated['dwelling_type'],
            $validated['outer_wall_material'],
            $validated['floor_material'],
            $validated['roof_material'],
            $validated['tenure_arrangement'],
            $validated['ownership_type'],
            $validated['total_rooms'] ?? null,
            $validated['sleeping_rooms'] ?? null,
            $validated['shared_sleeping_rooms'] ?? false,
            $validated['households_sharing_sleeping_rooms'] ?? null,
            $validated['lighting_source'],
            $validated['drinking_water_source'],
            $validated['other_water_source'],
            $validated['cooking_fuel'],
            $validated['cooking_space'],
            $validated['bathing_facility'],
            $validated['toilet_facility'],
            $validated['shared_toilet'] ?? false,
            $validated['households_sharing_toilet'] ?? null,
            $validated['solid_waste_disposal'],
            $validated['liquid_waste_disposal']
        ]);

        $id = DB::select('SELECT @id as id')[0]->id;
        return $this->show($id);
    }

    public function show($id)
    {
        $housingCondition = DB::select('CALL sp_get_housing_condition(?)', [$id]);
        return response()->json($housingCondition[0]);
    }

    public function update(Request $request, $id)
    {
        $validated = $this->validateHousingCondition($request);

        DB::select('CALL sp_update_housing_condition(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            $id,
            $validated['household_id'],
            $validated['dwelling_type'],
            $validated['outer_wall_material'],
            $validated['floor_material'],
            $validated['roof_material'],
            $validated['tenure_arrangement'],
            $validated['ownership_type'],
            $validated['total_rooms'] ?? null,
            $validated['sleeping_rooms'] ?? null,
            $validated['shared_sleeping_rooms'] ?? false,
            $validated['households_sharing_sleeping_rooms'] ?? null,
            $validated['lighting_source'],
            $validated['drinking_water_source'],
            $validated['other_water_source'],
            $validated['cooking_fuel'],
            $validated['cooking_space'],
            $validated['bathing_facility'],
            $validated['toilet_facility'],
            $validated['shared_toilet'] ?? false,
            $validated['households_sharing_toilet'] ?? null,
            $validated['solid_waste_disposal'],
            $validated['liquid_waste_disposal']
        ]);

        return $this->show($id);
    }

    public function destroy($id)
    {
        try {
            DB::select('CALL sp_delete_housing_condition(?)', [$id]);
            return response()->json(['success' => true, 'message' => 'Housing condition deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    private function validateHousingCondition(Request $request)
    {
        return $request->validate([
            'household_id' => 'required|exists:household,household_id',
            'dwelling_type' => 'required|in:Separate house,Semi-detached house,Flat/Apartment,Compound house,Huts/Buildings (same compound),Huts/Buildings (different compounds),Tent,Improvised home,Living quarters attached to office/shop,Uncompleted building,Other',
            'outer_wall_material' => 'required|in:Mud bricks/earth,Wood,Metal sheet/slate/asbestos,Stone,Burnt bricks,Cement blocks/concrete,Landcrete,Bamboo,Palm leaves/Thatch (grass)/Raffia,Other',
            'floor_material' => 'required|in:Earth/Mud,Cement/Concrete,Stone,Burnt bricks,Wood,Vinyl tiles,Ceramic/Porcelain/Granite/Marble tiles,Terrazzo/Terrazzo tiles,Other',
            'roof_material' => 'required|in:Mud/Mud bricks/Earth,Wood,Metal sheet,Slate/Asbestos,Cement/Concrete,Roofing Tiles,Bamboo,Thatch/Palm leaves or Raffia,Other',
            'tenure_arrangement' => 'required|in:Owner occupied,Rent free,Perching,Squatting,Other',
            'ownership_type' => 'required|in:Owned by household member,Being purchased,Relative not household member,Other private individual,Private employer,Other private agency,Public/Government ownership,Other',
            'total_rooms' => 'nullable|integer|min:0',
            'sleeping_rooms' => 'nullable|integer|min:0',
            'shared_sleeping_rooms' => 'nullable|boolean',
            'households_sharing_sleeping_rooms' => 'nullable|integer|min:0',
            'lighting_source' => 'required|in:Electricity (main),Electricity (private generator),Kerosene lamp,Gas lamp,Solar energy,Candle,Flashlight/Torch,Firewood,Crop residue,Other',
            'drinking_water_source' => 'required|in:Pipe-borne inside dwelling,Pipe-borne outside dwelling,Public tap/Standpipe,Borehole/Pump/Tube well,Protected well,Rain water,Protected spring,Bottled water,Sachet water,Tanker supply/Vendor provided,Unprotected well,Unprotected spring,River/Stream,Dugout/Pond/Lake/Dam/Canal,Other',
            'other_water_source' => 'required|in:Pipe-borne inside dwelling,Pipe-borne outside dwelling,Public tap/Standpipe,Borehole/Pump/Tube well,Protected well,Rain water,Protected spring,Tanker supply/Vendor provided,Unprotected well,Unprotected spring,River/Stream,Dugout/Pond/Lake/Dam/Canal,Other',
            'cooking_fuel' => 'required|in:None, no cooking,Wood,Gas,Electricity,Kerosene,Charcoal,Crop residue,Saw dust,Animal waste,Other',
            'cooking_space' => 'required|in:No cooking,Separate room for exclusive use of household,Separate room shared with other household(s),Enclosure without roof,Structure with roof but without walls,Bedroom/Hall/Living room,Veranda,Open space in compound,Other',
            'bathing_facility' => 'required|in:Own bathroom for exclusive use,Shared separate bathroom in same house,Private open cubicle,Shared open cubicle,Public bath house,Bathroom in another house,Open space around house,In a river, pond, lake or dam,Other',
            'toilet_facility' => 'required|in:No facility,WC,Pit latrine,KVIP,Bucket/Pan,Public toilet,Other',
            'shared_toilet' => 'nullable|boolean',
            'households_sharing_toilet' => 'nullable|integer|min:0',
            'solid_waste_disposal' => 'required|in:Collected,Burned by household,Public dump (Container),Public dump (Open space),Dumped indiscriminately,Buried by household,Other',
            'liquid_waste_disposal' => 'required|in:Through the sewage system,Through drainage system into a gutter,Through drainage into a pit (soak away),Thrown onto the street/outside,Thrown into gutter,Thrown onto compound,Other'
        ]);
    }
}
