<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Categories\StoreRequest;
use App\Http\Requests\Admin\Categories\UpdateRequest;
use App\Models\CategoryModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = DB::table('categories')->get();
        return response()->json([
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = new CategoryModel();

        $data->name = $request->name;
        $data->status = $request->status;
        $data->parent_id = $request->parent_id;

        $data->save();

        return response()->json([
            'categories' => $data,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function edit($id)
    {
        $collection = DB::table('categories')->where('id', $id)->first();

        return response()->json([
            'category' => $collection,

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, $id)
    {
        $dataCurrent = DB::table('categories')->where('id', $id)->first();

        $dataNew = $request->all();
        $dataNew['name'] = $request->name;
        $dataNew['status'] = $request->status;
        $dataNew['parent_id'] = $request->parent_id;

        DB::table('categories')->where('id', $id)->update($dataNew);
        return response()->json(['message_success' => 'Data updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = DB::table('categories')->where('id', $id)->first();

        DB::table('categories')->where('id', $id)->delete();

        return response()->json([
            'category' => $data,
        ]);
    }
}
