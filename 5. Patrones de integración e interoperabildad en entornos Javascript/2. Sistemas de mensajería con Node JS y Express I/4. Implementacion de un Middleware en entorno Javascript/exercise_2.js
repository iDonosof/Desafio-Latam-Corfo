const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const EventEmitter = require("events");

const app = express();
const pubSubChannel = new EventEmitter();
const router = express.Router();
const messages = [];
const consumers = [];

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use((req, res, next) => {
    console.log("Middleware de nivel de aplicación ejecutado.");
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Algo salió mal!");
});

app.use((req, res, next) => {
    res.status(404).send("Recurso no encontrado");
});

app.use("/api", router);

app.post("/publish", (req, res) => {
    const { message, topic = "default" } = req.body;
    if (!message) {
        return res.status(400).json({ error: "El mensaje es requerido" });
    }
    const messageObject = {
        header: "Mensaje",
        body: message,
        topic: topic,
        timestamp: new Date(),
    };
    messages.push(messageObject);
    console.log(`Publicando mensaje en tópico ${topic}:`, message);
    pubSubChannel.emit(`message:${topic}`, messageObject);
    res.status(200).json({
        status: "Mensaje publicado correctamente",
        topic: topic,
    });
});

app.get("/subscribe/:topic", (req, res) => {
    const topic = req.params.topic || "default";
    if (!subscribers[topic]) {
        subscribers[topic] = [];
    }
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    const sendMessage = (message) => {
        res.write(`data: ${JSON.stringify(message)}\n\n`);
    };
    subscribers[topic].push(sendMessage);
    pubSubChannel.on(`message:${topic}`, sendMessage);
    req.on("close", () => {
        subscribers[topic] = subscribers[topic].filter((sub) => sub !== sendMessage);
        pubSubChannel.removeListener(`message:${topic}`, sendMessage);
    });
});

app.post("/send", (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: "El mensaje es requerido" });
    }
    messages.push({ header: "Mensaje", body: message });
    console.log("Mensaje recibido:", message);
    res.status(200).json({ status: "Mensaje enviado exitosamente" });
});

app.get("/receive", (req, res) => {
    if (messages.length > 0) {
        const message = messages.shift(); // Elimina y obtiene el primer mensaje
        return res.status(200).json({ message });
    } else {
        return res.status(204).send(); // No hay mensajes
    }
});

app.get("/topics", (req, res) => {
    const topics = Object.keys(subscribers).map((topic) => ({
        name: topic,
        subscriberCount: subscribers[topic].length,
    }));
    res.json({ topics });
});

router.use((req, res, next) => {
    console.log("Middleware de nivel de direccionador ejecutado.");
    next();
});

router.get("/route", (req, res) => {
    const { type } = req.query;
    if (type === "text") {
        res.send("Mensaje de texto enviado.");
    } else if (type === "json") {
        res.json({ message: "Mensaje en formato JSON enviado." });
    } else {
        res.status(400).send("Tipo de mensaje no soportado.");
    }
});

app.listen(3000, () => {
    console.log("Server runnning in port 3000");
});
