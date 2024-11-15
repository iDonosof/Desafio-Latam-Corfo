import projects from "./common/repository.js";
import { Project, Task } from "./common/classes.js";

import { addProject, showSummary, sortByLimitDate } from "./requirements/requirement-1.js";
import { calculateRemainingDays, filterTasksProject, getCriticsTasks } from "./requirements/requirement-2.js";
import { loadProjectDetails, updateProjectDetails, Notifier } from "./requirements/requirement-3.js";

import PressToContinue from "./utils/PressToContinue.js";

// Metodo agregado al prototype para facilitar el uso de dates
Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + days);
    return this;
};

console.log("******* Requerimiento 1 Punto 1 *******");
const project = addProject(new Project(null, "Preparar proyecto sitio web", new Date()));
project.tasks.push(new Task(1, "Lluvia de ideas", "Completada", new Date()));
project.tasks.push(new Task(2, "Crear diagramas de flujo", "Completada", new Date().addDays(6)));
project.tasks.push(new Task(3, "Definir herramientas", "Completada", new Date().addDays(1)));
project.tasks.push(new Task(4, "Crear carta gantt", "En progreso", new Date().addDays(2)));
project.tasks.push(new Task(5, "Comenzar desarrollo", "Pendiente", new Date().addDays(1)));
project.tasks.push(new Task(6, "Cobrar 🤑", "Pendiente", new Date().addDays(20)));
project.tasks.push(new Task(7, "Deployear", "Pendiente", new Date().addDays(30)));

addProject(new Project(null, "Festejar finalizacion de prueba", new Date()));
project.tasks.push(new Task(1, "Hacer una vaquita", "Completada", new Date()));
project.tasks.push(new Task(2, "Definir que comprar", "Completada", new Date().addDays(6)));
project.tasks.push(new Task(3, "Ir a comprar", "Completada", new Date().addDays(1)));
project.tasks.push(new Task(4, "Preparar la comida", "En progreso", new Date().addDays(2)));
project.tasks.push(new Task(5, "Festejar", "Pendiente", new Date().addDays(1)));

console.table(projects);
await PressToContinue();

console.log("******* Requerimiento 1 Punto 2 *******");
console.table(showSummary(1)); //Id  del proyecto hardcoded a proposito para agilizar el desarrollo
await PressToContinue();

console.log("******* Requerimiento 1 Punto 3 *******");
console.table(sortByLimitDate(1)); //Id  del proyecto hardcoded a proposito para agilizar el desarrollo
await PressToContinue();

console.log("******* Requerimiento 2 Punto 1 *******");
//Id  del proyecto hardcoded a proposito para agilizar el desarrollo
// Se valida cualquier estado que no sea completado
console.table(filterTasksProject(1, (task) => ["En progreso", "Pendiente"].includes(task.status)));
await PressToContinue();

console.log("******* Requerimiento 2 Punto 2 *******");
console.table(`Dias restantes para terminar todas las tareas: ${calculateRemainingDays(1)}`); //Id  del proyecto hardcoded a proposito para agilizar el desarrollo
await PressToContinue();

console.log("******* Requerimiento 2 Punto 3 *******");
console.table(getCriticsTasks(1)); //Id  del proyecto hardcoded a proposito para agilizar el desarrollo
await PressToContinue();

console.log("******* Requerimiento 3 Punto 1 *******");
const proyectsApi = await loadProjectDetails();
console.table(proyectsApi);
await PressToContinue();

console.log("******* Requerimiento 3 Punto 2 *******");
try {
    const singleProject = proyectsApi[0];
    const maxId =
        proyectsApi
            .map((pro) => pro.tasks.map((task) => parseInt(task.id)))
            .flat()
            .reduce((prev, curr) => (curr > prev ? curr : prev), 0) + 1;
    // Task Id cambiada a string para coincidir con la data del json, 
    // esta data no esta relacionada ni validada de la misma manera que las clases usadas en este archivo
    singleProject.tasks.push(new Task(maxId.toString(), "Nueva tarea desde api por codigo", "Completada", "2024-11-15"));

    const updateResponse = await updateProjectDetails(singleProject);
    // La respuesta al retornar un objeto, la agregue a una lista para un correcto despliegue con console.table
    console.table([updateResponse]);
    console.table(updateResponse.tasks);
} catch (err) {
    console.error(err);
}
await PressToContinue();

console.log("******* Requerimiento 3 Punto 3 *******");
const notifier = new Notifier();
notifier.addListener((task) => {
    console.log(`Carlos, la tarea con id ${task.id} se actualizo a ${task.status}`);
});
notifier.addListener((task) => {
    console.log(`Luis, la tarea con id ${task.id} se actualizo a ${task.status}`);
});
notifier.addListener((task) => {
    console.log(`José. la tarea con id ${task.id} se actualizo a ${task.status}`);
});
notifier.addListener((task) => {
    console.log(`Andrea, la tarea con id ${task.id} se actualizo a ${task.status}`);
});

const task = project.tasks.pop();
task.status = "Completada";
notifier.notify(task);
await PressToContinue();
