<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopicTitle extends Model
{
    use HasFactory;

    public $table = 'topictitles';
    protected $primaryKey = 'topicID';
    public $timestamps = false;

    protected $fillable = ['topicName'];

    public function TopicSection(){
        return $this->hasMany(TopicSection::class, 'topicID');
    }

    public function Exercise(){
        return $this->hasMany(Exercise::class, 'topicID');
    }

    public function Quiz(){
        return $this->hasMany(Quiz::class, 'topicID');
    }

    public function QuizHistory(){
        return $this->hasMany(QuizHistory::class, 'topicID');
    }
}
