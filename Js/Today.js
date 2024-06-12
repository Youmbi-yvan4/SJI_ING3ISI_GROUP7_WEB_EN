// Define the task classes
class Task {
  constructor(title, description, dueDate, dueTime) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.dueTime = dueTime;
    this.completed = false;
  }
}

class TaskList {
  constructor(id) {
    this.id = id;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    this.saveTasks();
    this.displayTasks();
  }

  editTask(index, newTask) {
    this.tasks[index] = newTask;
    this.saveTasks();
    this.displayTasks();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.saveTasks();
    this.displayTasks();
  }

  saveTasks() {
    localStorage.setItem(this.id, JSON.stringify(this.tasks));
  }

  loadTasks() {
    this.tasks = JSON.parse(localStorage.getItem(this.id)) || [];
    this.displayTasks();
  }

  displayTasks() {
    const tasksWrapper = document.querySelector(`#${this.id}-tasks-wrapper`);
    tasksWrapper.innerHTML = '';
    this.tasks.forEach((task, index) => {
      const taskElement = document.createElement('div');
      taskElement.innerHTML = `
        <div class="task">
          <input type="checkbox" id="task-${index}">
          <label for="task-${index}">${task.title}</label>
          <aside>
            <p>${task.description}</p>
            <p>Due on ${task.dueDate} at ${task.dueTime}</p>
          </aside>
          <button onclick="editTask('${this.id}', ${index})">Edit</button>
          <button onclick="deleteTask('${this.id}', ${index})">Delete</button>
        </div>
      `;
      tasksWrapper.appendChild(taskElement);
    });
  }}
  
// Initialize the task lists
const todayTasks = new TaskList('today');
const tomorrowTasks = new TaskList('tomorrow');
const weekTasks = new TaskList('week');

// Load tasks from local storage
todayTasks.loadTasks();
tomorrowTasks.loadTasks();
weekTasks.loadTasks();

// Add event listeners to the add task buttons
['today', 'tomorrow', 'week'].forEach(id => {
  document.querySelector(`#${id}-add-task-form .btn.add`).addEventListener('click', function() {
    const title = document.querySelector(`#${id}-title`).value;
    const description = document.querySelector(`#${id}-description`).value;
    let dueDate = document.querySelector(`#${id}-date`).value;
    const dueTime = document.querySelector(`#${id}-time`).value;

    // Validate the inputs
    if (!title || !description || !dueTime) {
      alert('Please fill in all fields.');
      return;
    }

    // Set the due date to today or tomorrow if necessary
    const currentDate = new Date();
    if (id === 'today') {
      dueDate = currentDate.toISOString().split('T')[0];
    } else if (id === 'tomorrow') {
      currentDate.setDate(currentDate.getDate() + 1);
      dueDate = currentDate.toISOString().split('T')[0];
    }

    const task = new Task(title, description, dueDate, dueTime);

    // Add the task to the appropriate list
    if (id === 'today') {
      todayTasks.addTask(task);
    } else if (id === 'tomorrow') {
      tomorrowTasks.addTask(task);
    } else {
      weekTasks.addTask(task);
    }

    // Clear the form
    document.querySelector(`#${id}-title`).value = '';
    document.querySelector(`#${id}-description`).value = '';
    document.querySelector(`#${id}-date`).value = '';
    document.querySelector(`#${id}-time`).value = '';
  });
});

function deleteTask(id, index) {
  if (id === 'today') {
    todayTasks.deleteTask(index);
  } else if (id === 'tomorrow') {
    tomorrowTasks.deleteTask(index);
  } else {
    weekTasks.deleteTask(index);
  }
}

function editTask(id, index) {
  const task = id === 'today' ? todayTasks.tasks[index] :
               id === 'tomorrow' ? tomorrowTasks.tasks[index] :
               weekTasks.tasks[index];

  document.querySelector(`#${id}-title`).value = task.title;
  document.querySelector(`#${id}-description`).value = task.description;
  document.querySelector(`#${id}-date`).value = task.dueDate;
  document.querySelector(`#${id}-time`).value = task.dueTime;

  // Remove the old task
  deleteTask(id, index);
}
// document.getElementById('toggle-button').addEventListener('click', function() {
//   var wrapper = document.querySelector('.add-wrapper');
//   if (wrapper.style.display === "none") {
//     wrapper.style.display = "block";
//   } else {
//     wrapper.style.display = "none";
//   }
// });

var buttons = document.querySelectorAll('.toggle-button');
buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    var wrapper = this.nextElementSibling;
    if (wrapper.style.display === "none") {
      wrapper.style.display = "block";
    } else {
      wrapper.style.display = "none";
    }
  });
});

// // Function to update the heading for an interface
// function updateHeading(tasks, headingId) {
//   let uncompleted = tasks.filter(task => !task.completed).length;
//   let total = tasks.length;
//   document.getElementById(headingId).textContent = `Today (${uncompleted}/${total})`;
// }

// // Call this function whenever a task is added or its status is changed
// updateHeading(todayTasks, 'today-heading');
// updateHeading(tomorrowTasks, 'tomorrow-heading');
// updateHeading(weekTasks, 'week-heading');


function countIncompleteTasks(taskList) {
  // Check if taskList is defined and has a tasks property
  if (!taskList || !Array.isArray(taskList.tasks)) {
    console.error('Invalid argument: taskList must be an object with a tasks array');
    return;
  }

  // Filter the tasks array to get only the tasks where completed is false
  let incompleteTasks = taskList.tasks.filter(task => !task.completed);

  // Return the number of incomplete tasks
  return incompleteTasks.length;
}

// Update headings
document.querySelector('.container:nth-child(1) .heading').textContent = `Today (${countIncompleteTasks(todayTasks)}/${todayTasks.tasks.length})`;
document.querySelector('.container:nth-child(2) .heading').textContent = `Tomorrow (${countIncompleteTasks(tomorrowTasks)}/${tomorrowTasks.tasks.length})`;
document.querySelector('.container:nth-child(3) .heading').textContent = `This Week (${countIncompleteTasks(weekTasks)}/${weekTasks.tasks.length})`;

// Assuming tasks is an array of Task objects
let tasks = [new Task("Task 1", "Description", "2024-06-13", "17:00"), new Task("Task 2", "Description", "2024-06-13", "18:00")];

function toggleTaskCompleted(index) {
  // Check if index is valid
  if (index < 0 || index >= tasks.length) {
    console.error('Invalid argument: index out of range');
    return;
  }

  // Toggle the completed property of the task
  tasks[index].completed = !tasks[index].completed;
}

// Add event listeners to checkboxes
for (let i = 0; i < tasks.length; i++) {
  document.getElementById(`task-${i}`).addEventListener('change', function() {
    toggleTaskCompleted(i);
  });
}
