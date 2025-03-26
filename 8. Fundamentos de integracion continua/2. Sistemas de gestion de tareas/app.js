const express = require("express");
const app = express();

const tasks = [
    {
        id: 1,
        name: "Task 1",
    },
    {
        id: 2,
        name: "Task 2",
    },
];

app.get("/tasks", (req, res) => {
    return res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === id);
    if (task === null) return res.status(404).send();
    return res.json(task);
});

module.exports = app;