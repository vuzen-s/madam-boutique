<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Brands\StoreRequest;
use App\Http\Requests\Admin\Brands\UpdateRequest;
use App\Models\BrandModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = DB::table('brands')->get();
        return response()->json([
            'brands' => $brands,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = new BrandModel();
        $data->name = $request->name;

        $data->save();

        return response()->json([
            'brands' => $data,
        ]);
    }

    public function edit($id)
    {
        $brand = DB::table('brands')->where('id', $id)->first();

        return response()->json([
            'brand' => $brand,

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, $id)
    {
        $dataCurrent = DB::table('brands')->where('id', $id)->first();

        $dataNew = $request->all();
        $dataNew['name'] = $request->name;

        DB::table('brands')->where('id', $id)->update($dataNew);
        return response()->json(['message_success' => 'Data updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = DB::table('brands')->where('id', $id)->first();

        DB::table('brands')->where('id', $id)->delete();

        return response()->json([
            'brand' => $data,
        ]);
    }
}
