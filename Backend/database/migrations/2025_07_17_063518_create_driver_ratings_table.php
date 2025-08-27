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
        Schema::create('driver_ratings', function (Blueprint $table) {
            $table->id();
            $table->longText('ride_id')->nullable();
            $table->longText('driver_id')->nullable();
            $table->longText('rider_id')->nullable();
            $table->integer('rating_score')->nullable();
            $table->longText('feedback_text')->nullable();
            $table->boolean('is_flagged')->nullable();
            $table->longText('flagged_reason')->nullable();
            $table->longText('country_code')->nullable();
            $table->longText('region_id')->nullable();
            $table->longText('response_by_admin')->nullable();
            $table->dateTime('rating_date')->nullable();
            $table->longText('platform')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driver_ratings');
    }
};
