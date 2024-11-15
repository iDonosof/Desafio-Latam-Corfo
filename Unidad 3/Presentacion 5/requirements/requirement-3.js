import fetch, { Headers } from "node-fetch";

// Punto 1
const loadProjectDetails = async () => {
    const response = await fetch("http://localhost:3000/projects");
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
};

// Punto 2
const updateProjectDetails = async (project) => {
    const response = await fetch("http://localhost:3000/projects/" + project.id, {
        body: JSON.stringify(project),
        method: "PUT",
        headers: new Headers({ "Content-Type": "application/json" }),
    });
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
};

// Punto 3
class Notifier {
    #toNotify = [];

    addListener(fn) {
        this.#toNotify.push(fn);
    }

    notify(task) {
        this.#toNotify.forEach((fn) => fn(task));
    }
}

export { loadProjectDetails, updateProjectDetails, Notifier };
