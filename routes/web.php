<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Route::get('/gridsearch', function () {
    return view('gridsearch');
});

Route::get('/japanese', function () {
    return view('japanese');
});

Route::get('/weather', function () {
    return view('weather');
});

Route::get('/srs-social', function () {
    return view('srs_social/srs_home');
});

Route::get('/srs-social/create-deck', function () {
    return view('srs_social/create_deck');
});

Route::get('/srs-social/login', function () {
    return view('srs_social/login');
});

// Register user
Route::get('/srs-social/register', [UserController::class, 'create']);
Route::post('/srs-social/register', [UserController::class, 'store']);

// Logout
Route::post('/srs-social/logout', [UserController::class, 'logout']);

// Login
Route::get('/srs-social/login', [UserController::class, 'login']);
Route::post('/srs-social/login', [UserController::class, 'authenticate']);