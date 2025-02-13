<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SkillController extends Controller
{
    public function store(Request $request, $resumeId)
    {
        // Validate input
        $request->validate([
            'skill_name' => 'required|string|max:255',
            'skill_category' => 'required|string|max:255',
            'skill_order' => 'required|integer',
            'year_amount' => 'required|numeric',
            'proficiency' => 'required|integer|between:1,5',
            'certificate' => 'required|boolean',
        ]);

        // Create new Skill and associate with Resume
        Skill::create([
            'resume_id' => $resumeId,
            'skill_name' => $request->skill_name,
            'skill_category' => $request->skill_category,
            'skill_order' => $request->skill_order,
            'year_amount' => $request->year_amount,
            'proficiency' => $request->proficiency,
            'certificate' => $request->certificate,
        ]);

        // Redirect back with a success message
        return response()->json(['message' => 'Skill added successfully.']);
    }

    public function destroy($skillId)
    {
        // Find the Skill by its ID
        $skill = Skill::findOrFail($skillId);

        // Delete the Skill
        $skill->delete();

        // Redirect back with a success message
        return response()->json(['message' => 'Skill deleted successfully.']);
    }

    public function update(Request $request, $resumeId, $skillId)
    {
        // Log the incoming request data for debugging
        Log::debug('Update Skill Request Data 2:', $request->all());
        Log::debug('Resume ID:', [$resumeId]);
        Log::debug('Skill ID:', [$skillId]);
        
        // Validate input with custom error messages
        $validated = $request->validate([
            'skill_name' => 'required|string|max:255',
            'skill_category' => 'required|string|max:255',
            'skill_order' => 'required|integer',
            'year_amount' => 'required|numeric',
            'proficiency' => 'required|integer|between:1,5',
            'certificate' => 'required|boolean',
        ]);
    
        // Check if validation has failed
        if ($validated) {
            Log::debug('Validation Passed:', $validated);
        } else {
            Log::error('Validation Failed:', $validated);
        }
    
        // Find the skill by ID
        $skill = Skill::findOrFail($skillId);
        
        // Log the current skill data before updating
        Log::debug('Current Skill Data:', $skill->toArray());
    
        // Update the skill with the new data
        $skill->update([
            'skill_name' => $request->skill_name,
            'skill_category' => $request->skill_category,
            'skill_order' => $request->skill_order,
            'year_amount' => $request->year_amount,
            'proficiency' => $request->proficiency,
            'certificate' => $request->certificate,
        ]);
    
        // Log the updated skill data
        Log::debug('Updated Skill Data:', $skill->toArray());
    
        // Redirect back to the resume page with a success message
        return response()->json(['message' => 'Skill updated successfully.']);
    }

    // Other methods like index, show, etc.
}
