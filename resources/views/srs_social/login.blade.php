@extends('srs_social/layout')
@section('content')

<div class="container">
    <form method="POST" action=/srs-social/login>
        @csrf
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
        </div>

        <div class="form-group">
            <button style="cursor:pointer" type="submit" class="btn btn-primary">Sign In</button>
        </div>
    </form>
</div>

<div class="container">
    <p>Don't have an account?<a href="/srs-social/register">Sign Up</a></p>
</div>

@endsection