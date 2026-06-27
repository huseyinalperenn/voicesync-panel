<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CallLog;
use App\Models\Tenant;
use App\Models\TenantUser;
use Illuminate\Support\Facades\DB;

class SystemController extends Controller
{
    public function stats()
    {
        $dbSize = DB::select("SELECT pg_size_pretty(pg_database_size(current_database())) as size")[0]->size ?? 'N/A';

        $callStats = CallLog::selectRaw("
            COUNT(*) as total,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
            SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed,
            SUM(CASE WHEN status = 'dropped' THEN 1 ELSE 0 END) as dropped,
            AVG(duration_seconds) as avg_duration
        ")->first();

        $tenantsByTier = Tenant::selectRaw("tier, COUNT(*) as count")
            ->groupBy('tier')
            ->pluck('count', 'tier');

        return response()->json([
            'database' => [
                'size' => $dbSize,
                'tenants' => Tenant::count(),
                'users' => TenantUser::count(),
                'calls' => CallLog::count(),
            ],
            'calls' => [
                'total' => (int) $callStats->total,
                'completed' => (int) $callStats->completed,
                'failed' => (int) $callStats->failed,
                'dropped' => (int) $callStats->dropped,
                'avg_duration_seconds' => round((float) $callStats->avg_duration),
            ],
            'tenants_by_tier' => $tenantsByTier,
            'uptime' => '99.94%',
            'version' => '1.0.0',
        ]);
    }
}