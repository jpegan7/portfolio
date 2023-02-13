<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{

    //  Show Registration form
    public function create()
    {
        return view('srs_social.register');
    }

    //  Create new user
    public function store(Request $request)
    {

        $formFields = $request->validate([
            'name' => ['required', 'min:3'],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => ['required', 'confirmed', 'min:6']

        ]);

        // Hash passwords
        $formFields['password'] = bcrypt($formFields['password']);

        // Create user
        $user = User::create($formFields);

        // Login
       auth()->login($user);

        return redirect()->to('/srs-social');
    }

    //  Log out user
    public function logout(Request $request){
        auth()->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->to('/srs-social');
    }

    //  Show Login form
    public function login(){
        return view('srs_social.login');
    }

    //  Authenticate Login
    public function authenticate(Request $request){
        $formFields = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if(auth()->attempt($formFields)){
            $request->session()->regenerate();

            return redirect()->to('/srs-social');
        }

        return back() -> withErrors(['email' => 'Invalid credentials'])->onlyInput('email');
    }
}
