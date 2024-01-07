<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogModel;
use App\Models\CategoryModel;
use App\Models\OrderModel;
use App\Models\ProductModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = OrderModel::with(['user'])->get();
        $order_latest = DB::table('carts')->get();

        return response()->json([
            'orders' => $orders,
            'order_latest' => $order_latest,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = new OrderModel();

        $data->total = $request->total;
        $data->cart_date = $request->cart_date;
        $data->cart_status = $request->cart_status;
        $data->user_id = $request->user_id;

        $data->save();

        // Lưu từng cart detail
        $dataCartDetailList = array();
        $cart_id = $data->id;
        $name_customer = $request->name_customer;
        $phone_customer = $request->phone_customer;
        $address_customer = $request->address_customer;
        $quantity = $request->quantity;
        $price = $request->price;
        $product_ids = $request->product_ids;

        if ($product_ids != null) {
            foreach ($product_ids as $key => $product_id) {
                $dataCartDetailList[] = array(
                    'name_customer' => $name_customer,
                    'phone_customer' => $phone_customer,
                    'address_customer' => $address_customer,
                    'quantity' => $quantity[$key],
                    'price' => $price[$key],
                    'product_id' => $product_id,
                    'cart_id' => $cart_id,
                    'created_at' => now(),
                    'updated_at' => now(),
                );
            }
        }

        DB::table('cart_detail')->insert($dataCartDetailList);

        return response()->json([
            'orders' => $data,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    public function showOrdersByUserID($user_id)
    {
        $orders = OrderModel::with(['user'])
            ->where('user_id', $user_id)
            ->get();

        return response()->json([
            'orders' => $orders,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
