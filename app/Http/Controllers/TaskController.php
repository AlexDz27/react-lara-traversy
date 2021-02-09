<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Exception;

class TaskController extends Controller
{
  public function showAll()
  {
    $tasks = Task::orderBy('id', 'DESC')->get();
    $result = (bool) $tasks;

    return response()->json([
      'success' => $result,
      'tasks' => $tasks,
      'message' => $result ? 'Tasks fetched successfully' : 'Problem fetching tasks'
    ]);
  }

  public function create(Request $request)
  {
    $task = new Task();
    $task->id = $request->id;
    $task->text = $request->text;
    $task->day = $request->day;
    $task->reminder = $request->reminder;

    $result = $task->save();

    return response()->json([
      'success' => $result,
      'message' => $result ? 'Task saved successfully' : 'Problem saving task'
    ]);
  }

  public function toggleReminder(Request $request, $id)
  {
    $task = Task::find($id);

    $task->reminder = $request->reminder;

    $result = $task->save();

    return response()->json([
      'success' => $result,
      'message' => $result ? 'Reminder toggled successfully' : 'Problem toggling reminder'
    ]);
  }

  public function delete($id)
  {
    $result = (bool) Task::destroy($id);

    return response()->json([
      'success' => $result,
      'message' => $result ? 'Task deleted successfully' : 'Problem deleting task'
    ]);
  }

  public function restoreDefault()
  {
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

    $result = true;
    try {
      Task::where('id', '>', 0)->delete();
      Task::insert($tasks);
    } catch (Exception $exception) {
      $result = false;
    }


    return response()->json([
      'success' => $result,
      'message' => $result ? 'Default tasks restored successfully' : 'Problem restoring default tasks'
    ]);
  }
}
