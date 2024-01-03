<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderDetailModel extends Model
{
    use HasFactory;

    protected $table = 'cart_detail';

    protected $guarded = [];

    public function order(): BelongsTo
    {
        return $this->belongsTo(OrderModel::class);
    }
}
