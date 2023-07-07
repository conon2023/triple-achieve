"use strict";

// Define an empty array to store the tasks
let tasks = [];

// Define the DailyTask constructor function
function DailyTask(title, description, category, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.category = category;
  this.dueDate = dueDate;
  this.priority = priority;
}

// Add a render method to the DailyTask prototype
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

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    tasks.forEach(function(taskData) {
      const { title, description, category, dueDate, priority } = taskData;
      const task = new DailyTask(title, description, category, dueDate, priority);
      task.render();
    });
  }
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const title = form.title.value;
  const description = form.description.value;
  const category = form.category.value;
  const dueDate = form.dueDate.value;
  const priority = form.priority.value;

  // Create a new task object
  const task = new DailyTask(title, description, category, dueDate, priority);

  // Render the task on the page
  task.render();

  // Add the task to the tasks array
  tasks.push(task);

  // Save the tasks to local storage
  saveTasksToLocalStorage();

  // Reset the form
  form.reset();
}

// Function to clear all tasks
function clearAllTasks() {
  tasks = []; // Clear the tasks array
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear the task list in the DOM
  localStorage.removeItem("tasks"); // Clear the tasks from local storage
}

// Add event listener to the form submit event
const form = document.getElementById("newdailyTaskForm");
form.addEventListener("submit", handleFormSubmit);

// Add event listener to the "Clear All Tasks" button
const clearTasksButton = document.getElementById("clear-tasks");
clearTasksButton.addEventListener("click", clearAllTasks);

// Load tasks from local storage on page load
loadTasksFromLocalStorage();