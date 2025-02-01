<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLanguagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('languages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('resume_id');
            $table->string('language');
            $table->string('proficiency'); // Example: Beginner, Intermediate, Fluent
            $table->boolean('test')->default(false); // Indicates whether a language test was taken
            $table->timestamps();

            $table->foreign('resume_id')->references('resume_id')->on('resume')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('languages');
    }
}
