<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reference extends Model
{
    use HasFactory;

    protected $table = 'references';

    protected $primaryKey = 'reference_id';

    protected $fillable = [
        'resume_id',
        'name',
        'last_name',
        'email',
        'phone',
        'company_name',
        'position',
        'relation',
    ];

    public function resume()
    {
        return $this->belongsTo(Resume::class, 'resume_id');
    }
}
