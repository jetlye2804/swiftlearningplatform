<?php
namespace App\Http\Middleware;

use App\Models\Student;
use App\Models\Admin;
use Closure;
use Auth;
use Cache;
use Carbon\Carbon;

class UserActivity
{
    public function handle($request, Closure $next)
    {
        if(Auth::check()){
            if (Auth::guard('web')->check()) {
            Cache::put('student-is-online-' . Auth::user()->studentID, true);
            // last seen
            Student::where('studentID', Auth::user()->studentID)->update(['last_seen' => (new \DateTime())->format("Y-m-d H:i:s")]);
            } else{
                Cache::put('admin-is-online-' . Auth::guard('admin')->user()->adminID, true);
                // last seen
                Admin::where('adminID', Auth::user()->adminID)->update(['last_seen' => (new \DateTime())->format("Y-m-d H:i:s")]);
            }
        }
        
        return $next($request);
    }
}