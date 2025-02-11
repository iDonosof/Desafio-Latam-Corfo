const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const EventEmitter = require("events");

const appMiddleware = require("./middlewares/app.middleware.js");
const errorMiddleware = require("./middlewares/error.middleware.js");
const routerMiddleware = require("./middlewares/router.middleware.js");

const jsonSchema = Joi.object({
    username: Joi.string().required(),
    message: Joi.string().required(),
});

const pubSubChannel = new EventEmitter();

const messages = [];
let subscribers = {};

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(appMiddleware);
app.use(router);

router.use(routerMiddleware);

// Endpoints
app.get("/error", (req, res) => {
    throw new Error("Something is broken here!");
});

router.post("/:topic", (req, res) => {
    const { topic } = req.params;
    const rawMessage = req.body;

    const { error } = jsonSchema.validate(rawMessage);

    if (error) {
        return res.status(400).json({ error: "El mensaje es requerido" });
    }
    const message = {
        id: uuidv4(),
        ...rawMessage,
        timestamp: new Date(),
    };
    messages.push(message);
    pubSubChannel.emit(`message:${topic}`, message);

    res.status(200).json({
        status: "Mensaje publicado correctamente",
        topic: topic,
    });
});

router.get("/:topic", (req, res) => {
    const { topic } = req.params;
    if (!subscribers[topic]) {
        subscribers[topic] = [];
    }
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const sendMessage = (message) => {
        res.write(`data: ${JSON.stringify(message)}\n`);
    };

    subscribers[topic].push(sendMessage);
    pubSubChannel.on(`message:${topic}`, sendMessage);

    messages.forEach(sendMessage);

    req.on("close", () => {
        subscribers[topic] = subscribers[topic].filter((sub) => sub !== sendMessage);
        pubSubChannel.removeListener(`message:${topic}`, sendMessage);
    });
});

app.use(errorMiddleware);

app.listen(3000, () => {
    console.log("Server running in port 3000");
});
