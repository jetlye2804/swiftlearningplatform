<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizHistory extends Model
{
    use HasFactory;

    public $table = 'quizhistories';
    protected $primaryKey = 'quizHistoryID';
    public $timestamps = false;

    protected $fillable = ['totalQues', 'numCorrect', 'steps', 'timeTaken', 'topicID', 'studentID'];

    public function Student(){
        return $this->belongsTo(Student::class, 'studentID');
    }

    public function TopicTitle(){
        return $this->belongsTo(TopicTitle::class, 'topicID');
    }
}
