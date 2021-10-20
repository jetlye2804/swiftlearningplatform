<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use Illuminate\Support\Facades\Auth;


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
    return view('goodbyepage');
});

/*
Route::get('/', function () {
    if(Auth::guard('admin')->check()) {
        return Redirect::to('admin/home');
    }
    if (Auth::guard('web')->check()) {
        if(Auth::guard('web')->user()->isOnboard == false){
            return Redirect::to('onboard');
        } else {
            return Redirect::to('home');
        }
    }
    
    return view('welcome');
});

Auth::routes();

Route::view('construction', 'other/commingSoon');
Route::view('about', 'other/about');

Route::get('logout', [LoginController::class,'logout']);

// Admin login
Route::get('/login/admin', [LoginController::class, 'showAdminLoginForm'])->name('login.admin');
Route::post('/login/admin', [LoginController::class,'adminLogin']);
Route::get('reset', [ForgotPasswordController::class, 'showResetPasswordForm'])->name('reset.password.get');
Route::post('reset', [ForgotPasswordController::class, 'submitResetPasswordForm'])->name('reset.password.post');

Route::group(['middleware' => 'auth:web'], function () {
    //Onboarding for first time login
    Route::view('/onboard', 'firstTimeLogin')->middleware('can:isNewUser');

    //Home
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->middleware('can:isOldUser')->name('home');
    //Student profile
    Route::view('/profile/student', 'profile')->middleware('can:isOldUser');

    //Topic lessons, exercises and graded quizzes
    Route::view('/topic', 'topicList')->middleware('can:isOldUser');
    Route::view('/topic/{id}', 'topicContent')->middleware('can:isOldUser');
    Route::view('/exercise', 'exerciseList')->middleware('can:isOldUser');
    Route::view('/exercise/{id}', 'exerciseContent')->middleware('can:isOldUser');
    Route::view('/gradedquiz', 'quizList')->middleware('can:isOldUser');
    Route::view('/gradedquiz/{id}', 'quizContent')->middleware('can:isOldUser');

    //Chatbox
    Route::view('/chatbox', 'chatBox')->middleware('can:isOldUser');

    //Playground
    Route::view('/playground', 'playground')->middleware('can:isOldUser');
});

Route::group(['middleware' => 'auth:admin'], function () {
    Route::view('/admin/home', 'home');
    Route::view('/admin/registerStudent', 'registerStudent');
    Route::view('/admin/topic', 'topicList');
    Route::view('/admin/topic/{id}', 'topicContent');
    Route::view('/admin/exercise', 'exerciseList');
    Route::view('/admin/exercise/{id}', 'exerciseContent');
    Route::view('/admin/gradedquiz', 'quizList');
    Route::view('/admin/gradedquiz/{id}', 'adminQuizContent');
    Route::view('/admin/profile', 'profile');
    Route::view('/admin/profile/studentlist', 'studentList');
    Route::view('/admin/chatbox', 'chatBox');
});
*/
