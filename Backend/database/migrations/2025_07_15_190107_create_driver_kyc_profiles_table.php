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
        Schema::create('driver_kyc_profiles', function (Blueprint $table) {
            $table->id();
            $table->longText('driver_id')->nullable();
            $table->longText('full_name')->nullable();
            $table->longText('email')->nullable();
            $table->longText('phone')->nullable();
            $table->longText('address')->nullable();
            $table->longText('region')->nullable();
            $table->longText('national_id_number')->nullable();
            $table->longText('id_type')->nullable();
            $table->longText('id_image_front')->nullable();
            $table->longText('id_image_back')->nullable();
            $table->longText('selfie_image')->nullable();
            $table->longText('profile_image')->nullable();
            $table->date('dob')->nullable();
            $table->longText('country_of_issue')->nullable();
            $table->date('issued_date')->nullable();
            $table->date('expiry_date')->nullable();
            $table->longText('verification_status')->nullable();
            $table->longText('verified_by_admin_id')->nullable();
            $table->longText('verified_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driver_kyc_profiles');
    }
};
