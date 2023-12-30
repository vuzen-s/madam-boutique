<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlogModel extends Model
{
    use HasFactory;

    protected $table = 'blogs';

    protected $guarded = [];

    public function topic(): BelongsTo
    {
        return $this->belongsTo(TopicModel::class);
    }
}
