<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors'=> $validator->messages(),
            ], 422);
        }

        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json([
                'status' => 401,
                'errors' => 'Account is not registered or the password is incorrect.'
            ], 401);
        } 

        return $this->createNewToken($token);
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|between:2,50',
            'email' => 'required|string|email|max:100|unique:users,email',
            'phone' => 'nullable|numeric|digits:10',
            'password' => 'required|string|confirmed|min:8',
            'gender' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors'=> $validator->messages()
            ], 422);
        }

        $user = User::create(array_merge(
                    $validator->validated(),
                    // ['phone' => $request->phone],
                    ['password' => bcrypt($request->password)]
                ));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 200);
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function userProfile() {
        try {
            $user = auth()->userOrFail(); // Nếu không tìm thấy người dùng báo lỗi
    
            return response()->json([
                'status' => 200,
                'user' => $user
            ], 200);
    
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json([
                'status' => 401,
                'errors' => 'Unauthorized. User not authenticated.'
            ], 401);
    
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'errors' => 'Internal Server Error.'
            ], 500);
        }
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

    // public function showEditProfile(string $email)
    // {
    //     try {
    //         // Xác thực người dùng từ token
    //         $tokenUser = auth()->user();
            
    //         // So sánh email từ token với email mà bạn truyền vào
    //         if ($tokenUser->email !== $email) {
    //             return response()->json([
    //                 'message' => 'Unauthorized'
    //             ], 401);
    //         }

    //         $user = User::where('email', $email)->first();

    //         if (!$user) {
    //             return response()->json([
    //                 'message' => 'User not found'
    //             ], 404);
    //         }

    //         return response()->json([
    //             'status' => 200,
    //             'user' => $user
    //         ], 200);

    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'status' => 500, 
    //             'errors' => 'Internal Server Error'
    //         ], 500);
    //     }
    // }

    

    public function updateProfile(Request $request) {
        // Lấy ID của người dùng hiện tại
        $userId = auth()->user()->id;
        // $userId = user()->id;
    
        // Kiểm tra dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:50',
            'email' => 'required|string|email|max:100|unique:users,email,' . $userId,
            'gender' => 'nullable',
            'level' => 'required',
            'phone' => 'nullable|numeric|digits:10',
            'address' => 'nullable|max:250'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ], 400);
        }
    
        // Kiểm tra và cập nhật mật khẩu nếu có
        if (!empty($request->password)) {
            $passwordValidator = Validator::make($request->all(), [
                'password' => 'required|confirmed|min:8',
            ]);
    
            if ($passwordValidator->fails()) {
                return response()->json([
                    'status' => 400,
                    'errors' => $passwordValidator->messages()
                ], 400);
            }
    
            // Cập nhật mật khẩu mới
            User::where('id', $userId)->update(['password' => bcrypt($request->password)]);
        }
    
        // Cập nhật thông tin người dùng
        $updateData = [
            'fullname' => $request->fullname,
            'email' => $request->email,
            'gender' => $request->gender,
            'level' => $request->level,
            'phone' => $request->phone,
            'address' => $request->address
        ];
    
        User::where('id', $userId)->update($updateData);
    
        return response()->json([
            'status' => 200,
            'message' => 'Profile updated successfully'
        ], 200);
    }
    
    
}

