<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TopicTitle;

class ExerciseController extends Controller
{
    function showRelatedExercise($topicID){
        return TopicTitle::find($topicID)->Exercise;
    }
}
