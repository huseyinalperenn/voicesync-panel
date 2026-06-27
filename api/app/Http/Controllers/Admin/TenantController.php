<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\TenantUser;
use Illuminate\Http\Request;

class TenantController extends Controller
{
    public function index(Request $request)
    {
        $query = Tenant::withCount(['users', 'callLogs', 'agents']);

        if ($request->search) {
            $query->where('company_name', 'ilike', "%{$request->search}%");
        }
        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->tier) {
            $query->where('tier', $request->tier);
        }

        return response()->json($query->latest()->paginate(20));
    }

    public function show(Tenant $tenant)
    {
        $tenant->loadCount(['users', 'callLogs', 'agents']);
        return response()->json($tenant);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'company_name' => 'required|string|max:255',
            'tier' => 'required|in:starter,pro,enterprise',
            'status' => 'sometimes|in:active,suspended,trial',
            'hard_cap_minutes' => 'nullable|integer|min:0',
            'assigned_model' => 'sometimes|in:gemini,grok,ultravox',
            'owner_email' => 'required|email|unique:tenant_users,email',
            'owner_name' => 'required|string|max:255',
            'owner_password' => 'required|string|min:8',
        ]);

        $tenant = Tenant::create([
            'company_name' => $data['company_name'],
            'tier' => $data['tier'],
            'status' => $data['status'] ?? 'trial',
            'hard_cap_minutes' => $data['hard_cap_minutes'] ?? null,
            'assigned_model' => $data['assigned_model'] ?? 'gemini',
        ]);

        TenantUser::create([
            'tenant_id' => $tenant->id,
            'name' => $data['owner_name'],
            'email' => $data['owner_email'],
            'password' => $data['owner_password'],
            'role' => 'owner',
        ]);

        return response()->json($tenant->loadCount(['users', 'callLogs', 'agents']), 201);
    }

    public function update(Request $request, Tenant $tenant)
    {
        $data = $request->validate([
            'company_name' => 'sometimes|string|max:255',
            'tier' => 'sometimes|in:starter,pro,enterprise',
            'status' => 'sometimes|in:active,suspended,trial',
            'hard_cap_minutes' => 'nullable|integer|min:0',
            'assigned_model' => 'sometimes|in:gemini,grok,ultravox',
            'system_prompt' => 'sometimes|nullable|string',
            'voice_id' => 'sometimes|nullable|string',
        ]);

        $tenant->update($data);
        return response()->json($tenant->loadCount(['users', 'callLogs', 'agents']));
    }

    public function destroy(Tenant $tenant)
    {
        $tenant->delete();
        return response()->json(null, 204);
    }
}