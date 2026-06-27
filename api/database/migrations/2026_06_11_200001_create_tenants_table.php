<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tenants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('company_name');
            $table->string('sip_trunk_id')->nullable()->index();
            $table->text('system_prompt')->nullable();
            $table->string('voice_id')->nullable();
            $table->enum('assigned_model', ['gemini', 'grok', 'ultravox'])->default('gemini');
            $table->string('corpus_namespace')->nullable();
            $table->enum('tier', ['starter', 'pro', 'enterprise'])->default('starter');
            $table->integer('hard_cap_minutes')->nullable();
            $table->enum('status', ['active', 'suspended', 'trial'])->default('trial');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
};