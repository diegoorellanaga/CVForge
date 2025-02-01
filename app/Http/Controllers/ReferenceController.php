<?php

namespace App\Http\Controllers;

use App\Models\Reference;
use Illuminate\Http\Request;

class ReferenceController extends Controller
{
    /**
     * Store a newly created reference in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'resume_id' => 'required|exists:resume,resume_id',
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'company_name' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'relation' => 'nullable|string|max:255',
        ]);

        $reference = Reference::create($validatedData);

       // return response()->json(['message' => 'Reference created successfully', 'reference' => $reference], 201);
    
        return redirect()->route('resumes.show', [$request->resume_id, "references"])->with('success', 'Reference added successfully.');
    }

    /**
     * Update the specified reference in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Reference  $reference
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id, $resumeId)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'company_name' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'relation' => 'nullable|string|max:255',
        ]);


        $reference = Reference::findOrFail($id);
        $reference->update($validatedData);

        //return redirect()->route('resumes.show', [$resumeId, 'references'])->with('success', 'language updated successfully.');
        return response()->json(['message' => 'Reference updated successfully.']);


  }

    /**
     * Remove the specified reference from storage.
     *
     * @param  \App\Models\Reference  $reference
     * @return \Illuminate\Http\Response
     */
    public function destroy($referenceId)
    {
        // Find the Skill by its ID
        $reference = Reference::findOrFail($referenceId);

        // Delete the Skill
        $reference->delete();

        // Redirect back with a success message
        return redirect()->route('resumes.show', [$reference->resume_id, "references"])
                         ->with('success', 'Reference deleted successfully.');
    }


    // public function destroy($skillId)
    // {
    //     // Find the Skill by its ID
    //     $skill = Skill::findOrFail($skillId);

    //     // Delete the Skill
    //     $skill->delete();

    //     // Redirect back with a success message
    //     return redirect()->route('resumes.show', [$skill->resume_id, "skills"])
    //                      ->with('success', 'Skill deleted successfully.');
    // }









}
