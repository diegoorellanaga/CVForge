<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasFactory;

    protected $table = 'languages';

    protected $fillable = [
        'resume_id',
        'language',
        'proficiency',
        'test',
    ];

    // Define relationship with the Resume
    public function resume()
    {
        return $this->belongsTo(Resume::class, 'resume_id');
    }
}
