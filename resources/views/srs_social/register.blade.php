@extends('srs_social/layout')
@section('content')

<h2>Register</h2>
    <form method="POST" action="/srs-social/register">
        @csrf
        <div class="form-group">
            <label for="name">Username:</label>
            <input type="text" class="form-control" id="name" name="name" value={{old('name')}}>

            @error('name')
            <p class="registration-error">{{$message}}</p>
            @enderror
        </div>

        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" name="email" value={{old('email')}}>

            @error('email')
            <p class="registration-error">{{$message}}</p>
            @enderror
        </div>

        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password" name="password" value={{old('password')}}>

            @error('password')
            <p class="registration-error">{{$message}}</p>
            @enderror
        </div>

        <div class="form-group">
            <label for="password_confirmation">Re-enter Password:</label>
            <input type="password" class="form-control" id="password_confirmation" name="password_confirmation" value={{old('password_confirmation')}}>

            @error('password_confirmation')
            <p class="registration-error">{{$message}}</p>
            @enderror
        </div>

        <div class="form-group">
            <button style="cursor:pointer" type="submit" class="btn btn-primary">Submit</button>
        </div>
        
    </form>

    <p>
        Already have an account?
        <a href="/srs-social/login">Login</a>
    </p>
@endsection