<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        if($users->count() > 0){
            return response()->json([
                'status' => 200,
                'users' => $users
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No users found"
            ], 404);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'fullname' => 'required|string|max:50',
            'email' => 'required|string|email||max:50|unique:users,email',
            'password' => 'required|min:8|confirmed',
            'level' => 'required',
            'gender' => 'required',
        ]);

        if($validate->fails()) {
            return response()->json([
                'status' => 400,
                'error'=> $validate->messages()
            ], 400);
        } else {
            $user = User::create([
                'fullname' => $request['fullname'],
                'email' => strtolower($request['email']),
                'password' => bcrypt($request['password']),
                'level' => $request['level'],
                'gender' => $request['gender'],
            ]);

            if($user){
                return response()->json([
                    'status' => 200,
                    'messages' => 'User Created Successfully'
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'messages' => 'Failed to Create User'
                ], 500);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        // Viết view lịch sử thanh toán
        // HasMany table payment
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $user = User::findOrFail($id);
        if($user) {
            return response()->json([
                'status' => 200,
                'user' => $user
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "User Not Found"
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $user = User::findOrFail($id);

        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => "User Not Found"
            ], 404);
        }

        $validate = Validator::make($request->all(), [
            'fullname' => 'string|max:50',
            'email' => 'string|email|max:50|unique:users,email,'.$id,
        ]);

        if(!empty($request->password)){
            $passwordValidator = Validator::make($request->all(), [
                'password'=>'required|confirmed|min:8',
            ]);
    
            if ($passwordValidator->fails()) {
                return response()->json([
                    'status' => 400,
                    'error'=> $passwordValidator->messages()
                ], 400);
            }

            $user->password = bcrypt($request['password']);
        }

        if ($validate->fails()) {
            return response()->json([
                'status' => 400,
                'error'=> $validate->messages()
            ], 400);
        } else {
            $user->fullname = $request['fullname'];
            $user->email = strtolower($request['email']);
            $user->level = $request['level'];
            $user->gender = $request['gender'];

            if ($user->save()) {
                return response()->json([
                    'status' => 200,
                    'message' => "User Updated Successfully"
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => "Failed to Update User"
                ], 500);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
    }
}