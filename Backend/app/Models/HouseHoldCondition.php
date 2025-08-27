<?php

// app/Models/HousingCondition.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HousingCondition extends Model
{
    use HasFactory;

    protected $primaryKey = 'housing_id';
    protected $fillable = [
        'household_id',
        'dwelling_type',
        'outer_wall_material',
        'floor_material',
        'roof_material',
        'tenure_arrangement',
        'ownership_type',
        'total_rooms',
        'sleeping_rooms',
        'shared_sleeping_rooms',
        'households_sharing_sleeping_rooms',
        'lighting_source',
        'drinking_water_source',
        'other_water_source',
        'cooking_fuel',
        'cooking_space',
        'bathing_facility',
        'toilet_facility',
        'shared_toilet',
        'households_sharing_toilet',
        'solid_waste_disposal',
        'liquid_waste_disposal'
    ];

    public function household()
    {
        return $this->belongsTo(Household::class, 'household_id', 'household_id');
    }
}
