<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\AdminUser;
use App\Models\TenantUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = TenantUser::where('email', $request->email)->first();
        $guard = 'tenant';

        if (! $user) {
            $user = AdminUser::where('email', $request->email)->first();
            $guard = 'admin';
        }

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Geçersiz kimlik bilgileri.'],
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'guard' => $guard,
        ];

        if ($guard === 'tenant') {
            $userData['tenant_id'] = $user->tenant_id;
        }

        return response()->json(['token' => $token, 'user' => $userData]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Çıkış yapıldı.']);
    }

    public function me(Request $request)
    {
        $user = $request->user();

        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
        ];

        if ($user instanceof TenantUser) {
            $data['guard'] = 'tenant';
            $data['tenant_id'] = $user->tenant_id;
            $data['tenant'] = $user->tenant;
        } else {
            $data['guard'] = 'admin';
        }

        return response()->json($data);
    }
}