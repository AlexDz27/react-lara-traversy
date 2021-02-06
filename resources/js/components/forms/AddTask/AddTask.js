import {useState} from 'react';

const AddTask = ({onAdd}) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert('Please, add a task.');
      return;
    }

    onAdd({text, day, reminder});

    setText('');
    setDay('');
    setReminder(false);
  }

  return (
    <form className="add-form" onSubmit={(e) => onSubmit(e)}>
      <div className="form-control">
        <label htmlFor="task-text">Task</label>
        <input
          id="task-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Do some great things"
        />
      </div>
      <div className="form-control">
        <label htmlFor="date-time">Day & Time</label>
        <input
          id="date-time"
          placeholder="Feb 8th at 2:30pm"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label htmlFor="set-reminder">Set reminder</label>
        <input
          checked={reminder}
          id="set-reminder"
          type="checkbox"
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <button type="submit" className="btn btn-block">Add task</button>
    </form>
  );
}

export default AddTask;