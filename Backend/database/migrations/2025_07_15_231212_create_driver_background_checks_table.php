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
        Schema::create('driver_background_checks', function (Blueprint $table) {
            $table->id();
            $table->longText('driver_id')->nullable();
            $table->longText('country')->nullable();
            $table->longText('background_report_url')->nullable();
            $table->boolean('criminal_record_check')->nullable();
            $table->boolean('license_validity_check')->nullable();
            $table->integer('driving_record_score')->nullable();
            $table->longText('drug_test_status')->nullable();
            $table->date('check_date')->nullable();
            $table->longText('verification_status')->nullable();
            $table->longText('notes')->nullable();
            $table->longText('provider_name')->nullable();
            $table->longText('initiated_by')->nullable();



            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driver_background_checks');
    }
};
