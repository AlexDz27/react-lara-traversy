class TaskManager {
  constructor(url) {
    this.url = url;

    this.defaultTasks = [
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
  }

  async makeRequest(url, options = null) {
    const response = await fetch(url, options);

    let result;

    if (!response.ok) {
      alert('Sorry, there has been a problem while connecting to our server. Try again later.');
    } else {
      result = await response.json();
      if (!result.success) {
        alert(result.message);
      }
    }

    return result;
  }

  async get() {
    const result = await this.makeRequest(this.url);

    return result.tasks;
  }

  async addTask(task) {
    await this.makeRequest(this.url + '/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
  }

  async toggleReminder(id, reminder) {
    await this.makeRequest(this.url + '/toggle-reminder/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({reminder})
    });
  }

  async delete(id) {
    await this.makeRequest(this.url + '/delete/' + id, {
      method: 'DELETE'
    });
  }

  async restoreDefault() {
    await this.makeRequest(this.url + '/restore-default/', {
      method: 'POST'
    });
  }
}

export default TaskManager;