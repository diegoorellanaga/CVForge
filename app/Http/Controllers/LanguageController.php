<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Models\Resume;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    /**
     * Store a newly created language in storage.
     */
    public function store(Request $request, $resumeId)
    {
        $validated = $request->validate([
            'language' => 'required|string|max:255',
            'proficiency' => 'required|string|max:255',
            'test' => 'required|boolean',
        ]);

        $resume = Resume::findOrFail($resumeId);

        $language = $resume->languages()->create($validated);

        return redirect()->back()->with('success', 'Language added successfully.');
    }

    /**
     * Update the specified language in storage.
     */
    public function update(Request $request, $id, $resumeId)
    {
        $validated = $request->validate([
            'language' => 'required|string|max:255',
            'proficiency' => 'required|string|max:255',
            'test' => 'required|boolean',
        ]);

        $language = Language::findOrFail($id);
        $language->update($validated);

        return redirect()->route('resumes.show', [$resumeId, 'languages'])->with('success', 'language updated successfully.');
    }

    /**
     * Remove the specified language from storage.
     */
    public function destroy($id)
    {
        $language = Language::findOrFail($id);
        $language->delete();

        return redirect()->back()->with('success', 'Language deleted successfully.');
    }
}
