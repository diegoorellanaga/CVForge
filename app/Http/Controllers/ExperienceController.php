<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use App\Models\Resume;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function store(Request $request, $resumeId)
    {
        // Validate input
        $request->validate([
            'initial_date' => 'required|date',
            'job_title' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'description' => 'required',
            'place' => 'required',
            'current' => 'boolean',
            'end_date' => 'nullable|date',
            'departure_reason' => 'nullable|string|max:255',
        ]);

        // Create new Experience and associate with Resume
        Experience::create([
            'resume_id' => $resumeId,
            'initial_date' => $request->initial_date,
            'end_date' => $request->end_date,
            'job_title' => $request->job_title,
            'company_name' => $request->company_name,
            'description' => $request->description,
            'place' => $request->place,
            'current' => $request->current ?? false,
            'departure_reason' => $request->departure_reason,
        ]);
        // Redirect back with a success message
        return redirect()->route('resumes.show', $resumeId)->with('success', 'Experience added successfully.');
      //  return redirect()->route('resumes.index', $resumeId)->with('success', 'Experience added successfully');
    }

    // Other methods like update, destroy, etc.
}
