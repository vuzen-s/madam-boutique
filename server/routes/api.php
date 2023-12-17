<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\User\UserController;

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

// Lấy danh sách user
Route::get('users', [UserController::class, 'index']);
// Tạo user
Route::post('user/create', [UserController::class, 'store']);
// Show thông tin user edit
Route::get('user/edit/{id}', [UserController::class, 'edit']);
// Update thông tin user edit
Route::put('user/edit/{id}', [UserController::class, 'update']);
