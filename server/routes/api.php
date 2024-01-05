<?php

use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CollectionController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\DesignerController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RatingController;
use App\Http\Controllers\Api\TopicController;
use App\Http\Controllers\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Mail\ContactMailController;
use App\Http\Controllers\Auth\AuthController;

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
// Lấy data từ bảng khác
Route::get('products-create', [ProductController::class, 'create'])->name('products.product-create');
// Lấy đường dẫn tới thư mục public/uploads/products/
Route::get('products-publicPath', [ProductController::class, 'getPublicPath'])->name('products.product-getPublicPath');
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
// Show all comments đang bị ẩn
Route::patch('ratings-update-hidden/{product_id}', [CommentController::class, 'quantityCommentHidden'])->name('ratings.quantityCommentHidden');
// Update comment
Route::get('comments-edit/{id}', [CommentController::class, 'edit'])->name('comments.edit');
Route::patch('comments-update/{id}', [CommentController::class, 'update'])->name('comments-update');
// Xóa comment
Route::delete('comments-destroy/{id}', [CommentController::class, 'destroy'])->name('comments-destroy');

// =================== RATINGS ===================
// List data comments
Route::get('ratings', [RatingController::class, 'index'])->name('ratings.index');
// Đẩy data lên table comment
Route::post('ratings-store', [RatingController::class, 'store'])->name('ratings.store');
// show comment theo id product
Route::get('ratings-show/{product_id}', [RatingController::class, 'show'])->name('ratings.show');
// show comment theo id product và tính số lượng
Route::get('ratings-quantity-{rating}/{product_id}', [RatingController::class, 'quantityRating'])->name('ratings.quantityRating');
// Update comment
Route::get('ratings-edit/{id}', [RatingController::class, 'edit'])->name('ratings.edit');
Route::patch('ratings-update/{id}', [RatingController::class, 'update'])->name('ratings-update');
// Xóa designers
Route::delete('ratings-destroy/{id}', [RatingController::class, 'destroy'])->name('ratings.destroy');

// =================== USER ===================
// Lấy danh sách user
Route::get('users', [UserController::class, 'index']);
// Lấy danh sách user đã delete cho Admin Master
Route::get('users/detail-delete', [UserController::class, 'showUserDelete']);
// Khôi phục lại user sau khi delete, chỉ Admin Master mới thao tác phần này
Route::put('users/show/{id}', [UserController::class, 'backToShowStatus']);
// Tạo user
Route::post('users/create', [UserController::class, 'store']);
// Lấy thong tin user
Route::get('users/{id}', [UserController::class, 'show']);
// Show thông tin user edit
Route::get('users/edit/{id}', [UserController::class, 'edit']);
// Update thông tin user
Route::put('users/edit/{id}', [UserController::class, 'update']);
// Xóa User
Route::delete('destroy/{id}', [UserController::class, 'destroy']);

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    // Route::get('/showEditProfile/{email}', [AuthController::class, 'showEditProfile']);
    Route::put('/update-profile', [AuthController::class, 'updateProfile']);
});

// =================== TOPICS ===================
Route::get('topics', [TopicController::class, 'index'])->name('topics.index');

// =================== BLOGS ===================
// List data 
Route::get('blogs', [BlogController::class, 'index'])->name('blogs.index');
// blog
Route::get('blogs-create', [BlogController::class, 'create'])->name('blogs-create');
// Đẩy data lên table 
Route::post('blogs-store', [BlogController::class, 'store'])->name('blogs-store');
// Update 
Route::get('blogs-edit/{id}', [BlogController::class, 'edit'])->name('blogs-edit');

Route::patch('blogs-update/{id}', [BlogController::class, 'update'])->name('blogs-update');
// Xóa
Route::delete('blogs-destroy/{id}', [BlogController::class, 'destroy'])->name('blogs-destroy');
// Lấy đường dẫn tới thư mục public/uploads/blogs/
Route::get('blogs-publicPath', [ProductController::class, 'getPublicPath'])->name('blogs-getPublicPath');

// =================== MAIL ===================
Route::get('sendmail-contact', [ContactMailController::class, 'sendMailContact'])->name('mail.sendMailContact');
// Xác thực lại reCapcha
Route::post('sendmail-contact', [ContactMailController::class, 'sendMailContact'])->name('mail.sendMailContact')->middleware('recaptcha');

// =================== ORDER ===================
Route::post('orders-store', [OrderController::class, 'store'])->name('orders-store');
