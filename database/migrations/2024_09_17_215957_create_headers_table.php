<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('headers', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('resume_id')
            ->constrained('resume', 'resume_id') // Specify both the table and the primary key name
            ->onDelete('cascade');
            $table->string('name'); // Person's name (not nullable)
            $table->string('professional_title'); // Professional title (e.g., engineer, cook, etc.)
            $table->text('professional_summary'); // Professional summary
            $table->string('image_url')->nullable(); // URL of the image (nullable)
            $table->string('phone')->nullable(); // Phone number (nullable)
            $table->string('email')->nullable(); // Email (nullable)
            $table->string('location')->nullable(); // Location (nullable)
            $table->string('personal_site')->nullable(); // Personal website or another URL (nullable)
            $table->string('current_company')->nullable(); // Current company (nullable)
            $table->string('current_position')->nullable(); // Current position at that company (nullable)
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('headers');
    }
};
