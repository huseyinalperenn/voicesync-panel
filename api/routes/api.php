<?php

use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => response()->json(['status' => 'ok']));

Route::prefix('auth')->group(function () {
    Route::post('login', [\App\Http\Controllers\Auth\AuthController::class, 'login']);
    Route::post('logout', [\App\Http\Controllers\Auth\AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('me', [\App\Http\Controllers\Auth\AuthController::class, 'me'])->middleware('auth:sanctum');
});

Route::prefix('tenant')->middleware('auth:tenant')->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\Tenant\DashboardController::class, 'index']);
    Route::apiResource('calls', \App\Http\Controllers\Tenant\CallController::class)->only(['index', 'show']);
    Route::apiResource('agents', \App\Http\Controllers\Tenant\AgentController::class);
    Route::apiResource('knowledge-base', \App\Http\Controllers\Tenant\KnowledgeBaseController::class);
    Route::get('billing', [\App\Http\Controllers\Tenant\BillingController::class, 'index']);
    Route::get('analytics', [\App\Http\Controllers\Tenant\AnalyticsController::class, 'index']);
});

Route::prefix('admin')->middleware('auth:admin')->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index']);
    Route::apiResource('tenants', \App\Http\Controllers\Admin\TenantController::class);
    Route::apiResource('users', \App\Http\Controllers\Admin\UserController::class);
    Route::get('system/stats', [\App\Http\Controllers\Admin\SystemController::class, 'stats']);
    Route::get('calls', [\App\Http\Controllers\Admin\CallController::class, 'index']);
    Route::get('calls/{callLog}', [\App\Http\Controllers\Admin\CallController::class, 'show']);
});