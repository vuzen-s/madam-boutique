<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Collections\StoreRequest;
use App\Http\Requests\Admin\Collections\UpdateRequest;
use App\Models\CollectionModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CollectionController extends Controller
{
    public function index()
    {
        $collections = DB::table('collections')->get();
        return response()->json([
            'collections' => $collections,
        ]);
    }

    public function store(StoreRequest $request)
    {
        $data = new CollectionModel();
        $data->name = $request->name;

        $data->save();

        return response()->json([
            'collections' => $data,
        ]);
    }

    public function edit($id)
    {
        $collection = DB::table('collections')->where('id', $id)->first();

        return response()->json([
            'collection' => $collection,

        ]);
    }

    public function update(UpdateRequest $request, $id)
    {
        $dataCurrent = DB::table('collections')->where('id', $id)->first();

        $dataNew = $request->all();
        $dataNew['name'] = $request->name;

        DB::table('collections')->where('id', $id)->update($dataNew);
        return response()->json(['message_success' => 'Data updated successfully']);
    }

    public function destroy($id)
    {
        $data = DB::table('collections')->where('id', $id)->first();

        DB::table('collections')->where('id', $id)->delete();

        return response()->json([
            'collection' => $data,
        ]);
    }
}
