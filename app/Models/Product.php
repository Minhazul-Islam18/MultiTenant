<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'price', 'tenant_id'];

    public function shop()
    {
        return $this->belongsTo(Shop::class, 'tenant_id', 'id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
