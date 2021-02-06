import Task from "./Task/Task";

const Tasks = ({tasks, onDelete, onToggle}) => {
  const havingTasks = tasks.length > 0;

  let template;

  if (havingTasks) {
    template = (
      <div>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
        ))}
      </div>
    );
  } else {
    template = (
      <div>
        Sorry, no tasks to show.
      </div>
    );
  }

  return template;
};

export default Tasks;