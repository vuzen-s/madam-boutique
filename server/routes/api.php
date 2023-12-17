<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\Api\CategoryController;

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

Route::get('categories', [CategoryController::class, 'index'])->name('categories.index');

Route::post('/categories/create', [CategoryController::class, 'create']);
Route::put('/categories/store', [CategoryController::class, 'store']);
