export function newTask(title, details="Lorem ipsum", dueDate = new Date(), priority = "normal", complete=false, id) {
    return {
        title,
        details,
        dueDate,
        priority,
        complete,
        id
    }
}
