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
        Schema::create('rider_histories', function (Blueprint $table) {
            $table->id();
            $table->longText('rider_id')->nullable();
            $table->longText('trip_id')->nullable();
            $table->longText('driver_id')->nullable();
            $table->longText('pickup_location')->nullable();
            $table->longText('dropoff_location')->nullable();
            $table->decimal('fare_amount')->nullable();
            $table->longText('payment_method')->nullable();
            $table->longText("ride_status")->nullable();
            $table->decimal("duration")->nullable();
            $table->decimal("distance_km")->nullable();
            $table->datetime("rated")->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rider_histories');
    }
};
