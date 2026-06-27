<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Transcript extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'call_log_id', 'conversation', 'sentiment', 'summary',
    ];

    protected $casts = [
        'conversation' => 'array',
    ];

    protected static function boot(): void
    {
        parent::boot();
        static::creating(fn ($model) => $model->id ??= (string) Str::uuid());
    }

    public function callLog(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CallLog::class);
    }
}