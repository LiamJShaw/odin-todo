const taskContainer = document.getElementById("task-container");

export function clearTaskContainer() {
    taskContainer.innerHTML = "";
    createNewTaskButton();
}

export function addTaskToContainer(task) {
    const taskCard = document.createElement("div");
    taskCard.classList.add("task");

    // Title
    const title = document.createElement("h3");
    title.classList.add("title");
    title.textContent = task.title;
    taskCard.append(title);

    // Details
    const details = document.createElement("p");
    details.classList.add("details");
    details.textContent = task.details;
    taskCard.append(details);

    // Due date
    const dueDate = document.createElement("input");
    dueDate.classList.add("due");
    dueDate.type = "date";
    dueDate.textContent = task.dueDate;
    taskCard.append(dueDate);
    

    taskContainer.append(taskCard);
}

export function addTaskListToContainer(taskList) {
    taskList.array.forEach(task => {
        addTask(task);        
    });
}

function createNewTaskButton() {
    const newTaskButton = document.createElement("div");
    newTaskButton.classList.add("new-task");

    const addSign = document.createElement("p");
    addSign.textContent = "+";

    newTaskButton.append(addSign);

    taskContainer.append(newTaskButton);
}
