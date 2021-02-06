import {FaTimes} from "react-icons/fa";
import {GoBell} from "react-icons/all";

const Task = ({task, onDelete, onToggle}) => {
  const isReminderOn = task.reminder;

  return (
    <div className={`task ${isReminderOn ? 'task--reminder-on' : ''}`}>
      <h3>
        <GoBell onClick={() => onToggle(task.id)} />
        {task.text}
        <FaTimes onClick={() => onDelete(task.id)} style={{color: 'red'}} /></h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;