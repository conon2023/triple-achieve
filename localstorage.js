"use strict";
const allTasks = [];

// Create constructor function DailyTask
function DailyTask(title, description, category, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.category = category;
  this.dueDate = dueDate;
  this.priority = priority;

  this.pushTask();
  this.render();
}

DailyTask.prototype.pushTask = function() {
  allTasks.push(this);
};

DailyTask.prototype.render = function() {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <h2>${this.title}</h2>
      <p><strong>Description:</strong> ${this.description}</p>
      <p><strong>Category:</strong> ${this.category}</p>
      <p><strong>Due Date:</strong> ${this.dueDate}</p>
      <p><strong>Priority:</strong> ${this.priority}</p>
    `;
    taskList.appendChild(taskItem);
  };


  function renderDailyTask() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
  
    allTasks.forEach(function(task) {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = `
        <h2>${task.title}</h2>
        <p><strong>Description:</strong> ${task.description}</p>
        <p><strong>Category:</strong> ${task.category}</p>
        <p><strong>Due Date:</strong> ${task.dueDate}</p>
        <p><strong>Priority:</strong> ${task.priority}</p>
      `;
      taskList.appendChild(taskItem);
    });
  }

const newdailyTaskForm = document.getElementById("newdailyTaskForm");

// newdailyTaskForm.addEventListener("submit", function(event) {
//     event.preventDefault();
  
//     const form = event.target;
//     const title = form.elements.title.value;
//     const description = form.elements.description.value;
//     const category = form.elements.category.value;
//     const dueDate = form.elements.dueDate.value;
//     const priority = form.elements.priority.value;
  
//     new DailyTask(title, description, category, dueDate, priority);
  
//     form.reset();
//   });

// newdailyTaskForm.addEventListener("submit", function(event) {
//     event.preventDefault();
  
//     const title = document.querySelector('input[name="title"]').value;
//     const description = document.querySelector('input[name="description"]').value;
//     const category = document.querySelector('input[name="category"]').value;
//     const dueDate = document.querySelector('input[name="dueDate"]').value;
//     const priority = document.querySelector('select[name="priority"]').value;
  
//     new DailyTask(title, description, category, dueDate, priority);
  
//     newdailyTaskForm.reset();
//   });


newdailyTaskForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    const form = event.target;
    const title = form.querySelector('input[name="title"]').value;
    const description = form.querySelector('input[name="description"]').value;
    const category = form.querySelector('input[name="category"]').value;
    const dueDate = form.querySelector('input[name="dueDate"]').value;
    const priority = form.querySelector('select[name="priority"]').value;
  
    new DailyTask(title, description, category, dueDate, priority);
  
    form.reset();
  });

// Obtain items from the DOM
const inputs = document.getElementsByClassName("main-input");
const saveBtn = document.getElementById("save-task");

// Get all tasks from local storage
const taskArray = [];
const taskObject = {};

// Event listener for input change
for (const item of inputs) {
  item.addEventListener("change", function(e) {
    taskObject[e.target.id] = e.target.value;
  });
}

// Event listener for save button
saveBtn.onclick = function() {
  const newTask = new DailyTask(
    taskObject.tasktitle,
    taskObject.taskdescription,
    taskObject.taskdate,
    taskObject.taskcategory,
    taskObject.taskpriority
  );

  // Retrieve existing tasks from local storage
  const formerTasks = localStorage.getItem("tasks");
  const parsedFormerTasks = JSON.parse(formerTasks);

  // Check if there are existing tasks
  if (parsedFormerTasks) {
    taskArray.push(...parsedFormerTasks);
    taskArray.push(newTask);
    const taskString = JSON.stringify(taskArray);
    localStorage.setItem("tasks", taskString);
  } else {
    taskArray.push(newTask);
    const taskString = JSON.stringify(taskArray);
    localStorage.setItem("tasks", taskString);
  }

  window.location.reload(); // Reload the page after saving
};

// Load tasks from local storage on page load

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      parsedTasks.forEach(function(task) {
        new DailyTask(
          task.title,
          task.description,
          task.category,
          task.dueDate,
          task.priority
        );
      });
    }
  }
  
  // Call the function to load tasks from local storage
  loadTasksFromLocalStorage();
  
  // Render the tasks on the page
  renderDailyTask();
