<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopicSection extends Model
{
    use HasFactory;

    public $table = 'topicsections';
    protected $primaryKey = 'sectionID';
    public $timestamps = false;

    protected $fillable = ['sectionName', 'sectionText1', 'sectionCode1', 'sectionText2', 'sectionCode2', 'sectionText3', 'sectionCode3', 'sectionText4', 'sectionCode4', 'topicID'];

    public function TopicTitle(){
        return $this->belongsTo(TopicTitle::class, 'topicID');
    }
}
