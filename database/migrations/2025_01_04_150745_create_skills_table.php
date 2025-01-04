<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('skills', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->unsignedBigInteger('resume_id'); // Foreign key to the resume table
            $table->string('skill_name'); // Skill name (varchar)
            $table->string('skill_category'); // Skill category (varchar)
            $table->integer('skill_order'); // Order of the skill (integer)
            $table->decimal('year_amount', 8, 2); // Amount of years of experience (decimal)
            $table->integer('proficiency'); // Proficiency level (integer)
            $table->boolean('certificate'); // If the skill has a certificate (boolean)

            $table->foreign('resume_id')->references('resume_id')->on('resume')->onDelete('cascade'); // Foreign key constraint
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skills');
    }
};
