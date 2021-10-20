<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TopicTitleController;
use App\Http\Controllers\TopicSectionController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuizHistoryController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ChatController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('topic', [TopicTitleController::class, 'listTitle']);
Route::get('topic/{id}', [TopicTitleController::class, 'viewTopic']);
Route::get('relatedTopic/{id}', [TopicSectionController::class, 'showRelatedSection']);
Route::get('relatedExercise/{id}', [ExerciseController::class, 'showRelatedExercise']);
Route::get('relatedQuiz/{id}', [QuizController::class, 'showRelatedQuiz']);
Route::get('student/{id}', [StudentController::class, 'getStudent']);
Route::put('student/updatepassword/{id}', [StudentController::class, 'updatePassword']);
Route::get('quizhistory/{id}', [QuizHistoryController::class, 'getRelatedStudentQuizHistory']);
Route::post('quizhistory', [QuizHistoryController::class, 'addQuizHistory']);
Route::get('chats', [ChatController::class, 'showAllChats']);
Route::get('online', [ChatController::class, 'onlineStatus']);
Route::post('chat', [ChatController::class, 'addChat']);

Route::get('admin/{id}', [AdminController::class, 'getAdmin']);
Route::get('students', [AdminController::class, 'getAllStudents']);
Route::post('addStudent', [AdminController::class, 'registerAStudent']);
Route::delete('student/{id}', [AdminController::class, 'deleteStudent']);
Route::post('addTopic', [AdminController::class, 'addNewTopic']);
Route::put('topic/{id}', [AdminController::class, 'editTopicName']);
Route::delete('topic/{id}', [AdminController::class, 'deleteATopic']);
Route::post('addSection', [AdminController::class, 'addTopicSection']);
Route::put('section/{id}', [AdminController::class, 'editTopicSection']);
Route::delete('section/{id}', [AdminController::class, 'deleteTopicSection']);
Route::post('addExercise', [AdminController::class, 'addExercise']);
Route::put('exercise/{id}', [AdminController::class, 'editExercise']);
Route::delete('exercise/{id}', [AdminController::class, 'deleteExercise']);
Route::post('addQuiz', [AdminController::class, 'addQuiz']);
Route::put('quiz/{id}', [AdminController::class, 'editQuiz']);
Route::delete('quiz/{id}', [AdminController::class, 'deleteQuiz']);
Route::delete('chat/{id}', [AdminController::class, 'deleteChat']);