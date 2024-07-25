// // Retrieve tasks and nextId from localStorage


// // Todo: create a function to generate a unique task id


// // Todo: create a function to create a task card


// // Todo: create a function to render the task list and make cards draggable


// // Todo: create a function to handle adding a new task


// // Todo: create a function to handle dropping a task into a new status lane


// // Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker


// Retrieve tasks and nextId from localStorage, or set defaults
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

const taskHeader = $("#task-title").val();
const taskDescription = $('#task-description').val();
const taskDueDate = $('#datepicker').val();

const todo = $('#todo-cards');

// Function to generate a unique task ID
function generateTaskId() {
  return nextId++;
}
// function generateTaskId() {
//    const task_id = Math.floor(Math.random() * 1);

//    return task_id;

// }

// Function to create a task card
function createTaskCard(task) {
  taskCard = $('<div>');
  taskCard.addClass('task-card');
  taskCardHeader = $('<h2>')
  taskCardHeader.text(task.taskHeader);
  taskCardsubHeader = $('<h3>')
  taskCardsubHeader.text(task.taskDueDate);
  taskCardBody = $('<p>')
  taskCardBoy.text(task.taskDescription);
  taskCardDelete = $('<button>');
  taskCardDelete.addClass('deleteBtn');
  taskCardDelete.text('Delete');
  taskCardDelete.attr('data-id', task.id);

  taskCard.append(taskCardHeader, taskCardsubHeader, taskCardBody, taskCardDelete);
  todo.append(taskCard);
}

// Function to render the task list
function renderTaskList() {
  todo.empty();
  taskList.forEach(task => {
    createTaskCard(task);
  });
  //for(task in taskList){
  //createTaskCard(task)}
  //This was the original.
}

// Function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

  

  let task = {
    id: generateTaskId(),
    taskHeader,
    taskDescription,
    taskDueDate
  };

  taskList.push(task);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  localStorage.setItem('nextId', nextId);

  createTaskCard(task);
}

// Function to handle deleting a task
function handleDeleteTask(event) {
  event.preventDefault();
  let taskId = $(this).attr('data-id');
  taskList = taskList.filter(task => task.id != taskId);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}
// // Todo: create a function to handle deleting a task
// function handleDeleteTask(event){
//    event.preventDefault();
//    taskList
// for(let i =0; i < taskList.length;i++){
//    if(taskList.task.taskId[i] === taskId){
//       taskList.splice([i],1);
//    }
// }
// }

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // Implement drag-and-drop functionality here
}

// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  $('#addTaskForm').on('submit', handleAddTask);
  todo.on('click', '.deleteBtn', handleDeleteTask);

  $('#datepicker').datepicker({
    changeMonth: true,
    changeYear: true,
  });

  // Implement droppable functionality for lanes
});


