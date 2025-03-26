const request = require('supertest');
const app = require('../app.js');

let tasks = [
    { id: 1, name: 'Task 1' },
    { id: 2, name: 'Task 2' }
];

describe("API", () =>  {
    it("GET /tasks - Should return array of tasks", async () => {
        const res = await request(app).get("/tasks");
        expect(res.status).toBe(200);
    });

    it("Should return the object of the task when the id is found", async () => {
        const response = await request(app).get("/tasks/1")
        expect(response.status).toBe(200)
        expect(response.body).toEqual(tasks[0])
    })
})