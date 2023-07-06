"use strict";
const allTasks = [];

//create constructor function Daily Task
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

newdailyTaskForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const dueDate = form.dueDate.value;
    const priority = form.priority.value;
  
    new DailyTask(title, description, category, dueDate, priority);
  
    form.reset();
  });

const dailyTask1 = new DailyTask("Task 1", "Description 1", "Category 1", "Due Date 1", "Priority 1");
const dailyTask2 = new DailyTask("Task 2", "Description 2", "Category 2", "Due Date 2", "Priority 2");
const dailyTask3 = new DailyTask("Task 3", "Description 3", "Category 3", "Due Date 3", "Priority 3");
const dailyTask4 = new DailyTask("Task 4", "Description 4", "Category 4", "Due Date 4", "Priority 4");
const dailyTask5 = new DailyTask("Task 5", "Description 5", "Category 5", "Due Date 5", "Priority 5");

renderDailyTask();

  