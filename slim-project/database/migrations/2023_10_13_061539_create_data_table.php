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
        Schema::defaultStringLength(191);
        Schema::create('data', function (Blueprint $table) {
            $table->id();
            $table->string('fname',255);
            $table->string('lname',255);
            $table->string('email',255);
            $table->integer('mobile');
            $table->string('image',255);
            $table->integer('std');
            $table->string('hobby',255);
            $table->string('gender',255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data');
    }
};
