<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    public $table = 'chats';
    protected $primaryKey = 'chatID';
    public $timestamps = false;

    protected $fillable = ['chatText', 'chatDateTime', 'studentID', 'adminID'];

    public function Student(){
        return $this->belongsTo(Student::class, 'studentID');
    }

    public function Admin(){
        return $this->belongsTo(Admin::class, 'adminID');
    }
}
