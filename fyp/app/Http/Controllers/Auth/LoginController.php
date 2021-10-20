<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    protected function redirectTo(){
        if (auth()->user()->isOnboard == false){
            return '/onboard';
        }
        return '/home';
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
        $this->middleware('guest:admin')->except('logout');
    }

    public function showAdminLoginForm()
    {
        return view('auth.login', ['url' => 'admin']);
    }

    public function adminLogin(Request $request)
    {
        $this->validate($request, [
        'adminID' => 'required',
        'password' => [
            'required',
            'string',
            'min:8',
            'regex:/[0-9]/',
            'regex:/[a-zA-Z]/',
          ],
        ]);

        if (Auth::guard('admin')->attempt(['adminID' => $request->adminID, 'password' => $request->password])) {
            return redirect()->intended('/admin/home');
        }

        throw ValidationException::withMessages([
            'adminID' => [trans('auth.failed')],
        ]);

        return back()->withInput($request->only('adminID'));
    }
}
