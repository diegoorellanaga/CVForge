<?php

namespace App\Http\Controllers;

use App\Models\Education;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function store(Request $request, $resumeId)
    {
        // Validate input
        $request->validate([
            'initial_date' => 'nullable|date',
            'graduation_date' => 'nullable|date',
            'description' => 'nullable|string',
            'degree' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'place' => 'nullable|string|max:255',
        ]);

        // Create new Education record
        Education::create([
            'resume_id' => $resumeId,
            'initial_date' => $request->initial_date,
            'graduation_date' => $request->graduation_date,
            'description' => $request->description,
            'degree' => $request->degree,
            'institution' => $request->institution,
            'country' => $request->country,
            'place' => $request->place,
        ]);

        return redirect()->route('resumes.show', [$resumeId, 'education'])->with('success', 'Education added successfully.');
    }

    public function destroy($educationId)
    {
        // Find and delete the education record
        $education = Education::findOrFail($educationId);
        $education->delete();

        return redirect()->route('resumes.show', [$education->resume_id, 'education'])->with('success', 'Education deleted successfully.');
    }

    public function update(Request $request, $resumeId, $educationId)
    {
        // Validate input
        $request->validate([
            'initial_date' => 'nullable|date',
            'graduation_date' => 'nullable|date',
            'description' => 'nullable|string',
            'degree' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'place' => 'nullable|string|max:255',
        ]);

        // Find and update the education record
        $education = Education::findOrFail($educationId);
        $education->update($request->all());

        return redirect()->route('resumes.show', [$resumeId, 'education'])->with('success', 'Education updated successfully.');
    }
}
