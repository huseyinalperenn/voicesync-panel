<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CallLog;
use Illuminate\Http\Request;

class CallController extends Controller
{
    public function index(Request $request)
    {
        $query = CallLog::with(['tenant', 'agent']);

        if ($request->tenant_id) {
            $query->where('tenant_id', $request->tenant_id);
        }
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

    public function show(CallLog $callLog)
    {
        return response()->json($callLog->load(['tenant', 'agent', 'transcript']));
    }
}