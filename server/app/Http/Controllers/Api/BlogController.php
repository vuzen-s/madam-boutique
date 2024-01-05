<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Blogs\StoreRequest;
use App\Http\Requests\Admin\Blogs\UpdateRequest;
use App\Models\BlogModel;
use App\Models\CollectionModel;
use App\Models\ProductModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = BlogModel::with(['topic'])->get();
        return response()->json([
            'blogs' => $blogs,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'avatar_blog' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'status' => 'required|in:0,1',
            'topic_id' => 'required',
             'user_id' => 'required',
        ]);

        // Xử lý lưu dữ liệu vào database
        $blog = new BlogModel;
        $blog->title = $request->title;
        $blog->content = $request->content;
        $blog->status = $request->status;
        $blog->topic_id = $request->topic_id;
        $blog->user_id = $request->user_id;

        // Xử lý ảnh đại diện (nếu có)
        if ($request->hasFile('avatar_blog')) {
            $avatarPath = $request->file('avatar_blog')->store('avatars');
            $blog->avatar_blog = $avatarPath;
        }

        $blog->save();

        return response()->json(['message' => 'Bài viết đã được tạo thành công'], 200);
    }
    
    public function create()
    {
         $users = DB::table('users')->get();
        $topics = DB::table('topics')->get();
       

        return response()->json([
             'users' => $users,
            'topics' => $topics,
           
        ]);
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $blog = BlogModel::with(['topic'])
            ->where('id', $id)
            ->first();

        return response()->json([
            'blog' => $blog,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, $id)
    {
        $dataCurrent = DB::table('blogs')->where('id', $id)->first();
        $dataNew = $request->except(['avatar_blog', 'images_old']);

        // nếu người dùng có thay đổi avatar
        if (isset($request->avatar_blog)) {
            // xóa avatar hiện tại lưu trong thư mục public
            $avatarCurrent = $dataCurrent->avatar_blog;
            $imgPath = public_path('uploads/blogs/' . $avatarCurrent);
            if (file_exists($imgPath)) {
                unlink($imgPath);
            }
            // thay thế nó bằng file avatar mới được cập nhật
            $avatar_blog = $request->avatar_blog;
            $dataNew['avatar_blog'] = time() . '_' . $avatar_blog->getClientOriginalName();
            $avatar_blog->move(public_path('uploads/blogs/'), $dataNew['avatar_blog']);
        }

        DB::table('blogs')->where('id', $id)->update($dataNew);
        return response()->json(['message_success' => 'Data updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = DB::table('blogs')->where('id', $id)->first();
        $avatar_blog = $data->avatar_blog;
        $imgPath = public_path('uploads/blogs/' . $avatar_blog);

        DB::table('blogs')->where('id', $id)->delete();

        // xóa ảnh trong thư mục public
        if (file_exists($imgPath)) {
            unlink($imgPath);
        }

        return response()->json([
            'blog' => $data,
        ]);
    }
}
