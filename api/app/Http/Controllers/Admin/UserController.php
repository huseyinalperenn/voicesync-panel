<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TenantUser;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = TenantUser::with('tenant');

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'ilike', "%{$request->search}%")
                  ->orWhere('email', 'ilike', "%{$request->search}%");
            });
        }
        if ($request->role) {
            $query->where('role', $request->role);
        }

        return response()->json($query->latest()->paginate(20));
    }

    public function show(TenantUser $user)
    {
        return response()->json($user->load('tenant'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:tenant_users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:owner,admin,member',
            'tenant_id' => 'required|exists:tenants,id',
        ]);

        $user = TenantUser::create($data);
        return response()->json($user->load('tenant'), 201);
    }

    public function update(Request $request, TenantUser $user)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:tenant_users,email,' . $user->id,
            'password' => 'sometimes|string|min:8',
            'role' => 'sometimes|in:owner,admin,member',
        ]);

        $user->update($data);
        return response()->json($user->load('tenant'));
    }

    public function destroy(TenantUser $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }
}