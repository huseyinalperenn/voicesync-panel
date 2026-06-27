<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\CallLog;
use Illuminate\Http\Request;

class CallController extends Controller
{
    public function index(Request $request)
    {
        $tenantId = $request->user()->tenant_id;
        $query = CallLog::where('tenant_id', $tenantId)->with('agent');

        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->search) {
            $query->where('caller_number', 'ilike', "%{$request->search}%");
        }
        if ($request->from) {
            $query->whereDate('started_at', '>=', $request->from);
        }
        if ($request->to) {
            $query->whereDate('started_at', '<=', $request->to);
        }

        return response()->json($query->latest('started_at')->paginate(50));
    }

    public function show(Request $request, CallLog $callLog)
    {
        if ($callLog->tenant_id !== $request->user()->tenant_id) {
            return response()->json(['message' => 'Bu çağrıya erişim yetkiniz yok.'], 403);
        }
        return response()->json($callLog->load(['agent', 'transcript']));
    }
}