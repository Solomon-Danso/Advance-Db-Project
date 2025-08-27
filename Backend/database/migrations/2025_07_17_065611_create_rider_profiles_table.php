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
        Schema::create('rider_profiles', function (Blueprint $table) {
            $table->id();
            $table->longText('rider_id')->nullable();
            $table->longText('full_name')->nullable();
            $table->longText('phone_number')->nullable();
            $table->longText('email')->nullable();
            $table->longText('country_code')->nullable();
            $table->longText('preferred_currency')->nullable();
            $table->longText('profile_photo_url')->nullable();
             $table->longText("Password")->nullable();
            $table->longText("Role")->nullable();
            $table->longText("TokenId")->nullable();
            $table->datetime("TokenExpire")->nullable();
            $table->integer("LoginLimit")->default(0);
            $table->boolean("IsBlocked")->default(false);
            $table->boolean("IsSuspended")->default(false);
            $table->datetime("SuspensionExpire")->nullable();



            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rider_profiles');
    }
};
