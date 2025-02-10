<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExtraActivity extends Model
{
    use HasFactory;

    protected $table = 'extra_activity'; // Explicitly define the table name

    protected $fillable = [
        'resume_id',
        'initial_date',
        'end_date',
        'job_title',
        'company_name',
        'place',
        'description',
        'current',
        'departure_reason',
    ];

    /**
     * Relationship: An extra activity belongs to a resume.
     */
    public function resume()
    {
        return $this->belongsTo(Resume::class, 'resume_id');
    }
}
