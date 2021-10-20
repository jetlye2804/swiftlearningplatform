<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\TopicTitle;
use App\Models\QuizHistory;

class QuizHistoryController extends Controller
{
    function getRelatedStudentQuizHistory($studentID){
        return Student::find($studentID)->QuizHistory;
    }

    function addQuizHistory(Request $request){

        $request->validate([
            'totalQues' => 'required | numeric',
            'numCorrect' => 'required | numeric',
            'steps' => 'required | numeric',
            'timeTaken' => 'required | numeric',
            'topicID' => 'required | numeric',
            'studentID' => 'required | numeric',
        ]);

        $quizHistory = new QuizHistory;
        $quizHistory->totalQues = $request->totalQues;
        $quizHistory->numCorrect = $request->numCorrect;
        $quizHistory->steps = $request->steps;
        $quizHistory->timeTaken = $request->timeTaken;
        $quizHistory->topicID = $request->topicID;
        $quizHistory->studentID = $request->studentID;

        $quizHistory->save();
        return $quizHistory;
    }
}
