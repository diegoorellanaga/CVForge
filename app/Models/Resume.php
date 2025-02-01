<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    use HasFactory;

    // Specify the table name explicitly
    protected $table = 'resume';

    protected $primaryKey = 'resume_id';

    protected $fillable = ['user_id', 'title', 'style'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Define relationship with experiences
    public function experiences()
    {
        return $this->hasMany(Experience::class,'resume_id');
    }

    public function header()
    {
        return $this->hasOne(Header::class, 'resume_id');
    }

    // Define relationship with skills
    public function skills()
    {
        return $this->hasMany(Skill::class, 'resume_id');
    }

    // New relationship for educations
    public function educations()
    {
        return $this->hasMany(Education::class, 'resume_id');
    }

    // New relationship for educations
    public function references()
    {
        return $this->hasMany(Reference::class, 'resume_id');
    }

    // app/Models/Resume.php

    public function languages()
    {
        return $this->hasMany(Language::class, 'resume_id');
    }



}
