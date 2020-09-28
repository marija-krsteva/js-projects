// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks)
    //Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTaskConfirmation);
    // Clear tasks event
    clearBtn.addEventListener('click', clearAllTasksConfirmation);
    //Filter Tasks event
    filter.addEventListener('keyup', filterTasks)
}

// Get Tasks From Local Storage
function getTasksFromLocalStorage() {
    return localStorage.getItem('tasks') === null ? [] : JSON.parse(localStorage.getItem('tasks'));
 }

// Create LI element
function createTaskElement(text) {
    // Create li element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(text));
    // Create new link element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // Add item html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
}

// Get Tasks from Local Storage and show them
function getTasks() {
    let tasks = getTasksFromLocalStorage();

    tasks.forEach(function(task) {
        createTaskElement(task);
    });
}

// Create Confirmation Modal
function createModal(text, callbackFunction) {
    MaterialDialog.dialog(
        '',
        {
            title:text,
            modalType:"modal-fixed-footer",
            buttons:{
                close:{
                    className:"red",
                    text:"No",
                },
                confirm:{
                    className:"blue",
                    text:"Yes",
                    callback:callbackFunction
                }
            }
        }
    );
}

// Add Task
function addTask(e) {
    // Check if input empty
    if(taskInput.value === '') {
        M.toast({html: 'Please input a task', displayLength: '1500'});
        return 0;
    }

    createTaskElement(taskInput.value);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store Task in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTaskConfirmation(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        createModal('Are you sure you want to remove the task?', removeTask.bind(this, e.target.parentElement.parentElement));
    }
}

// Remove Task from UI and Local Storage
function removeTask(task) {
    task.remove();

    // Remove from Local Storage
    removeTaskFromLocalStorage(task);
}

// Remove Task From Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks = getTasksFromLocalStorage();
    
    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create Clear All Tasks Confirmation Modal
function clearAllTasksConfirmation() {
    createModal('Are you sure you want to remove all tasks?', clearTasks);
}

// Clear All Tasks From Local Storage
function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}