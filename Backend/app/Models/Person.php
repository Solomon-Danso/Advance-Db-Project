<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    protected $primaryKey = 'person_id';
    protected $fillable = [
        'household_id', 'full_name', 'relationship_to_head', 'sex', 'date_of_birth', 'age',
        'nationality', 'ethnicity_code', 'ethnicity_name', 'born_in_locality',
        'birth_region_country_code', 'birth_region_country_name', 'lived_in_locality_since_birth',
        'years_lived_in_locality', 'religion', 'marital_status', 'present_on_census_night', 'status'
    ];

    public function household()
    {
        return $this->belongsTo(Household::class, 'household_id', 'household_id');
    }

    public function education()
    {
        return $this->hasOne(Education::class, 'person_id', 'person_id');
    }

    public function economicActivity()
    {
        return $this->hasOne(EconomicActivity::class, 'person_id', 'person_id');
    }

    public function disability()
    {
        return $this->hasOne(Disability::class, 'person_id', 'person_id');
    }

    public function fertility()
    {
        return $this->hasOne(Fertility::class, 'person_id', 'person_id');
    }
}
