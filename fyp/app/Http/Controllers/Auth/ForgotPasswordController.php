<?php 
  
namespace App\Http\Controllers\Auth; 
  
use App\Http\Controllers\Controller;
use Illuminate\Http\Request; 
use DB; 
use Carbon\Carbon; 
use App\Models\Student; 
use Mail; 
use Hash;
use Illuminate\Support\Str;
  
class ForgotPasswordController extends Controller
{

  public function showResetPasswordForm() {
    return view('auth.passwords.forgetPasswordLink');
  }

  public function submitResetPasswordForm(Request $request)
  {
    $request->validate([
        'email' => 'required|email|exists:students',
        'password' => [
          'required', 
          'string',
          'min:8',
          'confirmed',
          'regex:/[0-9]/',
          'regex:/[a-zA-Z]/',
        ],
        'password_confirmation' => 'required'
    ], [
      'email.exists' => 'This email is not exist from the system.',
      'password.regex' => 'Invalid format. The password should have a minimum of 8 characters with combinations of letters and numeric characters.'
    ]);

    //$user = Student::where('email', $request->email)->update(['password' => Hash::make($request->password)]);
    $student = Student::where('email', $request->email)->first();

    if($student->isOnboard == false){
      return back()->with('message', 'New students are not allowed to reset their password before proceeding onboarding.');
    } else {
      $student->update(['password' => Hash::make($request->password)]);
      return redirect('/login')->with('message', 'Your password has been reset successfully!');
    }
  }
}
