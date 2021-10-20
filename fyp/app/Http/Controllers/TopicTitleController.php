<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TopicTitle;

class TopicTitleController extends Controller
{
    function listTitle(){
        return TopicTitle::all();
    }

    function viewTopic($topicID){
        $topic = TopicTitle::find($topicID);
        return $topic;
    }

}
