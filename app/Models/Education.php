<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    // Specify the table name explicitly
    protected $table = 'education';

    // Specify the primary key if it's different from the default 'id'
    protected $primaryKey = 'id';

    // Fillable attributes to protect against mass assignment vulnerability
    protected $fillable = [
        'resume_id',
        'initial_date',
        'graduation_date',
        'description',
        'degree',
        'institution',
        'country',
        'place',
    ];

    // Define the relationship with the Resume model (parent)
    public function resume()
    {
        return $this->belongsTo(Resume::class, 'resume_id');
    }
}
