<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Design_api extends Model
{
    use HasFactory;

           /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'designers';

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];
}
