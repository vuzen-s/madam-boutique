<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RatingModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RatingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ratings = RatingModel::with(['user', 'product'])->get();
        return response()->json([
            'ratings' => $ratings,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = new RatingModel();
        $data->rating = $request->rating;
        $data->user_id = $request->user_id;
        $data->product_id = $request->product_id;

        if ($request->rating_content) {
            $data->rating_content = $request->rating_content;
        }

        $data->save();

        return response()->json([
            'ratings' => $data,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($product_id)
    {
        $ratings = RatingModel::with(['user', 'product'])
            ->where([
                ['product_id', $product_id],
                ['rating', '>', 0],
            ])
            ->get();

        return response()->json([
            'ratings' => $ratings,
        ]);
    }

    public function quantityRating($rating, $product_id)
    {
        $ratings = RatingModel::with(['user', 'product'])
            ->where('product_id', $product_id)
            ->whereBetween('rating', [$rating + 0.1, $rating + 1])
            ->get();

        return response()->json([
            'ratings' => $ratings,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function edit($id)
    {
        $ratings = DB::table('ratings')->where('id', $id)->first();

        return response()->json([
            'ratings' => $ratings,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $dataCurrent = DB::table('ratings')->where('id', $id)->first();

        $dataNew = $request->all();
        if ($dataNew['rating_content']) {
            $dataNew['rating_content'] = $request->rating_content;
        }

        DB::table('ratings')->where('id', $id)->update($dataNew);
        return response()->json(['message_success' => 'Data updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = DB::table('ratings')->where('id', $id)->first();

        DB::table('ratings')->where('id', $id)->delete();

        return response()->json([
            'rating' => $data,
        ]);
    }
}
