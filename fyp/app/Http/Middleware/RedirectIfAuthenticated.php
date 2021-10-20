<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{

    public function handle($request, Closure $next, $guard = null)
    {
        if ($guard == "admin" && Auth::guard($guard)->check()) {
            return redirect('/admin/home');
        }
        if (Auth::guard($guard)->check()) {
            if(Auth::guard($guard)->user()->isOnboard){
                return redirect('/home');
            } else {
                return redirect('/onboard');
            }
        }
        return $next($request);
    }
}
