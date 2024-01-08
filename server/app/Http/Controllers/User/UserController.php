<?php

namespace App\Http\Controllers\User;

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
        $users = User::orderBy('created_at', 'DESC')->where('status','!=', 'Hidden')->get();;
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
     * Show User Delete For Master.
     */
    public function showUserDelete()
    {
        $users = User::orderBy('created_at', 'DESC')->where('status','!=', 'Show')->get();;
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
            'email' => [
                'required',
                'string',
                'email',
                'max:50',
                'unique:users,email',
                'regex:/^[a-zA-Z0-9._%+-]+@gmail\.com$/i',
            ],
            'password' => 'required|min:8|confirmed',
            'level' => 'required',
            'gender' => 'nullable',
            // 'status' => 'required',
            'phone' => 'nullable|numeric|digits:10',
            'address' => 'nullable|max:250',
            'avatar' => 'nullable|mimes:jpeg,jpg,png'
        ]);

        $customMessages = [
            'email.regex' => ' We only accept emails ending with @gmail.com!'
        ];
        
        $validate->setCustomMessages($customMessages);

        if($validate->fails()) {
            return response()->json([
                'error'=> $validate->messages()
            ], 400);
        } else {
            $user = User::create([
                'fullname' => $request['fullname'],
                'email' => strtolower($request['email']),
                'password' => bcrypt($request['password']),
                'level' => $request['level'],
                // 'status' => $request['status'],
                'gender' => $request['gender'],
                'phone' => $request['phone'],
                'address' => $request['address'],
            ]);

            if ($request->hasFile('avatar')) {
                $avatar = $request->file('avatar');
                $avatarName = time(). '-' . $avatar->getClientOriginalName();
                $avatar->move(public_path('uploads/avatars/'), $avatarName);


                $user->avatar = $avatarName;
                $user->save();
            }

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
        $user = User::findOrFail($id);

        if ($user) {
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

        // $avatar = $request->avatar;

        // if (!empty($avatar)) {
        //     $request->validate([
        //         'image' => 'required|mimes:jpg,bmp,png,jpeg'
        //     ]);

        //     $avatar_old_path = public_path('uploads/'. $user->avatar);
        //     if (file_exists($avatar_old_path)) {
        //         unlink($avatar_old_path);
        //     }

        //     $avatarName = time(). '-' . $avatar->getClientOriginalName();
        //     $user->avatar = $avatarName;
        //     $avatar->move(public_path('uploads/'), $avatarName);
        // }

        // if($request->avatar != null){
        //     $this->uploadImageDetail($request->avatar, $user->id);
        // }

        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => "User Not Found"
            ], 404);
        }

        $validate = Validator::make($request->all(), [
            'fullname' => 'required|string|max:50',
            'email' => [
                'required',
                'string',
                'email',
                'max:50',
                'unique:users,email,' . $id,
                'regex:/^[a-zA-Z0-9._%+-]+@gmail\.com$/i',
            ],
            'gender' => 'nullable',
            'level' => 'required',
            'phone' => 'nullable|numeric|digits:10',
            'address' => 'nullable|max:250'
        ]);

        $customMessages = [
            'email.regex' => ' We only accept emails ending with @gmail.com!'
        ];

        $validate->setCustomMessages($customMessages);

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
            $user->phone = $request['phone'];
            $user->gender = $request['gender'];
            $user->level = $request['level'];
            $user->address = $request['address'];

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
        {
            $user = User::findOrFail($id);
        
            if (!$user) {
                return response()->json([
                    'status' => 404,
                    'message' => "User Not Found"
                ], 404);
            }
        
            $user->status = 'Hidden';
        
            if ($user->save()) {
                return response()->json([
                    'status' => 200,
                    'message' => "User Deleted Successfully"
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => "Failed To Delete User "
                ], 500);
            }
        
            // if ($user->delete()) {
            //     return response()->json([
            //         'status' => 200,
            //         'message' => "User Deleted Successfully"
            //     ], 200);
            // } else {
            //     return response()->json([
            //         'status' => 500,
            //         'message' => "Failed to Delete User"
            //     ], 500);
            // }
        }
    }

    
    /**
     * Update Status User (Only the master has the right to update)
     */
    public function backToShowStatus(int $id)
    {
        {
            $user = User::findOrFail($id);
        
            if (!$user) {
                return response()->json([
                    'status' => 404,
                    'message' => "User Not Found"
                ], 404);
            }
        
            $user->status = 'Show';
        
            if ($user->save()) {
                return response()->json([
                    'status' => 200,
                    'message' => "User Deleted Successfully"
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => "Failed To Delete User "
                ], 500);
            }
        
            // if ($user->delete()) {
            //     return response()->json([
            //         'status' => 200,
            //         'message' => "User Deleted Successfully"
            //     ], 200);
            // } else {
            //     return response()->json([
            //         'status' => 500,
            //         'message' => "Failed to Delete User"
            //     ], 500);
            // }
        }
    }
}
