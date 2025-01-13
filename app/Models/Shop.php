<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'domain'];

    public function merchant()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
