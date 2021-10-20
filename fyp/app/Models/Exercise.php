<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    public $table = 'exercises';
    protected $primaryKey = 'exerciseID';
    public $timestamps = false;

    protected $fillable = ['exerciseText', 'blank1', 'blank2', 'blank3', 'topicID'];

    public function TopicTitle(){
        return $this->belongsTo(TopicTitle::class, 'topicID');
    }
}
