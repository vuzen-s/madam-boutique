<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DesignerModel extends Model
{
    use HasFactory;

    protected $table = 'designers';

    protected $guarded = [];
}
