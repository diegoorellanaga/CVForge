<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Resume;
use Illuminate\Support\Facades\Auth; // Ensure this is included
use Illuminate\Support\Facades\Gate; // Optionally if you use Gate
use Inertia\Inertia;

class ResumeController extends Controller
{
    public function index()
    {
        // Get the currently authenticated user
        $user = Auth::user();

        // Retrieve the resumes belonging to the user
        $resumes = Resume::where('user_id', $user->id)->get();

        // If using Blade:
        // return view('resumes.index', ['resumes' => $resumes]);

        // If using Inertia.js and React:
        return Inertia::render('Resumes/Index', ['resumes' => $resumes, 'user' => $user]);
    }

    public function create()
    {
        $user = Auth::user();
        return Inertia::render('Resumes/Create',['user' => $user]); // Render the form for creating a resume
    }

    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'title' => 'required|string|max:50',
            'style' => 'required|string|max:50',
        ]);

        // Create a new resume
        Resume::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'style' => $request->style,
        ]);

        // Redirect to the resumes index page
        return redirect()->route('resumes.index');
    }

    // ResumeController.php
    public function destroy($id)
    {
        $resume = Resume::findOrFail($id);
        $resume->delete();
    
        return redirect()->route('resumes.index')->with('success', 'Resume deleted successfully');
    }

    public function show($id, $activeTab)
    {
        $user = Auth::user();
        // Fetch resume along with its related experiences
        $resume = Resume::with(['experiences','header','skills','educations'])->findOrFail($id);

        // Pass the resume (with experiences) to the Inertia view
        return Inertia::render('Resumes/Show', [
            'resume' => $resume,
            'user' => $user,
            'activeTab' => $activeTab,

        ]);
    }


}
