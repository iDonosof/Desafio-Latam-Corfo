import projects from "../common/repository.js";

// Punto 1
const filterTasksProject = (projectId, fn) => projects.find((pro) => pro.id == projectId).tasks.filter(fn);

// Punto 2
const calculateRemainingDays = (projectId) => {
    return projects
        .find((pro) => pro.id == projectId)
        .tasks.filter((task) => task.status !== "Completada")
        .map((task) => Math.floor((task.limitDate - Date.now()) / (1000 * 60 * 60 * 24)))
        .reduce((prev, curr) => prev + curr, 0);
};

// Punto 3
const getCriticsTasks = (projectId) => {
    return projects
        .find((pro) => pro.id == projectId)
        .tasks.filter((task) => task.status !== "Completada")
        .map((task) => ({
            remainingDays: Math.floor((task.limitDate - Date.now()) / (1000 * 60 * 60 * 24)),
            task: task,
        }))
        .filter(({ remainingDays }) => remainingDays < 3)
        .map(({ task }) => task);
};

export {
    filterTasksProject,
    calculateRemainingDays,
    getCriticsTasks
};
