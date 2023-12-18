<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CollectionController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
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

// =================== PRODUCTS ===================
// Lấy danh sách sản phẩm
Route::get('products', [ProductController::class, 'index'])->name('products.index');

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


// =================== COLLECTIONS ===================
// List data collections
Route::get('collections', [CollectionController::class, 'index'])->name('collections.index');

// Đẩy data lên table collections
Route::post('collections-store', [CollectionController::class, 'store'])->name('collections-store');

// Update collection
Route::get('collections-edit/{id}', [CollectionController::class, 'edit'])->name('collections.collections-edit');

Route::patch('collections-update/{id}', [CollectionController::class, 'update'])->name('collections.collections-update');

// Xóa collection
Route::delete('collections-destroy/{id}', [CollectionController::class, 'destroy'])->name('collections.collections-destroy');


// =================== CATEGORIES ===================
Route::get('categories', [CategoryController::class, 'index'])->name('categories.index');

// Đẩy data lên table collections
Route::post('categories-store', [CategoryController::class, 'store'])->name('categories-store');

// Update collection
Route::get('categories-edit/{id}', [CategoryController::class, 'edit'])->name('categories-edit');

Route::patch('categories-update/{id}', [CategoryController::class, 'update'])->name('categories-update');

// Xóa collection
Route::delete('categories-destroy/{id}', [CategoryController::class, 'destroy'])->name('categories-destroy');


// =================== USERS ===================
// Lấy danh sách user
Route::get('users', [UserController::class, 'index']);
// Tạo user
Route::post('user/create', [UserController::class, 'store']);
// Show thông tin user edit
Route::get('user/edit/{id}', [UserController::class, 'edit']);
// Update thông tin user edit
Route::put('user/edit/{id}', [UserController::class, 'update']);
