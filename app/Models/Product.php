<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'price', 'tenant_id'];

    // Optional: Add a tenant relationship
    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }
}
