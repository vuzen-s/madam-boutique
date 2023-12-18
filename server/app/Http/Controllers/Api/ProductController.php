<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Products\StoreRequest;
use App\Http\Requests\Admin\Products\UpdateRequest;
use App\Models\BrandModel;
use App\Models\CategoryModel;
use App\Models\CollectionModel;
use App\Models\DesignerModel;
use App\Models\ProductModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
        $products = ProductModel::with(['designer', 'brand', 'collection', 'category'])->get();
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

    public function create()
    {
        $designers = DB::table('designers')->get();
        $brands = DB::table('brands')->get();
        $collections = DB::table('collections')->get();
        $categories = DB::table('categories')->get();

        return response()->json([
            'designers' => $designers,
            'brands' => $brands,
            'collections' => $collections,
            'categories' => $categories,
        ]);
    }

    public function store(StoreRequest $request)
    {
        $data = new ProductModel();

        // $data = $request->except(['_token', 'avatar', 'images']);
        $data->name = $request->name;
        $data->price = $request->price;
        $data->desc = $request->desc;
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
            $data->avatar = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
        }

        // DB::table('products')->insert($data);

        $data->save();

        // multi image
        $productID = $data->id;
        $productImageName = $data->name;
        $dataProductImage = array();
        $products_images = $request->images;
        $count = 0;
        if ($products_images != null) {
            foreach ($products_images as $value) {
                $nameImageDetail = $count . '_' . time() . '_' . $value->getClientOriginalName();
                $value->move(public_path('uploads/'), $nameImageDetail);
                $count++;

                $dataProductImage[] = array(
                    'name' => $productImageName,
                    'file_name' => $nameImageDetail,
                    'product_id' => $productID,
                    'created_at' => now(),
                    'updated_at' => now(),
                );
            }
        }

        DB::table('product_images')->insert($dataProductImage);

        return response()->json(['message_success' => 'Data created successfully']);
    }

    public function edit($id)
    {
        $product = DB::table('products')->where('id', $id)->first();
        $designers = DB::table('designers')->get();
        $brands = DB::table('brands')->get();
        $collections = DB::table('collections')->get();
        $categories = DB::table('categories')->get();

        return response()->json([
            'product' => $product,
            'designers' => $designers,
            'brands' => $brands,
            'collections' => $collections,
            'categories' => $categories,
        ]);
    }

    public function update(UpdateRequest $request, $id)
    {
        $dataCurrent = DB::table('products')->where('id', $id)->first();
        $dataNew = $request->except(['_token', 'avatar', 'images_old']);

        // nếu người dùng có thay đổi avatar
        if (isset($request->avatar)) {
            // xóa avatar hiện tại lưu trong thư mục public
            $avatarCurrent = $dataCurrent->avatar;
            $imgPath = public_path('uploads/' . $avatarCurrent);
            if (file_exists($imgPath)) {
                unlink($imgPath);
            }
            // thay thế nó bằng file avatar mới được cập nhật
            $avatar = $request->avatar;
            $dataNew['avatar'] = $avatar;
            // $dataNew['avatar'] = time() . $avatar->getClientOriginalName();
            // $avatar->move(public_path('uploads/'), $dataNew['avatar']);
        }

        DB::table('products')->where('id', $id)->update($dataNew);
        return response()->json(['message_success' => 'Data updated successfully']);
    }


    public function destroy($id)
    {
        $data = DB::table('products')->where('id', $id)->first();
        $avatar = $data->avatar;
        $imgPath = public_path('uploads/' . $avatar);

        DB::table('products')->where('id', $id)->delete();

        // xóa ảnh trong thư mục public
        if (file_exists($imgPath)) {
            unlink($imgPath);
        }

        return response()->json([
            'product' => $data,
        ]);
    }
}
