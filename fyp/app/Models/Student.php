<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Student extends Authenticatable
{
    use HasFactory, Notifiable;

    public $table = 'students';
    public $timestamps = false;
    protected $primaryKey = 'studentID';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'studentName',
        'email',
        'tempPassword',
        'password',
        'isOnboard',
        'last_seen'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'isOnboard',
        'password',
        'remember_token',
    ];

    public function QuizHistory(){
        return $this->hasMany(QuizHistory::class, 'studentID');
    }

    public function Chat(){
        return $this->hasMany(Chat::class, 'studentID');
    }
}
