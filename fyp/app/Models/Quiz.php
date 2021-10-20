<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    public $table = 'quizzes';
    protected $primaryKey = 'quizID';
    public $timestamps = false;

    protected $fillable = ['quizText', 'option1', 'option2', 'option3', 'option4', 'correctAns', 'topicID'];

    public function TopicTitle(){
        return $this->belongsTo(TopicTitle::class, 'topicID');
    }
}
