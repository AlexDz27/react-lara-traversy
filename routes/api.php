<?php

use Illuminate\Support\Facades\Route;
use App\Models\Task;

Route::get('/tasks', function () {
  return Task::orderBy('created_at', 'DESC')->get();
});

Route::post('/tasks/create', function () {
  dd('create task');
});