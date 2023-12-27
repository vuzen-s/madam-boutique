<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Comments\StoreRequest;
use App\Http\Requests\Client\Comments\UpdateRequest;
use App\Models\CommentModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comments = CommentModel::with(['user', 'product'])->get();
        return response()->json([
            'comments' => $comments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = new CommentModel();
        $data->content = $request->content;
        $data->user_id = $request->user_id;
        $data->product_id = $request->product_id;

        $data->save();

        return response()->json([
            'comments' => $data,
        ]);
    }

    public function show($product_id)
    {
        $comments = CommentModel::with(['user', 'product'])->where('product_id', $product_id)->get();

        return response()->json([
            'comments' => $comments,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function edit($id)
    {
        $comment = DB::table('comments')->where('id', $id)->first();

        return response()->json([
            'comments' => $comment,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, $id)
    {
        $dataCurrent = DB::table('comments')->where('id', $id)->first();

        $dataNew = $request->all();
        $dataNew['content'] = $request->content;

        DB::table('comments')->where('id', $id)->update($dataNew);
        return response()->json(['message_success' => 'Data updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = DB::table('comments')->where('id', $id)->first();

        DB::table('comments')->where('id', $id)->delete();

        return response()->json([
            'comment' => $data,
        ]);
    }
}
