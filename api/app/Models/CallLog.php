<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CallLog extends Model
{
    protected $table = 'call_logs';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'tenant_id', 'agent_id', 'caller_number', 'duration_seconds',
        'model', 'status', 'cost', 'started_at', 'ended_at',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'cost' => 'decimal:4',
        'duration_seconds' => 'integer',
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

    public function agent(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Agent::class);
    }

    public function transcript(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Transcript::class, 'call_log_id');
    }

    public function getDurationFormattedAttribute(): string
    {
        $minutes = (int) floor($this->duration_seconds / 60);
        $seconds = $this->duration_seconds % 60;
        return sprintf('%d:%02d', $minutes, $seconds);
    }
}