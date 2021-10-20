<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Student;
use App\Models\Admin;
use App\Models\TopicTitle;
use App\Models\TopicSection;
use App\Models\Exercise;
use App\Models\Quiz;
use App\Models\Chat;

class AdminController extends Controller
{
    function getAdmin($adminID){
        return Admin::findOrFail($adminID);
    }
    
    function getAllStudents(){
        return Student::all();
    }

    function deleteChat($chatID){
        $chat = Chat::findOrFail($chatID);
        $chat->delete();
        return 204;
    }

    function registerAStudent(Request $request){

        $randomPassword = Str::random(8);
        $student = new Student;
        $student->studentID = $request->studentID;
        $student->studentName = $request->studentName;
        $student->email = $request->email;
        $student->tempPassword = $randomPassword;
        $student->password = Hash::make($randomPassword);
        $student->isOnboard = false;

        $student->save();

        return $student;
    }

    function deleteStudent($studentID){
        $student = Student::findOrFail($studentID);
        $student->delete();
        return 204;
    }

    function addNewTopic(Request $request){
        $topic = new TopicTitle;
        $topic->topicName = $request->topicName;
        $topic->save();
        return $topic;
    }

    function editTopicName(Request $request, $topicID){
        $topic = TopicTitle::findOrFail($topicID);
        $topic->topicName = $request->topicName;
        $topic->save();
        return $topic;
    }

    function deleteATopic($topicID){
        $topic = TopicTitle::findOrFail($topicID);
        $topic->delete();
        return 204;
    }

    function addTopicSection(Request $request){
        return TopicSection::create($request->all());
    }

    function editTopicSection(Request $request, $sectionID){
        $section = TopicSection::findOrFail($sectionID);
        $section->update($request->all());
        return $section;
    }

    function deleteTopicSection($sectionID){
        $section = TopicSection::findOrFail($sectionID);
        $section->delete();
        return 204;
    }

    function addExercise(Request $request){
        return Exercise::create($request->all());
    }

    function editExercise(Request $request, $exerciseID){
        $exercise = Exercise::findOrFail($exerciseID);
        $exercise->update($request->all());
        return $exercise;
    }

    function deleteExercise($exerciseID){
        $exercise = Exercise::findOrFail($exerciseID);
        $exercise->delete();
        return 204;
    }

    function addQuiz(Request $request){
        return Quiz::create($request->all());
    }

    function editQuiz(Request $request, $quizID){
        $quiz = Quiz::findOrFail($quizID);
        $quiz->update($request->all());
        return $quiz;
    }

    function deleteQuiz($quizID){
        $quiz = Quiz::findOrFail($quizID);
        $quiz->delete();
        return 204;
    }
}
