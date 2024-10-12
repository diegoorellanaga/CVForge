<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Header extends Model
{
    use HasFactory;

    protected $fillable = [
        'resume_id',
        'name',
        'professional_title',
        'professional_summary',
        'image_url',
        'phone',
        'email',
        'location',
        'personal_site',
        'current_company',
        'current_position',
    ];

    public function resume()
    {
        return $this->belongsTo(Resume::class, 'resume_id');
    }
}
