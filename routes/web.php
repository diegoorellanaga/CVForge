<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\HeaderController;

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
Route::get('/resumes/{id}', [ResumeController::class, 'show'])->name('resumes.show');

// experiences
Route::post('/resumes/{resume}/experiences', [ExperienceController::class, 'store'])->name('experiences.store');
Route::delete('/experiences/{experience}', [ExperienceController::class, 'destroy'])->name('experiences.destroy');
Route::put('/resumes/{resume}/experiences/{experience}', [ExperienceController::class, 'update'])->name('experiences.update');

Route::post('/resumes/{resumeId}/headers', [HeaderController::class, 'store'])->name('headers.store');

Route::get('/headers/{header}/edit', [HeaderController::class, 'edit'])->name('headers.edit');
// Update existing header
Route::put('/resumes/{resume}/headers/{header}', [HeaderController::class, 'update'])->name('headers.update');


require __DIR__.'/auth.php';
