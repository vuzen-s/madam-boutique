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
        $products = ProductModel::with(['designer', 'brand', 'collection', 'category'])->orderByDesc('created_at')->get();
        return response()->json([
            'products' => $products,
        ]);
    }

    public function show($id)
    {
        $product = ProductModel::with(['designer', 'brand', 'collection', 'category'])
            ->where('id', $id)
            ->first();

        return response()->json([
            'product' => $product,
        ]);
    }

    public function showByCategory($category_id)
    {
        $products = ProductModel::with(['designer', 'brand', 'collection', 'category'])
            ->where('category_id', $category_id)
            ->get();

        return response()->json([
            'products' => $products,
        ]);
    }

    public function showByBrand($brand_id)
    {
        $products = ProductModel::with(['designer', 'brand', 'collection', 'category'])
            ->where('brand_id', $brand_id)
            ->get();

        return response()->json([
            'products' => $products,
        ]);
    }

    public function showOrderByPriceAsc()
    {
        $products = ProductModel::with(['designer', 'brand', 'collection', 'category'])
            ->orderBy('price')
            ->get();

        return response()->json([
            'products' => $products,
        ]);
    }

    public function showOrderByPriceDesc()
    {
        $products = ProductModel::with(['designer', 'brand', 'collection', 'category'])
            ->orderByDesc('price')
            ->get();

        return response()->json([
            'products' => $products,
        ]);
    }

    public function showByColor($color)
    {
        $products = ProductModel::with(['designer', 'brand', 'collection', 'category'])
            ->where('color', 'LIKE', '%' . $color . '%')
            ->get();

        return response()->json([
            'products' => $products,
        ]);
    }

    public function showByPrice($start, $end)
    {
        $products = ProductModel::with(['designer', 'brand', 'collection', 'category'])
            ->select('*')
            ->whereBetween('price', [$start, $end])
            ->get();

        return response()->json([
            'products' => $products,
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

    public function showImagesByProductID($product_id)
    {
        $product_images = DB::table('product_images')
            ->where('product_id', $product_id)
            ->get();

        return response()->json([
            'product_images' => $product_images,
        ]);
    }

    public function getPublicProductImagesPath()
    {
        $publicProductImagesPath = asset('uploads/product_images/');
        return response()->json(['publicProductImagesPath' => $publicProductImagesPath]);
    }

    public function getPublicPath()
    {
        $publicPath = asset('uploads/products/');
        return response()->json(['publicPath' => $publicPath]);
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

        // color
        if ($request->color) {
            $data->color = $request->color;
        }

        // save img
        if ($request->hasFile('avatar')) {
            $avatar = $request->avatar;
            $data->avatar = time() . '_' . $avatar->getClientOriginalName();
            $avatar->move(public_path('uploads/products/'), $data->avatar);
        } else {
            $data->avatar = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
        }

        $data->save();

        // multi image // TODO: Implements insert product_image table
        $productID = $data->id;
        $productImageName = $data->name;
        $dataProductImage = array();
        $products_images = $request->images;
        $count = 0;
        if ($products_images != null) {
            foreach ($products_images as $value) {
                $nameImageDetail = $count . '_' . time() . '_' . $value->getClientOriginalName();
                $value->move(public_path('uploads/product_images/'), $nameImageDetail);
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
        $product = ProductModel::with(['designer', 'brand', 'collection', 'category'])
            ->where('id', $id)
            ->first();
        $designers = DB::table('designers')->get();
        $brands = DB::table('brands')->get();
        $collections = DB::table('collections')->get();
        $categories = DB::table('categories')->get();

        return response()->json([
            'products' => $product,
            'designers' => $designers,
            'brands' => $brands,
            'collections' => $collections,
            'categories' => $categories,
        ]);
    }

    public function update(UpdateRequest $request, $id): \Illuminate\Http\JsonResponse
    {
        $dataCurrent = DB::table('products')->where('id', $id);

        $data = new ProductModel();

        $data->name = $request->name;
        $data->price = $request->price;
        $data->desc = $request->desc;
        $data->status = $request->status;
        $data->feature = $request->feature;
        $data->collection_id = $request->collection_id;
        $data->brand_id = $request->brand_id;
        $data->designer_id = $request->designer_id;
        $data->category_id = $request->category_id;

        // color
        if ($request->color) {
            $data->color = $request->color;
        }

        // nếu người dùng có thay đổi avatar
        if ($request->avatar) {
            // xóa avatar hiện tại lưu trong thư mục public
            $avatarCurrent = $dataCurrent->avatar;
            $imgPath = public_path('uploads/products/' . $avatarCurrent);
            if (file_exists($imgPath)) {
                unlink($imgPath);
            }
            // thay thế nó bằng file avatar mới được cập nhật
            $avatarNew = $request->avatar_new;
            $data->avatar = time() . '_' . $avatarNew->getClientOriginalName();
            $avatarNew->move(public_path('uploads/products/'), $data->avatar);
        }

//        $data->update();

        DB::table('products')->where('id', $id)->update([
            [
                'name' => $request->name,
                'price' => $request->price,
                'desc' => $request->desc,
                'status' => $request->status,
                'feature' => $request->feature,
                'collection_id' => $request->collection_id,
                'brand_id' => $request->brand_id,
                'designer_id' => $request->designer_id,
                'category_id' => $request->category_id,
            ]
        ]);
        return response()->json(['message_success' => 'Data updated successfully']);
    }


    public function destroy($id)
    {
        $data = DB::table('products')->where('id', $id)->first();
        $dataImages = DB::table('product_images')->where('product_id', $id)->get();

        $avatar = $data->avatar;
        $imgPath = public_path('uploads/products/' . $avatar);

        if ($dataImages) {
            foreach ($dataImages as $value) {
                $imageItem = $value->file_name;
                $imageItemPath = public_path('uploads/product_images/' . $imageItem);
                // xóa ảnh trong thư mục product_images
                if (file_exists($imageItemPath)) {
                    unlink($imageItemPath);
                }
            }
        }

        DB::table('product_images')->where('product_id', $id)->delete();
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
