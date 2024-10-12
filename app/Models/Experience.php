<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;
    protected $fillable = [
        'resume_id', 'initial_date', 'end_date', 'job_title', 'company_name', 'description', 'current', 'departure_reason', 'place'
    ];

    // Define relationship with Resume
    public function resume()
    {
        return $this->belongsTo(Resume::class);
    }
}
