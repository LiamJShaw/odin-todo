export function newTask(title, details="Lorem ipsum", dueDate, priority = "normal", complete=false) {
    return {
        title,
        details,
        dueDate,
        priority,
        complete
    }
}
