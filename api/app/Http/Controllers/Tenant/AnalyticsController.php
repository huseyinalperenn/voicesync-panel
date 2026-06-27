<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\CallLog;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    public function index(Request $request)
    {
        $tenantId = $request->user()->tenant_id;
        $days = (int) ($request->days ?? 30);

        $base = CallLog::where('tenant_id', $tenantId)
            ->where('started_at', '>=', now()->subDays($days));

        $total = (clone $base)->count();
        $avgDuration = (clone $base)->avg('duration_seconds') ?? 0;

        $byDay = (clone $base)
            ->selectRaw("DATE(started_at) as date, COUNT(*) as count")
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $byStatus = (clone $base)
            ->selectRaw("status, COUNT(*) as count")
            ->groupBy('status')
            ->pluck('count', 'status');

        $byHour = (clone $base)
            ->selectRaw("EXTRACT(HOUR FROM started_at)::int as hour, COUNT(*) as count")
            ->groupBy('hour')
            ->orderBy('hour')
            ->pluck('count', 'hour');

        return response()->json([
            'summary' => [
                'total_calls' => $total,
                'avg_duration' => round($avgDuration),
            ],
            'by_day' => $byDay,
            'by_status' => $byStatus,
            'by_hour' => $byHour,
        ]);
    }
}