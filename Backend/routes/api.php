<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Authentication Routes (if you still want basic auth without Sanctum)
Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout']);

// Public Routes (no authentication required)
Route::get('/households', [App\Http\Controllers\HouseholdController::class, 'index']);
Route::post('/households', [App\Http\Controllers\HouseholdController::class, 'store']);
Route::get('/households/{id}', [App\Http\Controllers\HouseholdController::class, 'show']);
Route::put('/households/{id}', [App\Http\Controllers\HouseholdController::class, 'update']);
Route::delete('/deletehouseholds/{id}', [App\Http\Controllers\HouseholdController::class, 'destroy']);

Route::apiResource('housing-conditions', App\Http\Controllers\HousingConditionController::class);
Route::apiResource('persons', App\Http\Controllers\PersonController::class);
Route::get('persons/household/{household_id}', [App\Http\Controllers\PersonController::class, 'getByHousehold']);

Route::apiResource('education', App\Http\Controllers\EducationController::class);
Route::get('education/person/{person_id}', [App\Http\Controllers\EducationController::class, 'getByPerson']);

Route::apiResource('economic-activities', App\Http\Controllers\EconomicActivityController::class);
Route::get('economic-activities/person/{person_id}', [App\Http\Controllers\EconomicActivityController::class, 'getByPerson']);

Route::apiResource('disabilities', App\Http\Controllers\DisabilityController::class);
Route::get('disabilities/person/{person_id}', [App\Http\Controllers\DisabilityController::class, 'getByPerson']);

// Housing Condition Routes
Route::get('/households/{householdId}/housing-condition', [App\Http\Controllers\HousingConditionController::class, 'show']);
Route::post('/households/{householdId}/housing-condition', [App\Http\Controllers\HousingConditionController::class, 'store']);

Route::apiResource('fertilities', App\Http\Controllers\FertilityController::class);
Route::get('fertilities/person/{person_id}', [App\Http\Controllers\FertilityController::class, 'getByPerson']);



// Education Routes
Route::get('/persons/{personId}/education', [App\Http\Controllers\EducationController::class, 'show']);
Route::post('/persons/{personId}/education', [App\Http\Controllers\EducationController::class, 'store']);

// Economic Activity Routes
Route::get('/persons/{personId}/economic-activity', [App\Http\Controllers\EconomicActivityController::class, 'show']);
Route::post('/persons/{personId}/economic-activity', [App\Http\Controllers\EconomicActivityController::class, 'store']);

// Disability Routes
Route::get('/persons/{personId}/disability', [App\Http\Controllers\DisabilityController::class, 'show']);
Route::post('/persons/{personId}/disability', [App\Http\Controllers\DisabilityController::class, 'store']);

// Fertility Routes
Route::get('/persons/{personId}/fertility', [App\Http\Controllers\FertilityController::class, 'show']);
Route::post('/persons/{personId}/fertility', [App\Http\Controllers\FertilityController::class, 'store']);

// Mortality Routes
Route::get('/households/{householdId}/mortality', [App\Http\Controllers\MortalityController::class, 'index']);
Route::post('/households/{householdId}/mortality', [App\Http\Controllers\MortalityController::class, 'store']);

// Agricultural Activity Routes
Route::get('/households/{householdId}/agricultural-activity', [App\Http\Controllers\AgriculturalActivityController::class, 'show']);
Route::post('/households/{householdId}/agricultural-activity', [App\Http\Controllers\AgriculturalActivityController::class, 'store']);

// Reports Routes
Route::get('/reports/population-summary', [App\Http\Controllers\ReportController::class, 'populationSummary']);
Route::get('/reports/housing-summary', [App\Http\Controllers\ReportController::class, 'housingSummary']);
Route::get('/reports/economic-activity-summary', [App\Http\Controllers\ReportController::class, 'economicActivitySummary']);

// User Management Routes (consider adding basic auth or removing if not needed)
Route::get('/users', [App\Http\Controllers\UserController::class, 'index']);
Route::post('/users', [App\Http\Controllers\UserController::class, 'store']);
Route::get('/users/{id}', [App\Http\Controllers\UserController::class, 'show']);
Route::put('/users/{id}', [App\Http\Controllers\UserController::class, 'update']);
Route::delete('/users/{id}', [App\Http\Controllers\UserController::class, 'destroy']);

Route::prefix('geographic')->group(function () {
    // Region Routes
    Route::get('/regions', [App\Http\Controllers\GeographicController::class, 'getRegions']);
    Route::post('/regions', [App\Http\Controllers\GeographicController::class, 'createRegion']);
    Route::delete('/regions/{regionCode}', [App\Http\Controllers\GeographicController::class, 'deleteRegion']);

    // District Routes
    Route::get('/districts', [App\Http\Controllers\GeographicController::class, 'getDistricts']);
    Route::get('/regions/{regionCode}/districts', [App\Http\Controllers\GeographicController::class, 'getDistrictsByRegion']);
    Route::post('/districts', [App\Http\Controllers\GeographicController::class, 'createDistrict']);
    Route::delete('/districts/{districtCode}', [App\Http\Controllers\GeographicController::class, 'deleteDistrict']);

    // SubDistrict Routes
    Route::get('/subdistricts', [App\Http\Controllers\GeographicController::class, 'getSubDistricts']);
    Route::get('/districts/{districtCode}/subdistricts', [App\Http\Controllers\GeographicController::class, 'getSubDistrictsByDistrict']);
    Route::post('/subdistricts', [App\Http\Controllers\GeographicController::class, 'createSubDistrict']);
    Route::delete('/subdistricts/{subDistrictCode}', [App\Http\Controllers\GeographicController::class, 'deleteSubDistrict']);

    // Locality Routes
    Route::get('/localities', [App\Http\Controllers\GeographicController::class, 'getLocalities']);
    Route::get('/subdistricts/{subDistrictCode}/localities', [App\Http\Controllers\GeographicController::class, 'getLocalitiesBySubDistrict']);
    Route::post('/localities', [App\Http\Controllers\GeographicController::class, 'createLocality']);
    Route::delete('/localities/{localityCode}', [App\Http\Controllers\GeographicController::class, 'deleteLocality']);

    // Enumeration Area Routes
    Route::get('/enumeration-areas', [App\Http\Controllers\GeographicController::class, 'getEnumerationAreas']);
    Route::get('/localities/{localityCode}/enumeration-areas', [App\Http\Controllers\GeographicController::class, 'getEnumerationAreasByLocality']);
    Route::post('/enumeration-areas', [App\Http\Controllers\GeographicController::class, 'createEnumerationArea']);
    Route::delete('/enumeration-areas/{eaCode}', [App\Http\Controllers\GeographicController::class, 'deleteEnumerationArea']);

    // Bulk Operations
    Route::get('/hierarchy', [App\Http\Controllers\GeographicController::class, 'getHierarchy']);
});
// Health Check
Route::get('/health', function () {
    return response()->json(['status' => 'healthy']);
});
