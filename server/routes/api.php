<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\CollectionController;

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


// route Collection
Route::get('/collections', [CollectionController::class, 'index']);

Route::get('/collections/create', [CollectionController::class, 'create']);
Route::put('/collections/create', [CollectionController::class, 'store']);

Route::get('/collections/{id}/edit', [CollectionController::class, 'edit']);
Route::put('/collections/{id}/update', [CollectionController::class, 'update']);

Route::get('/destroy/{id}', [CollectionController::class, 'destroy']);