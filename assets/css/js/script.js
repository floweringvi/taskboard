// Retrieve tasks and nextId from localStorage, or set defaults
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;



const todo = $('#todo-cards');
const inProgress = $('#in-progress-cards')
const done = $('#done-cards')

// Function to generate a unique task ID
function generateTaskId() {
  return nextId++;
}


// Function to create a task card
function createTaskCard(task) {
  //Create task card div and add id attribute, add a class draggable
  taskCard = $('<div>');
  taskCard.attr('data-id', task.id);
  taskCard.attr('style','border: solid 2px black');
  taskCard.addClass('task-card draggable ui-draggable border-dark');
  taskCardHeader = $('<h2>')
  //Add the text of the input values do different sections
  taskCardHeader.text(task.taskHeader);
  taskCardsubHeader = $('<h3>')
  taskCardsubHeader.text(task.taskDueDate);
  taskCardBody = $('<p>')
  taskCardBody.text(task.taskDescription);
  taskCardDelete = $('<button>');
  taskCardDelete.addClass('deleteBtn');
  taskCardDelete.addClass('btn btn-danger delete')
  taskCardDelete.text('Delete');
  taskCardDelete.attr('data-id', task.id);
  //Append all to the card
  taskCard.append(taskCardHeader, taskCardsubHeader, taskCardBody, taskCardDelete);
  return taskCard
}

// Function to render the task list
function renderTaskList() {
  todo.empty();
  inProgress.empty();
  done.empty();

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
    
    helper: function (e) {
      
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
     
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  }); 
  
}

// Function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const taskHeader = $("#task-title").val();
  const taskDescription = $('#task-description').val();
  const taskDueDate = $('#datepicker').val();
  
//automatically generate a card task object, with status 'to-do'
//random Id
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
  //Get the taskId of this specific taskcard
  let taskId = $(this).attr('data-id');
  //look through taskList for ID, removing 
  taskList = taskList.filter(task => task.id != taskId);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}



function handleDrop(event, ui) {
  // Implement drag-and-drop functionality here
    //Get from local storage
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

    // The Id of the task that's being dragged
    const taskId = ui.draggable[0].dataset.taskId;
  
    // The #id of the lane we dropped in
    const newStatus = event.target.id;
    console.log(newStatus)
  
    for (let task of taskList) {
      // get the id of the task card and make sure it matches, then update status to lane status
      if (task.id === taskId) {
        task.status = newStatus;
      }
    }
    //Save all over again, updating
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}


$(document).ready(function () {
  renderTaskList();

 //event listeners
  $('#addTaskForm').on('click', handleAddTask);
  todo.on('click', '.deleteBtn', handleDeleteTask);

  //making the datepicker function
  $('#datepicker').datepicker({
    changeMonth: true,
    changeYear: true,
  });

  //dropping into the lane
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });

 
});


