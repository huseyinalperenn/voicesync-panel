<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\CallLog;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $tenant = $request->user()->tenant;
        $tenantId = $tenant->id;

        $totalCalls = CallLog::where('tenant_id', $tenantId)->count();
        $callsToday = CallLog::where('tenant_id', $tenantId)->whereDate('started_at', today())->count();
        $avgDuration = CallLog::where('tenant_id', $tenantId)->avg('duration_seconds') ?? 0;

        $callsByDay = CallLog::where('tenant_id', $tenantId)
            ->selectRaw("DATE(started_at) as date, COUNT(*) as count")
            ->where('started_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $recentCalls = CallLog::where('tenant_id', $tenantId)
            ->with('agent')
            ->latest('started_at')
            ->take(5)
            ->get();

        return response()->json([
            'metrics' => [
                'total_calls' => $totalCalls,
                'calls_today' => $callsToday,
                'avg_duration' => round($avgDuration),
            ],
            'calls_by_day' => $callsByDay,
            'recent_calls' => $recentCalls,
        ]);
    }
}