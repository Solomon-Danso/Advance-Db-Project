<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class GeographicController extends Controller
{

//CRUD
//create read update delete
    // REGION METHODS
    public function getRegions()
    {
        try {
            $regions = DB::select('CALL sp_get_all_regions()');
            return response()->json(['success' => true, 'data' => $regions]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

public function createRegion(Request $request)
{
    try {
        // \Log::info('Creating region with data:', $request->all());

        $validated = $request->validate([
            'region_code' => 'required|string|max:2|unique:Region,region_code',
            'region_name' => 'required|string|max:50'
        ]);

        \Log::info('Validated data:', $validated);

        // Test database connection first
        DB::connection()->getPdo();
        \Log::info('Database connection successful');

        // Call the stored procedure
        $result = DB::select('CALL sp_insert_region(?, ?)', [
            $validated['region_code'],
            $validated['region_name']
        ]);

        \Log::info('Stored procedure executed successfully');

        return response()->json(['success' => true, 'message' => 'Region created successfully']);

    } catch (\Illuminate\Validation\ValidationException $e) {

    $messages = collect($e->errors())->flatten();
    $message = $messages->first() ?? 'Validation failed';

    return response()->json([
        'success' => false,
        'message' => $message,   // send user-friendly message
        'errors' => $e->errors() // keep full errors if you want them
    ], 422);

    } catch (\Illuminate\Database\QueryException $e) {
        \Log::error('Database error:', [
            'message' => $e->getMessage(),
            'sql' => $e->getSql(),
            'bindings' => $e->getBindings()
        ]);
        return response()->json([
            'success' => false,
            'message' => 'Database error: ' . $e->getMessage()
        ], 500);

    } catch (\Exception $e) {
        \Log::error('General error:', [
            'message' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'trace' => $e->getTraceAsString()
        ]);
        return response()->json([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage()
        ], 500);
    }
}

    public function deleteRegion($regionCode)
    {
        try {
            DB::select('CALL sp_delete_region(?)', [$regionCode]);
            return response()->json(['success' => true, 'message' => 'Region deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function updateRegion(Request $request, $id)
{
    // First get the current record
    $current = DB::select('CALL sp_update_region(?)', [$id]);
    if (empty($current)) {
        return response()->json(['error' => 'Record not found'], 404);
    }

    // Define all possible fields that can be updated
    $updatableFields = [
        'region_code', 'region_name'
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
         return response()->json([
        'success' => true,
              ], 200);
    }

    $query = 'UPDATE Region SET ' . implode(', ', $setClauses) . ' WHERE region_code = ?';
    $params[] = $id;

    // Execute the update
    DB::update($query, $params);

     return response()->json([
        'success' => true,
        'message' => "Region Updated Successfully",   // send user-friendly message
         ], 200);
}

    // DISTRICT METHODS
    public function getDistricts()
    {
        try {
            $districts = DB::select('CALL sp_get_all_district()');
            return response()->json(['success' => true, 'data' => $districts]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function getDistrictsByRegion($regionCode)
    {
        try {
            $districts = DB::select('CALL sp_get_districts_by_region(?)', [$regionCode]);
            return response()->json(['success' => true, 'data' => $districts]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function createDistrict(Request $request)
    {
        try {
            $validated = $request->validate([
                'district_code' => 'required|string|max:10|unique:District,district_code',
                'region_code' => 'required|string|max:2|exists:Region,region_code',
                'district_name' => 'required|string|max:50',
                'district_type' => 'nullable|string|max:20'
            ]);

            DB::select('CALL sp_insert_district(?, ?, ?, ?)', [
                $validated['district_code'],
                $validated['region_code'],
                $validated['district_name'],
                $validated['district_type']
            ]);

            return response()->json(['success' => true, 'message' => 'District created successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function deleteDistrict($districtCode)
    {
        try {
            DB::select('CALL sp_delete_district(?)', [$districtCode]);
            return response()->json(['success' => true, 'message' => 'District deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // SUBDISTRICT METHODS
    public function getSubDistricts()
    {
        try {
            $subDistricts = DB::select('CALL sp_get_subdistricts()');
            return response()->json(['success' => true, 'data' => $subDistricts]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function getSubDistrictsByDistrict($districtCode)
    {
        try {
            $subDistricts = DB::select('CALL sp_get_subdistricts_by_district(?)', [$districtCode]);
            return response()->json(['success' => true, 'data' => $subDistricts]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function createSubDistrict(Request $request)
    {
        try {
            $validated = $request->validate([
                'sub_district_code' => 'required|string|max:10|unique:SubDistrict,sub_district_code',
                'district_code' => 'required|string|max:10|exists:District,district_code',
                'sub_district_name' => 'required|string|max:50'
            ]);

            DB::select('CALL sp_insert_subdistrict(?, ?, ?)', [
                $validated['sub_district_code'],
                $validated['district_code'],
                $validated['sub_district_name']
            ]);

            return response()->json(['success' => true, 'message' => 'SubDistrict created successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function deleteSubDistrict($subDistrictCode)
    {
        try {
            DB::select('CALL sp_delete_subdistrict(?)', [$subDistrictCode]);
            return response()->json(['success' => true, 'message' => 'SubDistrict deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // LOCALITY METHODS
    public function getLocalities()
    {
        try {
            $localities = DB::select('CALL sp_get_all_localities()');
            return response()->json(['success' => true, 'data' => $localities]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function getLocalitiesBySubDistrict($subDistrictCode)
    {
        try {
            $localities = DB::select('CALL sp_get_localities_by_subdistrict(?)', [$subDistrictCode]);
            return response()->json(['success' => true, 'data' => $localities]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function createLocality(Request $request)
    {
        try {
            $validated = $request->validate([
                'locality_code' => 'required|string|max:10|unique:Locality,locality_code',
                'sub_district_code' => 'required|string|max:10|exists:SubDistrict,sub_district_code',
                'locality_name' => 'required|string|max:50'
            ]);

            DB::select('CALL sp_insert_locality(?, ?, ?)', [
                $validated['locality_code'],
                $validated['sub_district_code'],
                $validated['locality_name']
            ]);

            return response()->json(['success' => true, 'message' => 'Locality created successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function deleteLocality($localityCode)
    {
        try {
            DB::select('CALL sp_delete_locality(?)', [$localityCode]);
            return response()->json(['success' => true, 'message' => 'Locality deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ENUMERATION AREA METHODS
    public function getEnumerationAreas()
    {
        try {
            $enumerationAreas = DB::select('CALL sp_get_enumerationarea()');
            return response()->json(['success' => true, 'data' => $enumerationAreas]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function getEnumerationAreasByLocality($localityCode)
    {
        try {
            $enumerationAreas = DB::select('CALL sp_get_enumeration_areas_by_locality(?)', [$localityCode]);
            return response()->json(['success' => true, 'data' => $enumerationAreas]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function createEnumerationArea(Request $request)
    {
        try {
            $validated = $request->validate([
                'ea_code' => 'required|string|max:10|unique:EnumerationArea,ea_code',
                'locality_code' => 'required|string|max:10|exists:Locality,locality_code',
                'ea_type' => 'nullable|string|max:20',
                'ea_number' => 'nullable|string|max:10'
            ]);

            DB::select('CALL sp_insert_enumerationarea(?, ?, ?, ?)', [
                $validated['ea_code'],
                $validated['locality_code'],
                $validated['ea_type'],
                $validated['ea_number']
            ]);

            return response()->json(['success' => true, 'message' => 'Enumeration Area created successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function deleteEnumerationArea($eaCode)
    {
        try {
            DB::select('CALL sp_delete_enumerationarea(?)', [$eaCode]);
            return response()->json(['success' => true, 'message' => 'Enumeration Area deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // BULK OPERATIONS
    public function getHierarchy()
    {
        try {
            $hierarchy = DB::select('
                SELECT r.region_code, r.region_name,
                       d.district_code, d.district_name, d.district_type,
                       sd.sub_district_code, sd.sub_district_name,
                       l.locality_code, l.locality_name,
                       ea.ea_code, ea.ea_type, ea.ea_number
                FROM Region r
                LEFT JOIN District d ON r.region_code = d.region_code
                LEFT JOIN SubDistrict sd ON d.district_code = sd.district_code
                LEFT JOIN Locality l ON sd.sub_district_code = l.sub_district_code
                LEFT JOIN EnumerationArea ea ON l.locality_code = ea.locality_code
                ORDER BY r.region_code, d.district_code, sd.sub_district_code, l.locality_code, ea.ea_code
            ');

            return response()->json(['success' => true, 'data' => $hierarchy]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
