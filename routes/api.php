<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

// TODO: group

Route::get('/tasks', [TaskController::class, 'showAll']);

Route::post('/tasks/create', [TaskController::class, 'create']);

Route::delete('/tasks/delete/{id}', [TaskController::class, 'delete']);

Route::patch('/tasks/toggle-reminder/{id}', [TaskController::class, 'toggleReminder']);

Route::post('/tasks/restore-default', [TaskController::class, 'restoreDefault']);