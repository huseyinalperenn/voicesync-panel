<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use Illuminate\Http\Request;

class AgentController extends Controller
{
    public function index(Request $request)
    {
        $agents = Agent::where('tenant_id', $request->user()->tenant_id)
            ->withCount('calls')
            ->latest()
            ->get();
        return response()->json($agents);
    }

    public function show(Request $request, Agent $agent)
    {
        $this->checkOwnership($request, $agent);
        return response()->json($agent->loadCount('calls'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'system_prompt' => 'nullable|string',
            'voice_id' => 'nullable|string',
            'language' => 'required|string|in:tr,en',
            'active' => 'boolean',
            'settings' => 'nullable|array',
        ]);

        $agent = Agent::create([...$data, 'tenant_id' => $request->user()->tenant_id]);
        return response()->json($agent, 201);
    }

    public function update(Request $request, Agent $agent)
    {
        $this->checkOwnership($request, $agent);

        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'system_prompt' => 'nullable|string',
            'voice_id' => 'nullable|string',
            'language' => 'sometimes|string|in:tr,en',
            'active' => 'boolean',
            'settings' => 'nullable|array',
        ]);

        $agent->update($data);
        return response()->json($agent);
    }

    public function destroy(Request $request, Agent $agent)
    {
        $this->checkOwnership($request, $agent);
        $agent->delete();
        return response()->json(null, 204);
    }

    private function checkOwnership(Request $request, Agent $agent): void
    {
        if ($agent->tenant_id !== $request->user()->tenant_id) {
            abort(403, 'Bu ajana erişim yetkiniz yok.');
        }
    }
}
