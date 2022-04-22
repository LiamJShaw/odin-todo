export function newTask(title, details="Lorem ipsum", dueDate = new Date(), priority = "normal") {
    return {
        title,
        details,
        dueDate,
        priority
    }
}
