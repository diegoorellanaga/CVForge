<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\HeaderController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ReferenceController;

use App\Http\Controllers\LanguageController;


use App\Http\Controllers\ExtraActivityController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// resumes

Route::get('/resumes', [ResumeController::class, 'index'])->middleware('auth')->name('resumes.index');
// Route to show the form for creating a resume
// Show the form to create a new resume
Route::get('/resumes/create', [ResumeController::class, 'create'])->middleware('auth')->name('resumes.create');

// Store a new resume
Route::post('/resumes', [ResumeController::class, 'store'])->middleware('auth')->name('resumes.store');

// web.php
Route::delete('/resumes/{id}', [ResumeController::class, 'destroy'])->name('resumes.destroy');
Route::get('/resumes/{id}/{activeTab?}', [ResumeController::class, 'show'])->name('resumes.show');


// experiences
Route::post('/resumes/{resume}/experiences', [ExperienceController::class, 'store'])->name('experiences.store');
Route::delete('/experiences/{experience}', [ExperienceController::class, 'destroy'])->name('experiences.destroy');
Route::put('/resumes/{resume}/experiences/{experience}', [ExperienceController::class, 'update'])->name('experiences.update');

Route::post('/resumes/{resumeId}/headers', [HeaderController::class, 'store'])->name('headers.store');
Route::get('/headers/{header}/edit', [HeaderController::class, 'edit'])->name('headers.edit');
// Update existing header
Route::put('/resumes/{resume}/headers/{header}', [HeaderController::class, 'update'])->name('headers.update');


Route::post('/resumes/{resume}/skills', [SkillController::class, 'store'])->name('skills.store');
Route::delete('/skills/{skill}', [SkillController::class, 'destroy'])->name('skills.destroy');
Route::put('/resumes/{resume}/skills/{skill}', [SkillController::class, 'update'])->name('skills.update');


// education
Route::post('/resumes/{resume}/education', [EducationController::class, 'store'])->name('education.store');
Route::delete('/education/{education}', [EducationController::class, 'destroy'])->name('education.destroy');
Route::put('/resumes/{resume}/education/{education}', [EducationController::class, 'update'])->name('education.update');

// References




Route::post('/references', [ReferenceController::class, 'store']); // Store a reference
Route::put('/references/{id}/{resumeId}', [ReferenceController::class, 'update']); // Update a reference
Route::delete('/references/{id}', [ReferenceController::class, 'destroy'])->name('references.destroy'); // Delete a reference

// Language routes
Route::post('/resumes/{resume}/languages', [LanguageController::class, 'store'])->name('languages.store');
Route::put('/languages/{id}/{id_lan}', [LanguageController::class, 'update'])->name('languages.update');
Route::delete('/languages/{id}', [LanguageController::class, 'destroy'])->name('languages.destroy');


// extra activity
Route::post('/resumes/{resume}/extra_activity', [ExtraActivityController::class, 'store'])->name('extraActivity.store');
Route::delete('/extra_activity/{experience}', [ExtraActivityController::class, 'destroy'])->name('extraActivity.destroy');
Route::put('/resumes/{resume}/extra_activity/{experience}', [ExtraActivityController::class, 'update'])->name('extraActivity.update');


require __DIR__.'/auth.php';
