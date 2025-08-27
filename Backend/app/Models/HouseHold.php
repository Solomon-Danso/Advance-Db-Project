<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Household extends Model
{
    use HasFactory;

    protected $primaryKey = 'household_id';
    protected $fillable = [
        'ea_code', 'structure_number', 'household_number', 'type_of_residence',
        'detailed_address', 'contact_phone1', 'contact_phone2', 'nhis_ecg_vra_number',
        'date_started', 'date_completed', 'total_visits', 'form_number'
    ];

    public function members()
    {
        return $this->hasMany(Person::class, 'household_id', 'household_id');
    }

    public function housingCondition()
    {
        return $this->hasOne(HousingCondition::class, 'household_id', 'household_id');
    }

    public function enumerationArea()
    {
        return $this->belongsTo(EnumerationArea::class, 'ea_code', 'ea_code');
    }
}
