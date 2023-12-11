<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiProductController extends Controller
{
    public function index()
    {
        $product = DB::table('products')->get();
        return response()->json([
            'productApi' => $product,
        ]);
    }
}
