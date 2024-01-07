<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPassword;

class ForgotResetPassword extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'status' => 403,
                'errors' => 'Email does not exist on the system!'
            ], 403);
        }


        $token = Password::getRepository()->create($user);

        Mail::to($user->email)->send(new ResetPassword($token));

        $response = Password::sendResetLink($request->only('email'));

        return $response === Password::RESET_LINK_SENT
                ? response()->json([
                    'status' => 200,
                    'message' => trans($response)
                ], 200)
                : response()->json([
                    'status' => 403,
                    'errors' => ['email' => trans($response)]
                ], 403);

}

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found!'
            ], 404);
        }

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => bcrypt($password)
                ])->save();
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return response()->json([
                'status' => 200,
                'message' => 'Password reset successfully!'
            ], 200);
        } else {
            return response()->json([
                'status' => 200,
                'errors' => 'Failed to reset password or invalid token!'
            ], 400);
        }
    }
}
