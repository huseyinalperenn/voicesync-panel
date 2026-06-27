<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\KnowledgeBase;
use Illuminate\Http\Request;

class KnowledgeBaseController extends Controller
{
    public function index(Request $request)
    {
        $items = KnowledgeBase::where('tenant_id', $request->user()->tenant_id)
            ->latest()
            ->get();
        return response()->json($items);
    }

    public function show(Request $request, KnowledgeBase $knowledgeBase)
    {
        $this->checkOwnership($request, $knowledgeBase);
        return response()->json($knowledgeBase);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:document,faq,url',
            'content' => 'nullable|string',
            'source_url' => 'nullable|url',
        ]);

        $item = KnowledgeBase::create([
            ...$data,
            'tenant_id' => $request->user()->tenant_id,
            'status' => 'active',
            'size' => strlen($data['content'] ?? ''),
        ]);

        return response()->json($item, 201);
    }

    public function update(Request $request, KnowledgeBase $knowledgeBase)
    {
        $this->checkOwnership($request, $knowledgeBase);

        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'nullable|string',
            'source_url' => 'nullable|url',
            'status' => 'sometimes|in:active,processing,error',
        ]);

        $knowledgeBase->update($data);
        return response()->json($knowledgeBase);
    }

    public function destroy(Request $request, KnowledgeBase $knowledgeBase)
    {
        $this->checkOwnership($request, $knowledgeBase);
        $knowledgeBase->delete();
        return response()->json(null, 204);
    }

    private function checkOwnership(Request $request, KnowledgeBase $knowledgeBase): void
    {
        if ($knowledgeBase->tenant_id !== $request->user()->tenant_id) {
            abort(403, 'Bu kaynağa erişim yetkiniz yok.');
        }
    }
}
