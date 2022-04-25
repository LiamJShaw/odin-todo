import '@fortawesome/fontawesome-free/js/all';
import './styles.css';

import { newTask } from './task';
import { newTaskList, getTaskLists, 
         getTasks, addTaskToTaskList, 
         loadTaskLists, deleteTaskFromTaskList } from './taskLists';
import { saveTasks, loadTasks } from './storage';

const taskContainer = document.getElementById("task-container");

export function clearTaskContainer() {
    taskContainer.innerHTML = "";
    createNewTaskButton();
}

export function addTaskToContainer(task) {

    const taskCard = document.createElement("div");
    taskCard.classList.add("task");

    // Completed checkbox
    const completedCheckbox = document.createElement("input");
    completedCheckbox.type = "checkbox";
    completedCheckbox.classList.add("completed");
    completedCheckbox.checked = task.complete;
    taskCard.append(completedCheckbox);

    // Title
    const title = document.createElement("h3");
    title.classList.add("title");
    title.textContent = task.title;
    taskCard.append(title);

    // // Show due date if it exists
    // Check task.dueDate is not null
    // if true, show

    // Edit task button
    taskCard.append(newEditButton());

    // Delete task button
    taskCard.append(newDeleteButton());

    // The below is going into the task modal soon

    // // Details
    // const details = document.createElement("p");
    // details.classList.add("details");
    // details.textContent = task.details;
    // taskCard.append(details);

    // // Due date
    // const dueDate = document.createElement("input");
    // dueDate.classList.add("due");
    // dueDate.type = "date";
    // dueDate.textContent = task.dueDate;
    // taskCard.append(dueDate);
    


    // Add id and taskList to taskContainer so that the underlying task can be referenced
    taskCard.setAttribute('data-id', task.id);
    taskCard.setAttribute('data-id', task.id);

    taskContainer.append(taskCard);
}

export function addTaskListToContainer(taskList) {

    Object.values(taskList).forEach(task => {
        addTaskToContainer(task);
    });
}


// Buttons

export function createNewTaskButton() {
    const newTaskButton = document.createElement("div");
    newTaskButton.classList.add("new-task");

    const addSign = document.createElement("p");
    addSign.textContent = "+";

    newTaskButton.append(addSign);

    taskContainer.append(newTaskButton);

    newTaskButton.addEventListener("click", () => {
        newTaskButton.remove();
        newTaskInput();
    })
}

function newTaskInput() {
    const addTaskContainer = document.createElement("div");
    addTaskContainer.classList.add("new-task-input");

    const taskTitleInput = document.createElement("input");
    taskTitleInput.type = "text";
    taskTitleInput.classList.add("new-task-title");
    addTaskContainer.append(taskTitleInput);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons");
    addTaskContainer.append(buttonsContainer);

    buttonsContainer.append(newAddTaskButton());
    buttonsContainer.append(newCancelAddTaskButton());
    
    taskContainer.append(addTaskContainer);
}

function newAddTaskButton() {
    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("add-button");
    addTaskButton.textContent = "Add";

    addTaskButton.addEventListener("click", () => {
        const titleUserInput = document.querySelector(".new-task-title");
        
        const task = newTask(titleUserInput.value);

        addTaskToTaskList(task);
        addTaskToContainer(task);
        saveTasks(getTaskLists());

        document.querySelector(".new-task-input").remove();
        createNewTaskButton();
    })

    return addTaskButton;
}

function newCancelAddTaskButton() {
    const cancelAddTaskButton = document.createElement("button");
    cancelAddTaskButton.classList.add("cancel-button");
    cancelAddTaskButton.textContent = "Cancel";

    cancelAddTaskButton.addEventListener("click", () => {
        createNewTaskButton();
        document.querySelector(".new-task-input").remove();
    })

    return cancelAddTaskButton;
}

function newEditButton() {
    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid");
    editIcon.classList.add("fa-pencil");
    editButton.append(editIcon);

    editButton.addEventListener("click", () => {
        console.log(editButton);
    })

    return editButton;
}

function newDeleteButton() {

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid");
    deleteIcon.classList.add("fa-trash");
    deleteButton.append(deleteIcon);

    deleteButton.addEventListener("click", () => {
        deleteTaskFromTaskList(deleteButton.parentElement.getAttribute("data-id"));
        deleteButton.parentElement.remove();
    })

    return deleteButton;
}

// On page load
(() => {

    // Load tasks from storage if there are any
    let loadedTaskLists = loadTasks();

    if (loadedTaskLists !== null) {
        // Take loaded tasks and put them in the task lists array
        loadTaskLists(loadedTaskLists);

        // Add the default task list to the DOM
        addTaskListToContainer(getTasks());
    }

    // Display a "new task" button
    createNewTaskButton();
})();