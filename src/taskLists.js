const taskLists = [
    {
        id: "default",
        tasks: [
            { title: "title",
            description: "description",
            dueDate: "dueDate",
            priority: "priority" }
        ]
    },

    {
        id: "test",
        tasks: [
            { title: "test",
            description: "test",
            dueDate: "test",
            priority: "test" }
        ]
    }
];

export function getTaskLists() {
    return taskLists;
}

export function newTaskList(id) {
    taskLists.push({id, tasks:[]})
}

export function getTasks(taskListID="default") {
    let taskList = getTaskLists().filter(taskList => {

        return taskList.id === taskListID;
    })

    console.log(taskList);

}

export function addTaskToTaskList(task, taskListID="default") {
    const taskListToAddTo = getTaskLists().filter(taskList => {
        return taskList.id === taskListID;
    })

    taskListToAddTo[0].tasks.push(task);
}