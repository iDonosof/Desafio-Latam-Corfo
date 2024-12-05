import express from "express";
import middleware from "./middleware/middleware.js";

import { GenerateToken, VerifyToken, DecodeToken } from "./utils/jwt.js";
import { hash, compare } from "./utils/encrypting.js";

import { CreateUserInfo, GetUserByUsername, GetAvailableHours, AddBooking, UpdateBooking, DeleteBooking } from "./database/database.js";

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
                id: user.id,
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

privateEndpoints.get("/calendar", async (req, res) => {
    const date = req.query?.date ?? new Date().toLocaleDateString("es-ES");
    return res.json(await GetAvailableHours(date));
});

//Create booking
privateEndpoints.post("/booking", async (req, res) => {
    const { bookingDate, bookingTime, employeeId } = req.body;
    const clientId = req.user.id;
    return res.json(await AddBooking(bookingDate, bookingTime, clientId, employeeId));
});

//Update booking
privateEndpoints.put("/booking/:id", async (req, res) => {
    const id = req.params?.id;
    const { bookingDate, bookingTime, employeeId } = req.body;
    if (await UpdateBooking(id, bookingDate, bookingTime, employeeId)) {
        return res.sendStatus(200);
    }
    return res.sendStatus(401);
});

//Delete booking
privateEndpoints.delete("/booking/:id", async (req, res) => {
    const id = req.params?.id;
    try {
        await DeleteBooking(id);
        return res.sendStatus(200);
    } catch (err) {
        return res.sendStatus(400);
    }
});

app.listen(process.env.DEFAULT_PORT, () => {
    console.log("Server running");
});
