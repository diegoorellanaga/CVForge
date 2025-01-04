<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    // The table associated with the model
    protected $table = 'skills';

    // The primary key associated with the table
    protected $primaryKey = 'id';

    // The attributes that are mass assignable
    protected $fillable = [
        'resume_id',
        'skill_name',
        'skill_category',
        'skill_order',
        'year_amount',
        'proficiency',
        'certificate',
    ];

    // Define the relationship with the Resume model
    public function resume()
    {
        return $this->belongsTo(Resume::class, 'resume_id', 'resume_id');
    }
}
