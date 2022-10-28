<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                // Password::min(8)->mixedCase()->numbers()->symbols()
                ]
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email|string',
            'password' => ['required'],
            'remember' => 'boolean'
        ]);


        $remember = $credentials['remember'] ?? false;

        unset($credentials['remember']); // destroying variable

        if(Auth::attempt($credentials, $remember)){

            $user = Auth::user();
            $token = $user->createToken('main')->plainTextToken;

            return response([
                'user' => $user,
                'token' => $token
            ]);
        }

        return response([
            'error' => 'Invaid credentials',
        ], 422);
    }

    public function logout()
    {
        $user = Auth::user();
        // To revoke the token that was used for authenticate the current request
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }
}
