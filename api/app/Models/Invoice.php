<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Invoice extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'tenant_id', 'period', 'subscription_amount', 'total_minutes',
        'usage_amount', 'total', 'status',
    ];

    protected $casts = [
        'subscription_amount' => 'decimal:2',
        'usage_amount' => 'decimal:2',
        'total' => 'decimal:2',
        'total_minutes' => 'integer',
    ];

    protected static function boot(): void
    {
        parent::boot();
        static::creating(fn ($model) => $model->id ??= (string) Str::uuid());
    }

    public function tenant(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }
}