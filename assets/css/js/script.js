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



const todo = $('#todo-cards');
const inProgress = $('#in-progress')
const done = $('#done')

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
  taskCard.attr('data-task-id', task.id);
  taskCard.addClass('task-card draggable');
  taskCardHeader = $('<h2>')
  taskCardHeader.text(task.taskHeader);
  taskCardsubHeader = $('<h3>')
  taskCardsubHeader.text(task.taskDueDate);
  taskCardBody = $('<p>')
  taskCardBody.text(task.taskDescription);
  taskCardDelete = $('<button>');
  taskCardDelete.addClass('deleteBtn');
  taskCardDelete.text('Delete');
  taskCardDelete.attr('data-id', task.id);
  console.log(task)
  taskCard.append(taskCardHeader, taskCardsubHeader, taskCardBody, taskCardDelete);
  return taskCard
}

// Function to render the task list
function renderTaskList() {
  todo.empty();
  taskList.forEach(task => {
    const taskCard = createTaskCard(task);
    if (task.status === 'to-do'){
      todo.append(taskCard)
    } else if (task.status ==='in-progress'){
      inProgress.append(taskCard)
    } else if(task.status ==='done'){
      done.append(taskCard)
    }
  });

  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  }); 
  //for(task in taskList){
  //createTaskCard(task)}
  //This was the original.
}

// Function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const taskHeader = $("#task-title").val();
  const taskDescription = $('#task-description').val();
  const taskDueDate = $('#datepicker').val();
  

  let task = {
    id: generateTaskId(),
    taskHeader,
    taskDescription,
    taskDueDate,
    status: 'to-do'
  };

  taskList.push(task);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  localStorage.setItem('nextId', nextId);

  createTaskCard(task);
  renderTaskList();
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
    // ? Read projects from localStorage
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

    // ? Get the project id from the event
    const taskId = ui.draggable[0].dataset.taskId;
  console.log(ui)
    // ? Get the id of the lane that the card was dropped into
    const newStatus = event.target.id;
  console.log(taskId)
    for (let task of taskList) {
      // ? Find the project card by the `id` and update the project status.
      if (task.id === taskId) {
        task.status = newStatus;
      }
    }
    // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}

// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

 
  $('#addTaskForm').on('click', handleAddTask);
  todo.on('click', '.deleteBtn', handleDeleteTask);

  $('#datepicker').datepicker({
    changeMonth: true,
    changeYear: true,
  });

  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });

  // Implement droppable functionality for lanes
});


