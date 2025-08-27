<?php

// app/Models/Education.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    protected $primaryKey = 'education_id';
    protected $fillable = [
        'person_id',
        'literacy_language',
        'ever_attended_school',
        'highest_level_schooling',
        'highest_grade_completed'
    ];

    public function person()
    {
        return $this->belongsTo(Person::class, 'person_id', 'person_id');
    }
}
