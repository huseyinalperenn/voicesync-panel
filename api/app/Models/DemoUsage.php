<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class DemoUsage extends Model
{
    protected $table = 'demo_usage';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'tenant_user_id', 'duration', 'status', 'started_at',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'duration' => 'integer',
    ];

    protected static function boot(): void
    {
        parent::boot();
        static::creating(fn ($model) => $model->id ??= (string) Str::uuid());
    }

    public function tenantUser(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(TenantUser::class);
    }
}