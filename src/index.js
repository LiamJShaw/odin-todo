import '@fortawesome/fontawesome-free/js/all';
import './styles.css';

import { newTask } from './task';
import { newTaskList, getTaskLists, 
         getTasks, addTaskToTaskList, 
         loadTaskLists, deleteTaskFromTaskList,
         getTodayTasks, getThisWeekTasks } from './taskLists';
import { saveTasks, loadTasks } from './storage';

const taskContainer = document.getElementById("task-container");

function clearTaskContainer() {
    taskContainer.innerHTML = "";
}

function addTaskToContainer(task, index) {

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

    // Add id so that the underlying task can be referenced
    taskCard.setAttribute('data-id', index);

    taskContainer.append(taskCard);
}

function loadTaskList(taskList="default") {
    taskContainer.setAttribute("data-tasklist", taskList);
    addTaskListToContainer(getTasks(taskList));
}

function addTaskListToContainer(taskList="default") {

    console.log(taskList);

    let index = 0;

    Object.values(taskList).forEach(task => {
        addTaskToContainer(task, index);
        index++;
    });
}


// Buttons

function createNewTaskButton() {
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
    taskTitleInput.focus();
}

function newAddTaskButton() {
    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("add-button");
    addTaskButton.textContent = "Add";

    addTaskButton.addEventListener("click", () => {
        const titleUserInput = document.querySelector(".new-task-title");
        
        const task = newTask(titleUserInput.value);

        addTaskToTaskList(task, taskContainer.getAttribute("data-tasklist"));
        clearTaskContainer();
        addTaskListToContainer(getTasks(taskContainer.getAttribute("data-tasklist")));
        saveTasks(getTaskLists());

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
        deleteTaskFromTaskList(deleteButton.parentElement.getAttribute("data-id"), taskContainer.getAttribute("data-tasklist"));
        clearTaskContainer();
        
        addTaskListToContainer(getTasks(taskContainer.getAttribute("data-tasklist")));
        saveTasks(getTaskLists());

        createNewTaskButton();
    })

    return deleteButton;
}


// Navigation Buttons
const links = document.querySelector(".links");
const mainLinks = links.querySelector(".main");
const projectLinks = links.querySelector(".project-list");

links.addEventListener("click", e => {
    changeActiveMenuItem(e.target);

    // Project links
    const taskList = e.target.getAttribute("data-tasklist");
    if (taskList) {
        clearTaskContainer();
        taskContainer.setAttribute("data-tasklist", taskList);
        addTaskListToContainer(getTasks(taskList));
        createNewTaskButton();
        return;
    }

    // Main links
    switch (e.target.id) {

        // Catching the clicks directly on project-list
        case "":
            break;

        case "home":
            // This should probably be its own function at this point
            e.target.setAttribute("data-tasklist", "default");
            clearTaskContainer();
            addTaskListToContainer(getTasks());
            createNewTaskButton();
            break;

        case "today":
        case "this-week":
            clearTaskContainer();
            taskContainer.textContent = "No tasks to show";
            getTodayTasks();
            break;

        case "projects":
            displayProjectCards();
            break;
        }
})

function changeActiveMenuItem(menuItem) {

    Array.from(mainLinks.children).forEach(node => {
        node.classList.remove("active");
    })

    // There has to be a way to include this in the above list
    Array.from(projectLinks.children).forEach(node => {
        node.classList.remove("active");
    })

    // Perhaps there is a better way to capture these events
    if (menuItem.nodeName === "LI") {

    } else {
        menuItem = menuItem.parentElement;
    }

    menuItem.classList.add("active");
}

function addProjectToProjectList(project) {
    const projectListEntry = document.createElement("li");
    projectListEntry.setAttribute("data-tasklist", project.id);

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-list-check";
    projectListEntry.append(icon);

    const projectTitle = document.createElement("p");
    projectTitle.textContent = project.id;
    projectListEntry.append(projectTitle);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("project-delete-button");
    projectListEntry.append(deleteButton);

    projectLinks.append(projectListEntry);
}

function loadProjectList() {

    // Clear currently loaded project list
    projectLinks.innerHTML = "";

    // Get all task lists
    const projectLists = getTaskLists();
    console.log(projectLists);

    // Create a button for each taskList with
    projectLists.forEach(project => {
        if (project.id !== "default") {
            addProjectToProjectList(project);
        } 
    })

}

function createNewProjectButton() {
    const newProjectButton = document.createElement("li");
    newProjectButton.classList.add("new-project");

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-folder-plus";
    newProjectButton.append(icon);

    const newProjectText = document.createElement("p");
    newProjectText.textContent = "New Project...";

    newProjectButton.append(newProjectText);

    projectLinks.append(newProjectButton);

    newProjectButton.addEventListener("click", () => {
        newProjectButton.remove();
        projectLinks.append(createNewProjectInput());

    })
}

function createNewProjectInput() {

    const addProjectContainer = document.createElement("div");
    addProjectContainer.classList.add("new-project-input");

    const projectTitleInput = document.createElement("input");
    projectTitleInput.type = "text";
    projectTitleInput.classList.add("new-project-title");
    addProjectContainer.append(projectTitleInput);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons");
    addProjectContainer.append(buttonsContainer);

    buttonsContainer.append(newAddProjectButton());
    buttonsContainer.append(newCancelAddProjectButton());
    
    projectTitleInput.focus();
    return addProjectContainer;
}

function newAddProjectButton() {
    const addProjectButton = document.createElement("button");
    addProjectButton.classList.add("add-button");
    addProjectButton.textContent = "Add";

    addProjectButton.addEventListener("click", e => {

        const titleUserInput = document.querySelector(".new-project-title");

        newTaskList(titleUserInput.value);
        saveTasks(getTaskLists());
        loadProjectList();
        addProjectButton.parentElement.parentElement.remove();

        displayProjectCards();

        createNewProjectButton();
    })

    return addProjectButton;
}

function newCancelAddProjectButton() {
    const cancelAddProjectButton = document.createElement("button");
    cancelAddProjectButton.classList.add("cancel-button");
    cancelAddProjectButton.textContent = "Cancel";

    cancelAddProjectButton.addEventListener("click", () => {
        createNewProjectButton();
        document.querySelector(".new-project-input").remove();
    })

    return cancelAddProjectButton;
}

// Project cards page

function displayProjectCards() {

    clearTaskContainer();

    // Get all task lists
    const taskLists = getTaskLists();

    // Create and append each as a card 
    taskLists.forEach(taskList => {
        if (taskList.id !== "default") {
            AddProjectCardToContainer(taskList);
        }
    })

    createNewProjectCardButton();
}

function AddProjectCardToContainer(project) {

    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    projectCard.setAttribute("data-project", project.id)

    // Title
    const projectTitle = document.createElement("h2");
    projectTitle.textContent = project.id;
    projectCard.append(projectTitle);

    // taskCount
    const taskCount = document.createElement("p");
    taskCount.textContent = `Tasks: ${project.tasks.length}`;
    projectCard.append(taskCount);

    // Completed?
    
    // Delete button
    const deleteButton = document.createElement("button");

    projectCard.addEventListener("click", e => {
        const project = e.target.getAttribute("data-project");

        if (project) {
            clearTaskContainer();
            taskContainer.setAttribute("data-tasklist", project);
            addTaskListToContainer(getTasks(project));
            createNewTaskButton();
        }
    })

    taskContainer.append(projectCard);
}

function createNewProjectCardButton() {
    const newProjectButton = document.createElement("div");
    newProjectButton.classList.add("new-task");

    const addSign = document.createElement("p");
    addSign.textContent = "+";

    newProjectButton.append(addSign);

    taskContainer.append(newProjectButton);

    newProjectButton.addEventListener("click", () => {
        newProjectButton.remove();
        taskContainer.append(createNewProjectInput());
    })
}


// On page load
(() => {

    // Load tasks from storage if there are any
    let loadedTaskLists = loadTasks();

    if (loadedTaskLists !== null) {
        // Take loaded tasks and put them in the task lists array
        loadTaskLists(loadedTaskLists);

        // Add the default task list to the DOM
        loadTaskList();

        // Load any lists that aren't the default
        loadProjectList();
    }

    // Display a "new task" button
    createNewTaskButton();

    // Display a "new project" button
    createNewProjectButton();
})();