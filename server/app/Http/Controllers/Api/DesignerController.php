<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Designers\StoreRequest;
use App\Http\Requests\Admin\Designers\UpdateRequest;
use App\Models\DesignerModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DesignerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $designers = DB::table('designers')->get();
        return response()->json([
            'designers' => $designers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = new DesignerModel();

        $data->name = $request->name;
        $data->address = $request->address;

        $data->save();

        return response()->json([
            'designers' => $data,
        ]);
    }

    public function edit($id)
    {
        $designer = DB::table('designers')->where('id', $id)->first();

        return response()->json([
            'designer' => $designer,

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, $id)
    {
        $dataCurrent = DB::table('designers')->where('id', $id)->first();

        $dataNew = $request->all();
        $dataNew['name'] = $request->name;
        $dataNew['address'] = $request->address;

        DB::table('designers')->where('id', $id)->update($dataNew);
        return response()->json(['message_success' => 'Data updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = DB::table('designers')->where('id', $id)->first();

        DB::table('designers')->where('id', $id)->delete();

        return response()->json([
            'designer' => $data,
        ]);
    }
}
