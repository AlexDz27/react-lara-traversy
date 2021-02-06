import {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "../Header/Header";
import Tasks from "../Tasks/Tasks";
import AddTask from "../forms/AddTask/AddTask";
import Footer from "../Footer/Footer";
import About from "../About/About";

const App = () => {
  const tasksData = [
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 6th at 1:30pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Food Shopping',
      day: 'Feb 5th at 4:30pm',
      reminder: false,
    },
  ];

  const [showAddTask, setShowAddTask] = useState(true);
  const [tasks, setTasks] = useState(tasksData);

  // Restore default tasks
  const restoreTasks = () => {
    setTasks(tasksData);
  }

  // Add task
  const addTask = (task) => {
    let id;
    if (tasks.length > 0) {
      id = tasks[tasks.length - 1].id + 1;
    } else {
      id = 1;
    }
    const newTask = {id, ...task};

    setTasks([newTask, ...tasks]);
  }

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => {
      return task.id !== id;
    }));
  }

  // Toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => {
      return task.id === id ? {...task, reminder: !task.reminder} : task;
    }));
  }

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Header onAdd={() => setShowAddTask(!showAddTask)} isShowingForm={showAddTask} />
            {showAddTask && <AddTask onAdd={addTask} />}
            <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
            <Footer onRestore={restoreTasks} />
          </Route>

          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;