import express from "express";
import middleware from "./middleware/middleware.js";

import { GenerateToken, VerifyToken, DecodeToken } from "./utils/jwt.js";
import { hash, compare } from "./utils/encrypting.js";

import { CreateUserInfo, GetUserByUsername } from "./database/database.js";

const app = express();

const publicEndpoints = express.Router({ mergeParams: true });
const privateEndpoints = express.Router({ mergeParams: true });

privateEndpoints.use(middleware);

app.use(express.json());
app.use("/api/", publicEndpoints);
app.use("/api/", privateEndpoints);

publicEndpoints.post("/sigin", async (req, res) => {
    const { username, password, fullName, userTypeId } = req.body;
    const encryptedPassword = await hash(password);

    try {
        const createdUser = await CreateUserInfo(username, encryptedPassword, fullName, userTypeId);
        return res.json(createdUser);
    } catch (err) {
        return res.sendStatus(500);
    }
});

publicEndpoints.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await GetUserByUsername(username);
        if (!user) {
            return res.sendStatus(404);
        }
        if (await compare(password, user.password)) {
            //generate token
            const token = GenerateToken({
                fullName: user.fullName,
                username: username,
                userTypeId: user.user_type_id,
            });
            return res.json({
                token,
            });
        }
        return res.sendStatus(401);
    } catch (err) {
        return res.sendStatus(500);
    }
});

privateEndpoints.get("/employees", async (req, res) => {
    return res.send("Private Employees");
});

privateEndpoints.get("/calendar", (req, res) => {
    const date = req.query?.date ?? new Date().toDateString();

});

privateEndpoints.post("/book", (req, res) => {});

app.listen(process.env.DEFAULT_PORT, () => {
    console.log("Server running");
});
