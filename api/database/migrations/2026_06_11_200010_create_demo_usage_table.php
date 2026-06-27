<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('demo_usage', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_user_id')->constrained('tenant_users')->cascadeOnDelete();
            $table->integer('duration')->nullable();
            $table->enum('status', ['completed', 'abandoned', 'limit_reached']);
            $table->timestamp('started_at');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('demo_usage');
    }
};