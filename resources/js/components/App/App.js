import {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "../Header/Header";
import Tasks from "../Tasks/Tasks";
import AddTask from "../forms/AddTask/AddTask";
import Footer from "../Footer/Footer";
import About from "../About/About";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [areTasksLoaded, setAreTasksLoaded] = useState(false);

  const apiUrl = window.location.origin + '/api';
  const tasksUrl = apiUrl + '/tasks';

  if (areTasksLoaded === false) {
    let ts = [];
    fetch(tasksUrl)
      .then(response => response.json())
      .then(data => ts = data)
      .then(ts => setTasks(ts))
      .then(() => setAreTasksLoaded(true))
    ;
  }

  // Restore default tasks
  const restoreTasks = () => {
    const tasksData = [
      {
        id: 3,
        text: 'Food Shopping',
        day: 'Feb 5th at 4:30pm',
        reminder: false,
      },
      {
        id: 2,
        text: 'Meeting at School',
        day: 'Feb 6th at 1:30pm',
        reminder: true,
      },
      {
        id: 1,
        text: 'Doctors Appointment',
        day: 'Feb 5th at 2:30pm',
        reminder: true,
      },
    ];

    setTasks(tasksData);

    fetch(tasksUrl + '/restore-default', {
      method: 'POST'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
      .catch(() => {
        alert(
          `Sorry, there has been a problem while connecting to our server or you have lost connection. Try again later.`
        )
      })
    ;
  }

  // Add task
  const addTask = (task) => {
    let id;
    console.log(tasks);
    if (tasks.length > 0) {
      id = tasks[0].id + 1;
    } else {
      id = 1;
    }

    const newTask = {id, ...task};

    setTasks([newTask, ...tasks]);

    fetch(tasksUrl + '/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
      .catch(() => {
        alert(
          `Sorry, there has been a problem while connecting to our server or you have lost connection. Try again later.`
        )
      })
    ;
  }

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => {
      return task.id !== id;
    }));

    fetch(tasksUrl + '/delete/' + id, {
      method: 'DELETE'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
      .catch(() => {
        alert(
          `Sorry, there has been a problem while connecting to our server or you have lost connection. Try again later.`
        );
      })
    ;
  }

  // Toggle reminder
  const toggleReminder = (id) => {
    const tasksCopy = tasks.map(task => ({...task}));

    const index = tasksCopy.findIndex(task => task.id === id);
    tasksCopy[index].reminder = !tasksCopy[index].reminder;
    const reminder = tasksCopy[index].reminder;

    setTasks(tasksCopy);

    fetch(tasksUrl + '/toggle-reminder/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({reminder})
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
      .catch(() => {
        alert(
          `Sorry, there has been a problem while connecting to our server or you have lost connection. Try again later.`
        );
      })
    ;
  }

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Header onAdd={() => setShowAddTask(!showAddTask)} isShowingForm={showAddTask} />
            {showAddTask && <AddTask onAdd={addTask} />}
            <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} loaded={areTasksLoaded} />
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