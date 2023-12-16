<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Products\StoreRequest;
use App\Models\ProductModel;
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

    public function store(StoreRequest $request)
    {
        $data = new ProductModel();

        // $data = $request->except(['_token', 'avatar', 'images']);
        $data->name = $request->name;
        $data->price = $request->price;
        $data->description = $request->description;
        $data->status = $request->status;
        $data->feature = $request->feature;
        $data->collection_id = $request->collection_id;
        $data->brand_id = $request->brand_id;
        $data->designer_id = $request->designer_id;
        $data->category_id = $request->category_id;

        // save img
        if ($request->hasFile('avatar')) {
            $avatar = $request->avatar;
            $data->avatar = time() . $avatar->getClientOriginalName();
            $avatar->move(public_path('uploads/'), $data->avatar);
        } else {
            $data->avatar = "https://miamistonesource.com/wp-content/uploads/2018/05/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg";
        }

        // DB::table('products')->insert($data);

        $data->save();

        // multi image
        $productID = $data->id;
        $dataProductImage = array();
        $products_images = $request->images;
        $count = 0;
        if ($products_images != null) {
            foreach ($products_images as $value) {
                $nameImageDetail = $count . '_' . time() . '_' . $value->getClientOriginalName();
                $value->move(public_path('uploads/'), $nameImageDetail);
                $count++;

                $dataProductImage[] = array(
                    'image' => $nameImageDetail,
                    'product_id' => $productID,
                    'created_at' => now(),
                    'updated_at' => now(),
                );
            }
        }

        DB::table('product_images')->insert($dataProductImage);

        return response()->json(['message_success' => 'Data created successfully']);
    }
}
