<?php

use App\Http\Controllers\Api\NoteController;
use App\Http\Controllers\FormController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('/notes', [NoteController::class, 'index']);
Route::post('/notes', [NoteController::class, 'store']);
Route::get('/notes/{id}', [NoteController::class, 'show']);
Route::put('/notes/{id}', [NoteController::class, 'update']);
Route::delete('/notes/{id}', [NoteController::class, 'destroy']);


Route::get('/get-form-element', [FormController::class, 'getFormElements']);
Route::post('/save-form-element', [FormController::class, 'saveFormElement']);
Route::post('/save-element-value', [FormController::class, 'saveElementValue']);
Route::post('/update-element-positions', [FormController::class, 'updateElementPositions']);
Route::delete('/remove-form-element/{id}', [FormController::class, 'removeFormElement']);
