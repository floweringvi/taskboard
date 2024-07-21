// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const taskHeader = $("#task-title").val()
const taskDescription = $('#task-description').val()
const taskDueDate = $('#datepicker').val()
const todo = $('#todo-cards')
taskIdgenerate = generateTaskId();





let tasks = []

// Todo: create a function to generate a unique task id
function generateTaskId() {
   const task_id = Math.floor(Math.random() * 1);

   return task_id;

}

// Todo: create a function to create a task card
function createTaskCard(task) {
   task = {
      taskHeader,
   taskDescription,
   taskDueDate}

     taskCard = $('<div>')
     taskCardHeader = $('<h2>')
     taskCardsubHeader =$('<h3>')
     taskCardBody = $('<p>')

     taskCardHeader.text(taskHeader)
     taskCardsubHeader.text(taskDueDate)
     taskCardBody.text(taskDueDate)

     taskCard.append(taskCardHeader)
     taskCardHeader.append(taskCardsubHeader)
     taskCardsubHeader.append(taskCardBody)
     todo.append(taskCard)
   
   

   }

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
taskList 

for(task in taskList){
   createTaskCard();
}
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

event.preventDefault();

 task={
   taskHeader,
   taskDescription,
   taskDueDate, 
   taskIdgenerate = taskId,
 }

 tasks.push(task)

 localStorage.setItem('tasks', tasks)

 createTaskCard(task)

}

AddTaskBtn = $('.btn-primary')

AddTaskBtn.on('click',handleAddTask)

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
   taskList
for(let i =0; i < taskList.length;i++){
   if(taskList.task.taskId[i] === taskId){
      taskList.splice([i],1);
   }
}
}


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

//datepicker function


$(function () {
   $('#datepicker').datepicker({
     changeMonth: true,
     changeYear: true,
   });
 });
