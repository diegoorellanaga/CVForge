<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEducationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('education', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('resume_id'); // Foreign key to the resume table
            $table->foreign('resume_id')->references('resume_id')->on('resume')->onDelete('cascade'); // Foreign key constraint
            $table->date('initial_date')->nullable();
            $table->date('graduation_date')->nullable();
            $table->text('description')->nullable();
            $table->string('degree');
            $table->string('institution');
            $table->string('country');
            $table->string('place')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('education');
    }
}
