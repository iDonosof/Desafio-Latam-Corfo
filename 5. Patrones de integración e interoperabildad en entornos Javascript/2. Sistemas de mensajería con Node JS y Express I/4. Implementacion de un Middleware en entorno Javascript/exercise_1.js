const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const app = express();
const router = express.Router();
const messages = [];
const consumers = [];

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use((req, res, next) => {
    console.log("Middleware de nivel de aplicaion ejecutado.");
    next();
});

app.use((err, req, res, next) => {
    console.log("Error: ", err.message);
    res.status(500).send("Error del servidor.");
});

app.use("/api", router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Algo salió mal!");
});

app.post("/send", (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: "El mensaje es requerido" });
    }
    messages.push({
        header: "Mensaje",
        body: message,
    });
    console.log("Mensaje recibido: ", message);
    res.status(200).json({ status: "Mensaje enviado exitosamente" });
});

app.get("/receive", (req, res) => {
    if (messages.length <= 0) {
        return res.status(204).send();
    }
    const message = messages.shift();
    return res.json({ message });
});

router.get("/router", (req, res) => {
    const { type } = req.query;
    switch (type) {
        case "text":
            res.send("Mensaje de texto enviado.");
            break;
        case "json":
            res.json({ message: "Mensaje en formato JSON enviado." });
        default:
            res.status(400).send("Tipo de mensaje no soportado.");
            break;
    }
});

router.use((req, res, next) => {
    console.log("Middleware de nivel de direccionador ejecutado.");
    next();
});

app.listen(3000, () => {
    console.log("Server runnning in port 3000");
});
