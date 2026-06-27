<?php

namespace Database\Seeders;

use App\Models\AdminUser;
use App\Models\Agent;
use App\Models\CallLog;
use App\Models\Tenant;
use App\Models\TenantUser;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        AdminUser::create([
            'name' => 'Super Admin',
            'email' => 'admin@voicesync.com',
            'password' => bcrypt('password'),
            'role' => 'super_admin',
        ]);

        $tenant = Tenant::create([
            'company_name' => 'Acme Corp',
            'tier' => 'pro',
            'status' => 'active',
            'assigned_model' => 'gemini',
            'hard_cap_minutes' => 10000,
        ]);

        TenantUser::create([
            'tenant_id' => $tenant->id,
            'name' => 'Tenant Owner',
            'email' => 'owner@acme.com',
            'password' => bcrypt('password'),
            'role' => 'owner',
        ]);

        $agent = Agent::create([
            'tenant_id' => $tenant->id,
            'name' => 'Customer Service Agent',
            'system_prompt' => 'You are a helpful customer service assistant for Acme Corp.',
            'voice_id' => 'tr-TR-Standard-A',
            'language' => 'tr',
            'active' => true,
        ]);

        $phones = ['+90 212 555 01 01', '+90 532 123 45 67', '+90 216 444 99 00', '+90 505 876 54 32'];
        $statuses = ['completed', 'completed', 'completed', 'dropped', 'failed'];

        for ($i = 0; $i < 50; $i++) {
            $duration = rand(30, 600);
            $started = now()->subDays(rand(0, 30))->subHours(rand(0, 23));
            CallLog::create([
                'tenant_id' => $tenant->id,
                'agent_id' => $agent->id,
                'caller_number' => $phones[array_rand($phones)],
                'duration_seconds' => $duration,
                'model' => 'gemini',
                'status' => $statuses[array_rand($statuses)],
                'started_at' => $started,
                'ended_at' => $started->clone()->addSeconds($duration),
            ]);
        }
    }
}