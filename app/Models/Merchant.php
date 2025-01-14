<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class Merchant extends Authenticatable
{
    use Notifiable, HasRoles;

    protected $guard_name = 'merchant';
    protected $fillable = ['name', 'email', 'password', 'domain', 'data'];

    protected $hidden = ['password'];

    public function shops()
    {
        return $this->hasMany(Shop::class, 'user_id');
    }
}
