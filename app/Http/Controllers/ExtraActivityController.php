<?php

namespace App\Http\Controllers;

use App\Models\ExtraActivity;
use App\Models\Resume;
use Illuminate\Http\Request;

class ExtraActivityController extends Controller
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
        ExtraActivity::create([
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

        return response()->json(['message' => 'Extra Activity created successfully.']);
        // Redirect back with a success message
       // return redirect()->route('resumes.show', [$resumeId, "experiences"])->with('success', 'Experience added successfully.');
      //  return redirect()->route('resumes.index', $resumeId)->with('success', 'Experience added successfully');
    }

    public function destroy($experienceId)
    {
        // Find the Experience by its ID
        $experience = ExtraActivity::findOrFail($experienceId);

        // Delete the Experience
        $experience->delete();

        // // Redirect back with a success message
        // return redirect()->route('resumes.show', [$experience->resume_id,"experiences"])
        //                  ->with('success', 'Experience deleted successfully.');

        return response()->json(['message' => 'Extra Activity deleted successfully.']);
    }

    public function update(Request $request, $resume_id, $experienceId)
    {
        // Validate input
        $request->validate([
            'initial_date' => 'required|date',
            'job_title' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'description' => 'required',
            'place' => 'required|string|max:255',
            'current' => 'boolean',
            'end_date' => 'nullable|date',
            'departure_reason' => 'nullable|string|max:255',
        ]);

        // Find the experience by ID
        $experience = ExtraActivity::findOrFail($experienceId);

        // Update the experience with the new data
        $experience->update([
            'initial_date' => $request->initial_date,
            'end_date' => $request->end_date,
            'job_title' => $request->job_title,
            'company_name' => $request->company_name,
            'description' => $request->description,
            'place' => $request->place,
            'current' => $request->current ?? false,
            'departure_reason' => $request->departure_reason,
        ]);

        // Redirect back to the resume page with a success message
        // return redirect()->route('resumes.show', [$experience->resume_id,"experiences"])
        //                  ->with('success', 'Experience updated successfully.');
        return response()->json(['message' => 'Extra Activity updated successfully.']);
    }

    // Other methods like update, destroy, etc.
}

