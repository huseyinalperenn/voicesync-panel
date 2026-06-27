<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CallLog;
use App\Models\Tenant;

class DashboardController extends Controller
{
    public function index()
    {
        $totalTenants = Tenant::count();
        $activeTenants = Tenant::where('status', 'active')->count();
        $totalCalls = CallLog::count();
        $callsToday = CallLog::whereDate('started_at', today())->count();

        $callsByDay = CallLog::selectRaw("DATE(started_at) as date, COUNT(*) as count")
            ->where('started_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $recentTenants = Tenant::latest()->take(5)->get();

        return response()->json([
            'metrics' => [
                'total_tenants' => $totalTenants,
                'active_tenants' => $activeTenants,
                'total_calls' => $totalCalls,
                'calls_today' => $callsToday,
            ],
            'calls_by_day' => $callsByDay,
            'recent_tenants' => $recentTenants,
        ]);
    }
}