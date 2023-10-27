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
        Schema::create('atmdata', function (Blueprint $table) {
            $table->id();
            $table->string('transaction');
            $table->bigInteger('notes_500');
            $table->bigInteger('notes_100');
            $table->bigInteger('amount');
            $table->bigInteger('total');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('atmdata');
    }
};
