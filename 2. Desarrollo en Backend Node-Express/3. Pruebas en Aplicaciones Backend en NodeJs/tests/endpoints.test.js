const request = require("supertest");
const { app, listener } = require("../index.js");
const { VerifyToken } = require("../utils/jwt.js");

jest.mock("../database/database.js", () => {
    return {
        CreateUserInfo: async (username, password, fullName, userTypeId) => {
            return {
                id: 1,
                username,
                password,
                fullName,
                userTypeId,
                lastLogin: null,
            };
        },
        GetUserByUsername: async (username) => {
            return {
                id: 1,
                username,
                full_name: "Test 1",
                password: "$2b$10$oEUCSp1v56JtSkOsVdRtkuS9l0DHFqQE0kqon5kIDCOj6d87EoXRq",
                user_type_id: 3,
            };
        },
    };
});

describe("Testing endpoints", () => {
    it("Should return ok message", (done) => {
        request(app)
            .get("/api/ping")
            .expect(200, "Ok")
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });

    it("Should return user created", (done) => {
        const username = "test";
        const password = "asd123asd";
        const fullName = "Test name";
        const userTypeId = 1;
        request(app)
            .post("/api/sigin")
            .set("Content-Type", "application/json")
            .send({ username, password, fullName, userTypeId })
            .expect(
                201,
                {
                    id: 1,
                    username,
                    fullName,
                    userTypeId,
                },
                done
            );
    });

    it("Should return a valid token", (done) => {
        const username = "Test 1";
        const password = "asd123asd";
        request(app)
            .post("/api/login")
            .set("Content-Type", "application/json")
            .send({ username, password })
            .expect(200)
            .then((response) => {
                expect(VerifyToken(response.body.token)).toBeTruthy();
                done();
            });
    });
});

listener.close();
