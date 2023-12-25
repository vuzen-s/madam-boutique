<?php

use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CollectionController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\DesignerController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\Mail\ContactMailController;

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
// Lấy thông tin sản phẩm theo category_id
Route::get('products-showbycategory/{category_id}', [ProductController::class, 'showByCategory'])->name('products.showByCategory');
// Lấy thông tin sản phẩm theo brand_id
Route::get('products-showbybrand/{brand_id}', [ProductController::class, 'showByBrand'])->name('products.showByBrand');
// Lấy thông tin sản phẩm theo giá start->end
Route::get('products-{start}-to-{end}', [ProductController::class, 'showByPrice'])->name('products.showByPrice');
// Lấy thông tin sản phẩm theo màu sắc
Route::get('products-color/{color}', [ProductController::class, 'showByColor'])->name('products.showByColor');
// Lấy thông tin sản phẩm theo giá tăng dần
Route::get('products-asc', [ProductController::class, 'showOrderByPriceAsc'])->name('products.showOrderByPriceAsc');
// Lấy thông tin sản phẩm theo giá giảm dần
Route::get('products-desc', [ProductController::class, 'showOrderByPriceDesc'])->name('products.showOrderByPriceDesc');
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
// Lấy thông tin categories theo id
Route::get('categories/{id}', [CategoryController::class, 'show'])->name('categories.show');
// Đẩy data lên table categories
Route::post('categories-store', [CategoryController::class, 'store'])->name('categories.store');
// Update categories
Route::get('categories-edit/{id}', [CategoryController::class, 'edit'])->name('categories.edit');
Route::patch('categories-update/{id}', [CategoryController::class, 'update'])->name('categories.update');
// Xóa categories
Route::delete('categories-destroy/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');


// =================== USERS ===================
// Lấy danh sách user
Route::get('users', [UserController::class, 'index']);
// show user
Route::get('user/{id}', [UserController::class, 'show']);
// Tạo user
Route::post('user/create', [UserController::class, 'store']);
// Show thông tin user edit
Route::get('user/edit/{id}', [UserController::class, 'edit']);
// Update thông tin user edit
Route::put('user/edit/{id}', [UserController::class, 'update']);

// =================== DESIGNERS ===================
Route::get('designers', [DesignerController::class, 'index'])->name('designers.index');
// Đẩy data lên table designers
Route::post('designers-store', [DesignerController::class, 'store'])->name('designers.store');
// Update designers
Route::get('designers-edit/{id}', [DesignerController::class, 'edit'])->name('designers.edit');
Route::patch('designers-update/{id}', [DesignerController::class, 'update'])->name('designers.update');
// Xóa designers
Route::delete('designers-destroy/{id}', [DesignerController::class, 'destroy'])->name('designers.destroy');

// =================== BRANDS ===================
Route::get('brands', [BrandController::class, 'index'])->name('brands.index');
// Đẩy data lên table designers
Route::post('brands-store', [BrandController::class, 'store'])->name('brands.store');
// Update designers
Route::get('brands-edit/{id}', [BrandController::class, 'edit'])->name('brands.edit');
Route::patch('brands-update/{id}', [BrandController::class, 'update'])->name('brands.update');
// Xóa designers
Route::delete('brands-destroy/{id}', [BrandController::class, 'destroy'])->name('brands.destroy');


// =================== COMMENTS ===================
// List data comments
Route::get('comments', [CommentController::class, 'index'])->name('comments.index');
// Đẩy data lên table comment
Route::post('comments-store', [CommentController::class, 'store'])->name('comments.store');
// show comment theo id product
Route::get('comments-show/{product_id}', [CommentController::class, 'show'])->name('comments.show');
// Update comment
Route::get('comments-edit/{id}', [CommentController::class, 'edit'])->name('comments.edit');
Route::patch('comments-update/{id}', [CommentController::class, 'update'])->name('comments-update');
// Xóa comment
Route::delete('comments-destroy/{id}', [CommentController::class, 'destroy'])->name('comments-destroy');

// =================== MAIL ===================
Route::get('sendmail-contact', [ContactMailController::class, 'sendMailContact'])->name('mail.sendMailContact');
