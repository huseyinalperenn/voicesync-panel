<?php

use App\Models\AdminUser;
use App\Models\TenantUser;

return [

    'defaults' => [
        'guard' => 'tenant',
        'passwords' => 'tenant_users',
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'tenant_users',
        ],
        'tenant' => [
            'driver' => 'sanctum',
            'provider' => 'tenant_users',
        ],
        'admin' => [
            'driver' => 'sanctum',
            'provider' => 'admin_users',
        ],
    ],

    'providers' => [
        'tenant_users' => [
            'driver' => 'eloquent',
            'model' => TenantUser::class,
        ],
        'admin_users' => [
            'driver' => 'eloquent',
            'model' => AdminUser::class,
        ],
    ],

    'passwords' => [
        'tenant_users' => [
            'provider' => 'tenant_users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
        'admin_users' => [
            'provider' => 'admin_users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Confirmation Timeout
    |--------------------------------------------------------------------------
    |
    | Here you may define the number of seconds before a password confirmation
    | window expires and users are asked to re-enter their password via the
    | confirmation screen. By default, the timeout lasts for three hours.
    |
    */

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),

];
