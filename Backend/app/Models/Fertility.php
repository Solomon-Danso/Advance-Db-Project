<?php

// app/Models/Fertility.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fertility extends Model
{
    use HasFactory;

    protected $primaryKey = 'fertility_id';
    protected $fillable = [
        'person_id',
        'children_ever_born_male',
        'children_ever_born_female',
        'children_surviving_male',
        'children_surviving_female',
        'children_born_past_12_months_male',
        'children_born_past_12_months_female'
    ];

    public function person()
    {
        return $this->belongsTo(Person::class, 'person_id', 'person_id');
    }
}
