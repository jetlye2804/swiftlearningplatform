<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TopicTitle;

class QuizController extends Controller
{
    function showRelatedQuiz($topicID){
        return TopicTitle::find($topicID)->Quiz;
    }
}
