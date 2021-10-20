<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\Student;
use App\Models\Admin;
use Cache;
use Carbon\Carbon;

class ChatController extends Controller
{

    function showAllChats(){
        return Chat::with('student','admin')->get();
    }

    function addChat(Request $request){
        $chat = new Chat;
        $chat->chatText = $request->chatText;
        $chat->chatDateTime = $request->chatDateTime;

        if($request->studentID != "" || $request->studentID != null){
            $chat->studentID = $request->studentID; 
        } else {
            $chat->adminID = $request->adminID;
        }
        
        $chat->save();
        return $chat;
    }

    function onlineStatus()
    {
        $students = Student::all();
        $admins = Admin::all();
        $onlineList = [];
        foreach ($students as $student) {
            if (Cache::has('student-is-online-' . $student->studentID)){
                array_push($onlineList, $student->studentName);
            } 
        }
        foreach ($admins as $admin) {
            if (Cache::has('admin-is-online-' . $admin->adminID)){
                array_push($onlineList, $admin->adminName . ' (Admin)');
            } 
        }
        return $onlineList;
    }
}
