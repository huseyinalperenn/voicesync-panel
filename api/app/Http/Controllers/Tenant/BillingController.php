<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BillingController extends Controller
{
    public function index(Request $request)
    {
        $tenant = $request->user()->tenant;

        $plans = [
            'starter' => ['name' => 'Starter', 'price' => 990, 'call_limit' => 1000],
            'pro' => ['name' => 'Pro', 'price' => 4990, 'call_limit' => 10000],
            'enterprise' => ['name' => 'Enterprise', 'price' => 12990, 'call_limit' => 100000],
        ];

        $currentPlan = $plans[$tenant->plan] ?? $plans['starter'];

        return response()->json([
            'tenant' => [
                'id' => $tenant->id,
                'name' => $tenant->name,
                'plan' => $tenant->plan,
                'status' => $tenant->status,
                'calls_used' => $tenant->calls_used,
                'call_limit' => $tenant->call_limit,
                'usage_percent' => $tenant->usage_percent,
                'trial_ends_at' => $tenant->trial_ends_at,
            ],
            'current_plan' => $currentPlan,
            'available_plans' => $plans,
            'invoices' => [
                ['id' => 'INV-2026-003', 'date' => '2026-06-01', 'amount' => $currentPlan['price'], 'status' => 'paid'],
                ['id' => 'INV-2026-002', 'date' => '2026-05-01', 'amount' => $currentPlan['price'], 'status' => 'paid'],
                ['id' => 'INV-2026-001', 'date' => '2026-04-01', 'amount' => $currentPlan['price'], 'status' => 'paid'],
            ],
        ]);
    }
}
