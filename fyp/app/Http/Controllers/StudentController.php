<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;

class StudentController extends Controller
{
    function updatePassword(Request $request, $studentID){
        $student = Student::findOrFail($studentID);

        $student->tempPassword = null;
        $student->password = Hash::make($request->password);
        $student->isOnboard = true;
        $student->save();
        return $student;
    }

    function getStudent($studentID){
        return Student::findOrFail($studentID);
    }
}
