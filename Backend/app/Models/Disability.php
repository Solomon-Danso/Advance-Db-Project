<?php

// app/Models/Disability.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disability extends Model
{
    use HasFactory;

    protected $primaryKey = 'disability_id';
    protected $fillable = [
        'person_id',
        'has_disability',
        'sight_disability',
        'hearing_disability',
        'speech_disability',
        'physical_disability',
        'intellectual_disability',
        'emotional_disability',
        'other_disability',
        'other_disability_description',
        'owns_mobile_phone',
        'uses_internet'
    ];

    public function person()
    {
        return $this->belongsTo(Person::class, 'person_id', 'person_id');
    }
}
