<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductModel extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $guarded = [];

    public function designer(): BelongsTo
    {
        return $this->belongsTo(DesignerModel::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(BrandModel::class);
    }

    public function collection(): BelongsTo
    {
        return $this->belongsTo(CollectionModel::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(CategoryModel::class);
    }
}
