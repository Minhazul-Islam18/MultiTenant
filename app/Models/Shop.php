<?php

namespace App\Models;

use App\Models\Merchant;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\Authenticatable;
use Stancl\Tenancy\Database\Models\TenantPivot;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Auth\Authenticatable as AuthenticatableTrait;

class Shop extends BaseTenant implements TenantWithDatabase, Authenticatable
{
    use HasDatabase, HasDomains, Notifiable, AuthenticatableTrait;

    protected $table = 'shops';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'name',
        'email',
        'user_id',
        'domain',
        'data',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'data' => 'array',
        'email_verified_at' => 'datetime',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Custom columns for tenancy.
     *
     * @return array
     */
    public static function getCustomColumns(): array
    {
        return [
            'id',
            'name',
            'user_id',
            'email',
            'password',
            'domain',
        ];
    }

    /**
     * Get the merchant that owns the Shop
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    // public function merchant(): BelongsTo
    // {
    //     return $this->belongsTo(Merchant::class, 'user_id');
    // }

    public function merchants(): BelongsToMany
    {
        return $this->belongsToMany(Merchant::class, 'tenant_users', 'tenant_id', 'global_user_id', 'id', 'global_id')
            ->using(TenantPivot::class);
    }
}
