import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "../Header/Header";
import Tasks from "../Tasks/Tasks";
import AddTask from "../forms/AddTask/AddTask";
import Footer from "../Footer/Footer";
import About from "../About/About";
import TaskManager from "../../modules/TaskManager";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await taskManager.get();

      setLoaded(true);
      setTasks(tasks);
    }

    fetchTasks();
  }, []);

  const apiUrl = window.location.origin + '/api';
  const tasksUrl = apiUrl + '/tasks';
  const taskManager = new TaskManager(tasksUrl);

  // Restore default tasks
  const restoreDefaultTasks = async () => {
    setTasks(taskManager.defaultTasks);

    await taskManager.restoreDefault();
  }

  // Add task
  const addTask = async (task) => {
    let id;
    if (tasks.length > 0) {
      id = tasks[0].id + 1;
    } else {
      id = 1;
    }

    const newTask = {id, ...task};

    setTasks([newTask, ...tasks]);

    await taskManager.addTask(newTask);
  }

  // Delete task
  const deleteTask = async (id) => {
    setTasks(tasks.filter((task) => {
      return task.id !== id;
    }));

    await taskManager.delete(id);
  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    const tasksCopy = tasks.map(task => ({...task}));

    const index = tasksCopy.findIndex(task => task.id === id);
    tasksCopy[index].reminder = !tasksCopy[index].reminder;
    const reminder = tasksCopy[index].reminder;

    setTasks(tasksCopy);

    await taskManager.toggleReminder(id, reminder);
  }

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Header onAdd={() => setShowAddTask(!showAddTask)} isShowingForm={showAddTask} />
            {showAddTask && <AddTask onAdd={addTask} />}
            <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} loaded={loaded} />
            <Footer onRestore={restoreDefaultTasks} />
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