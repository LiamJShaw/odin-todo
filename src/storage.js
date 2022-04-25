export function saveTasks(taskLists) {
    localStorage.setItem("tasks", JSON.stringify(taskLists));
}

export function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks"));
}