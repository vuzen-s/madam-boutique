<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Illuminate\Http\Request;

class CollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $collections = Collection::all();
        return response()->json($collections, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'name_design' => 'required',
            // Các trường khác nếu có
        ]);

        $collection = Collection::create($data);

        return response()->json($collection, 201);
    }
    public function show(string $id)
    {
        //
    }

    public function update(Request $request, $id)
    {
      
        $request->validate([
            'name' => 'required|string',
            'name_design' => 'required|string',
           
        ]);

        // Tìm collection theo ID
        $collection = Collection::findOrFail($id);

        // Cập nhật dữ liệu
        $collection->update($request->all());

        // Trả về thông tin collection sau khi cập nhật
        return response()->json($collection, 200);
    }

    


    public function destroy($id)
    {
        $collection = Collection::findOrFail($id);
        $collection->delete();

        return response()->json(null, 204);
    }

}
