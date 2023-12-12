<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
        $products = DB::table('products')->get();
        return response()->json([
            'products' => $products,
        ]);
    }

    public function show($id)
    {
        $product = DB::table('products')->where('id', $id)->first();
        return response()->json([
            'product' => $product,
        ]);
    }
}
