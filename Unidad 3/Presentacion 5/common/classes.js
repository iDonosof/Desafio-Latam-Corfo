class Project {
    constructor(id, name, startDate) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }
}

class Task {
    constructor(id, description, status, limitDate) {
        this.id = id;
        this.description = description;

        if (!["Pendiente", "En progreso", "Completada"].includes(status)) throw new Error(`The status must be "Pending", "En progreso" and "Completada". Current status is ${status}`);

        this.status = status;
        this.limitDate = limitDate;
    }
}

export {
    Project,
    Task
}