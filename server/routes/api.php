<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Lấy danh sách sản phẩm
Route::get('products', [ProductController::class, 'index'])->name('products.index');
 Route::get('/design', [ApiController::class, 'index']);

// Lấy thông tin sản phẩm theo id
Route::get('products/{id}', [ProductController::class, 'show'])->name('products.show');

// lấy data từ bảng khác
Route::get('products-create', [ProductController::class, 'create'])->name('products.product-create');

// Thêm sản phẩm 
Route::post('products-store', [ProductController::class, 'store'])->name('products.products-store');

// Xóa sản phẩm
Route::delete('products-destroy/{id}', [ProductController::class, 'destroy'])->name('products.product-destroy');

// Update sản phẩm
Route::get('products-edit/{id}', [ProductController::class, 'edit'])->name('products.product-edit');

Route::patch('products-update/{id}', [ProductController::class, 'update'])->name('products.product-update');



