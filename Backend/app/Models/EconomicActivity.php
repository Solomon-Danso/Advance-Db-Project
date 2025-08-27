<?php

// app/Models/EconomicActivity.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EconomicActivity extends Model
{
    use HasFactory;

    protected $primaryKey = 'activity_id';
    protected $fillable = [
        'person_id',
        'engaged_in_activity',
        'engagement_status',
        'reason_not_seeking_work',
        'occupation_code',
        'occupation_description',
        'industry_establishment_name',
        'industry_establishment_location',
        'industry_product_service',
        'employment_status',
        'employment_sector'
    ];

    public function person()
    {
        return $this->belongsTo(Person::class, 'person_id', 'person_id');
    }
}
