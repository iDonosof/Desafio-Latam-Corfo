import projects from "../common/repository.js";

// Punto 2
const addProject = (project) => {
    const maxId = projects.map((pro) => pro.id).reduce((prev, curr) => (prev > curr ? prev : curr), 0) + 1;
    project.id = maxId;
    projects.push(project);
    return project;
};

// Punto 3
const showSummary = (projectId) => {
    const project = projects.find((pro) => pro.id == projectId);
    return project.tasks.reduce((prev, { status }) => {
        return {
            ...prev,
            [status]: prev.hasOwnProperty(status) ? prev[status] + 1 : 1,
        };
    }, {});
};

// Punto 4
const sortByLimitDate = (projectId) => {
    return projects.find((pro) => pro.id == projectId).tasks.toSorted((a, b) => a.limitDate - b.limitDate);
};

export {
    addProject,
    showSummary,
    sortByLimitDate,
};
