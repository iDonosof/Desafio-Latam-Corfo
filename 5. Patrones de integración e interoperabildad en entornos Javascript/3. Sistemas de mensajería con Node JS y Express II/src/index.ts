import express, { Express, Router } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { DefaultEventsMap, Server, Socket } from "socket.io";
import { randomUUID } from "crypto";
import { createServer } from "http";

import { DEFAULT_PORT } from "./config/enviroment";
import sync_database from "./models";

import userRouter from "./routes/user.route";
import categoryRouter from "./routes/category.route";
import productRouter from "./routes/product.route";

import ChatMessage from "./types/ChatMessage";

import roles from "./common/roles";

import error_handling from "./middlewares/error_handling.middleware";

const app: Express = express();
const rootRouter: Router = Router();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: "*" },
});

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public"))); // TODO: Server the static files
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1", rootRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/category", categoryRouter);
rootRouter.use("product", productRouter);
// TODO: Create the routes to chat

app.use(error_handling);

const rooms: { [key: string]: { messages: ChatMessage[] } } = {};

io.on("connection", (socket: Socket<DefaultEventsMap | DefaultEventsMap | DefaultEventsMap>): void => {
    socket.on("createRoom", (): void => {
        const room_id: string = randomUUID();
        rooms[room_id] = { messages: [] };
        socket.join(room_id);
        socket.emit("roomCreated", {
            room_id,
            user_id: socket.id,
            role_id: roles.Cliente.id,
        });
        socket.to("support_team").emit("listRooms", Object.keys(rooms));
    });

    socket.on("join", (room_id: string): void => {
        if (!rooms[room_id]) {
            socket.emit("error", "Room not found");
            return;
        }
        socket.join(room_id);

        socket.emit("getMessages", rooms[room_id].messages);
    });

    socket.on("support", (role_id: number): void => {
        if (!role_id || role_id === roles.Cliente.id) {
            socket.emit("error", "Sin acceso");
            return;
        }
        socket.join("support_team");
    });

    socket.on("listRooms", (role_id: number): void => {
        if (!role_id || role_id === roles.Cliente.id) {
            socket.emit("error", "Sin acceso");
            return;
        }
        socket.emit("listRooms", Object.keys(rooms));
    });

    socket.on("sendMessage", ({ message, room_id }: { message: ChatMessage; room_id: string }): void => {
        rooms[room_id].messages.push(message);
        io.to(room_id).emit("getMessage", message);
    });

    socket.on("disconnect", (room_id: string): void => {
        if (!rooms[room_id]) {
            socket.emit("error", "Room not found");
            return;
        }
        socket.leave(room_id);
    });
});

httpServer.listen(DEFAULT_PORT, (): void => {
    console.log(`Server is running on port ${DEFAULT_PORT}`);
    sync_database();
});
