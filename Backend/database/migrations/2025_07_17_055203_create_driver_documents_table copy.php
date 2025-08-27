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
        Schema::create('driver_documents', function (Blueprint $table) {
            $table->id();
            $table->longText('driver_id')->nullable();
            $table->longText('document_id')->nullable();
            $table->longText('document_type')->nullable();
            $table->longText('document_name')->nullable();
            $table->longText('file_url')->nullable();
            $table->longText('issued_by')->nullable();
            $table->date('issue_date')->nullable();
            $table->date('expiry_date')->nullable();
            $table->longText('verification_status')->nullable();
            $table->longText('reviewed_by_admin')->nullable();
            $table->longText('review_notes')->nullable();
            $table->longText('is_mandatory')->nullable();
            $table->longText('status')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driver_documents');
    }
};
