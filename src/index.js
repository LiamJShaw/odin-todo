import '@fortawesome/fontawesome-free/js/all';

import { addTask, addTaskToContainer, clearTaskContainer } from './DOMcontroller';
import './styles.css';
import { newTask } from './task';
import { newTaskList, getTaskLists, getTasks } from './taskLists';

const newTaskButton = document.querySelector(".new-task");

console.log(newTaskButton);

newTaskButton.addEventListener("click", () => {

    console.log("Task lists: ");
    console.log(getTaskLists());
    const task = newTask();
    addTaskToContainer(task);
})