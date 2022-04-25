let taskLists = [
    {
        id: "default",
        tasks: []
    }
];

export function getTaskLists() {
    return taskLists;
}

export function newTaskList(id) {
    taskLists.push({id, tasks:[]})
}

export function getTasks(taskListID="default") {
    let taskList = getTaskLists().filter(task => {

        return task.id === taskListID;
    })

    return taskList[0].tasks;
}

export function addTaskToTaskList(task, taskListID="default") {
    const taskListToAddTo = getTaskLists().filter(taskList => {
        return taskList.id === taskListID;
    })

    task.id = taskListToAddTo[0].tasks.length;
    console.log(task.id);
    taskListToAddTo[0].tasks.push(task);
}

export function loadTaskLists(loadedTaskLists) {
    taskLists = loadedTaskLists;
}

export function deleteTaskFromTaskList(taskID, taskList="default") {
    console.log("Deleting task: " + taskID);
}

// These two could have a helper/abstracted function that gets any tasks within a date range 
export function getTodayTasks() {
    // Get all task lists
    // Add all tasks from all task lists to array
    // Filter that array to only the tasks with a due date of today
}

export function getThisWeekTasks() {
    // Get all task lists
    // Add all tasks from all task lists to array
    // Filter that array to only the tasks with a due date of this week
}

