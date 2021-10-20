<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TopicSection;
use App\Models\TopicTitle;

class TopicSectionController extends Controller
{
    function showRelatedSection($topicID){
        return TopicTitle::find($topicID)->TopicSection;
    }
}
