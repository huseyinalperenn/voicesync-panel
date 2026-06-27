<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PlatformSetting extends Model
{
    protected $table = 'platform_settings';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['key', 'value_encrypted'];

    protected $casts = [
        'value_encrypted' => 'encrypted',
    ];

    protected static function boot(): void
    {
        parent::boot();
        static::creating(fn ($model) => $model->id ??= (string) Str::uuid());
    }
}