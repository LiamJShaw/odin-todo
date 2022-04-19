export function newTask(title="Test", details="Lorem ipsum", dueDate = new Date(), priority = "normal") {
    return {
        title,
        details,
        dueDate,
        priority
    }
}
