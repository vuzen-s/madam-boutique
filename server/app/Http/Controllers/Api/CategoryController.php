<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = DB::table('categories')->get();
        return response()->json([
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'id' => 'required',
            'name' => 'required',
            'status' => 'required',
            'parent' => 'required',
            
        ]);

        $category = DB::create($data);

        return response()->json($category, 201);
    }
}
