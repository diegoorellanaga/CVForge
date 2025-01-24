<?php

namespace App\Http\Controllers;

use App\Models\Header;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class HeaderController extends Controller
{
    // Show a form to create a new header
    public function create($resumeId)
    {
        $resume = Resume::findOrFail($resumeId);
        $user = Auth::user();

        return Inertia::render('Headers/Create', [
            'resume' => $resume,
            'user' => $user
        ]);
    }

    public function store(Request $request, $resumeId)
    {
        // Debug: Log the incoming request data and resume ID
        Log::info('Storing new header', [
            'request_data' => $request->all(),
            'resume_id' => $resumeId,
        ]);

        DB::listen(function ($query) {
            Log::info('SQL Query:', [
                'query' => $query->sql,
                'bindings' => $query->bindings,
                'time' => $query->time,
            ]);
        });
    
        // Validate the request
        $validatedData = $request->validate([
            'image_url' => 'nullable|url',
            'professional_summary' => 'nullable|string',
            'phone' => 'nullable|string|max:15',
            'email' => 'nullable|email',
            'location' => 'nullable|string|max:100',
            'personal_site' => 'nullable|url',
            'name' => 'nullable|string|max:100',
            'professional_title' => 'nullable|string|max:100',
            'current_company' => 'nullable|string|max:100',
            'current_position' => 'nullable|string|max:100',
        ]);
    
       // Debug: Log validated data before insertion
       Log::info('Validated header data', $validatedData);
    
        try {
            // Create a new header
            $header = Header::create([
                'resume_id' => $resumeId,
                'image_url' => $request->image_url,
                'professional_summary' => $request->professional_summary,
                'phone' => $request->phone,
                'email' => $request->email,
                'location' => $request->location,
                'personal_site' => $request->personal_site,
                'name' => $request->name,
                'professional_title' => $request->professional_title,
                'current_company' => $request->current_company,
                'current_position' => $request->current_position,
            ]);
    
            // Debug: Log success message
            Log::info('Header created successfully', ['header_id' => $header->id]);
        } catch (\Exception $e) {
            // Debug: Log the error if something goes wrong
            Log::error('Error creating header', ['error' => $e->getMessage()]);
            return back()->withErrors(['error' => 'Unable to create header.']);
        }
    
        return redirect()->route('resumes.show', [$resumeId, "header"]);
    }

    // Show a form to edit an existing header
    public function edit($id)
    {
        $header = Header::findOrFail($id);
        $user = Auth::user();

        return Inertia::render('Headers/Edit', [
            'header' => $header,
            'user' => $user,
        ]);
    }

    // Update an existing header
    public function update(Request $request, $resumeId, $headerId)
    {
        \Log::info("Resume ID: $resumeId, Header ID: $headerId");
        $request->validate([
            'image_url' => 'nullable|url',
            'summary' => 'required|string',
            'phone' => 'nullable|string|max:15',
            'email' => 'nullable|email',
            'location' => 'nullable|string|max:100',
            'personal_site' => 'nullable|url',
            'name' => 'required|string|max:100',
            'professional_title' => 'required|string|max:100',
            'current_company' => 'nullable|string|max:100',
            'current_position' => 'nullable|string|max:100',
        ]);

        $header = Header::findOrFail($headerId);
        $header->update([
            'image_url' => $request->image_url,
            'professional_summary' => $request->summary,
            'phone' => $request->phone,
            'email' => $request->email,
            'location' => $request->location,
            'personal_site' => $request->personal_site,
            'name' => $request->name,
            'professional_title' => $request->professional_title,
            'current_company' => $request->current_company,
            'current_position' => $request->current_position,
        ]);

        return redirect()->route('resumes.show', [$header->resume_id, "header"]);
    }
}
