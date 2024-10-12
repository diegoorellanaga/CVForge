<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();  // Primary key
            $table->unsignedBigInteger('resume_id');  // Foreign key column
        
            // Define the foreign key relationship with the resumes table
            $table->foreign('resume_id')->references('resume_id')->on('resume')->onDelete('cascade');
    
            $table->date('initial_date');  // Start date of job
            $table->date('end_date')->nullable();  // End date, nullable if still working
            $table->string('job_title');  // Job title
            $table->string('company_name');  // Company name
            $table->string('place');  // Company name
            $table->text('description');  // Job description
            $table->boolean('current')->default(false);  // Whether currently working in the role
            $table->string('departure_reason')->nullable();  // Reason for leaving, nullable
            $table->timestamps();  // Created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
