<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
  public function showAll()
  {
    return Task::orderBy('id', 'DESC')->get();
  }

  public function create(Request $request)
  {
    $task = new Task();
    $task->id = $request->id;
    $task->text = $request->text;
    $task->day = $request->day;
    $task->reminder = $request->reminder;

    return $task->save();
  }

  public function toggleReminder(Request $request, $id)
  {
    $task = Task::find($id);

    $task->reminder = $request->reminder;

    $task->save();
  }

  public function delete($id)
  {
    return Task::destroy($id);
  }

  public function restoreDefault()
  {
    Task::where('id', '>', 0)->delete();

    $tasks = [
      [
        'id' => 1,
        'text' => 'Doctors Appointment',
        'day' => 'Feb 5th at 2:30pm',
        'reminder' => true
      ],
      [
        'id' => 2,
        'text' => 'Meeting at School',
        'day' => 'Feb 6th at 1:30pm',
        'reminder' => true
      ],
      [
        'id' => 3,
        'text' => 'Food Shopping',
        'day' => 'Feb 5th at 4:30pm',
        'reminder' => false
      ]
    ];

    Task::insert($tasks);
  }
}
