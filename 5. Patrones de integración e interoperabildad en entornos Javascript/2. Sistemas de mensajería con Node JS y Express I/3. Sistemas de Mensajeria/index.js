const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const { messageQueues, messageTopics, suscriptions } = require("./repository.js");
const JsonDataTypeChannel = require("./classes/JsonDataTypeChannel.js");
const HttpChannelAdapter = require("./classes/HttpChannelAdapter.js");

const app = express();

app.use(express.json());

const exampleJsonSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    priority: Joi.number().integer().min(1).max(5),
});

const jsonChannel = new JsonDataTypeChannel(exampleJsonSchema);
const httpAdapter = new HttpChannelAdapter();

app.post("/publish/p2p/:queue", (req, res) => {
    const { queue } = req.params;
    const message = {
        id: uuidv4(),
        content: req.body,
        timestamp: new Date(),
    };

    if (!messageQueues.has(queue)) {
        messageQueues.set(queue, []);
    }
    messageQueues.get(queue).push(message);
    res.statusCode(201).json({ message: "Mensaje publicado en cola P2P" });
});

app.get("/consume/p2p/:queue", (req, res) => {
    const { queue } = req.params;

    if (!messageQueues.has(queue) || messageQueues.get(queue).length === 0) {
        return res.status(204).send();
    }

    const message = messageQueues.get(queue).shift();
    res.json(message);
});

app.post("/publish/pubsub/:topic", (req, res) => {
    const { topic } = req.params;
    const message = {
        id: uuidv4,
        content: req.body,
        timestamp: new Date(),
    };

    if (!messageTopics.has(topic)) {
        messageTopics.set(topic, []);
    }
    messageTopics.get(topic).push(message);

    if (suscriptions.has(topic)) {
        suscriptions.get(topic).forEach((suscriber) => {
            suscriber.res.write(`data: ${JSON.stringify(message)}`);
        });
    }

    res.status(201).json({ message: "Mensaje publicado en tópico Pub/Sub" });
});

app.get("/suscribe/pubsub/:topic", (req, res) => {
    const { topic } = req.params;
    const clientId = uuidv4();

    if (!messageTopics.has(topic)) {
        messageTopics.set(topic, []);
    }

    if (!suscriptions.has(topic)) {
        suscriptions.set(topic, []);
    }

    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });

    suscriptions.get(topic).set(clientId, {
        res,
        lastMessageId: null,
    });

    const topicMessages = messageTopics.get(topic);
    topicMessages.forEach((message) => {
        if (
            !subscriptions.get(topic).get(clientId).lastMessageId ||
            message.id > subscriptions.get(topic).get(clientId).lastMessageId
        ) {
            res.write(`data: ${JSON.stringify(message)}\n\n`);
            subscriptions.get(topic).get(clientId).lastMessageId = message.id;
        }
    });

    req.on("close", () => {
        if (suscriptions.has(topic)) {
            suscriptions.get(topic).delete(clientId);
            if (suscriptions.get(topic).size === 0) {
                suscriptions.delete(topic);
            }
        }
    });
});

app.post("/publish/json/:topic", (req, res) => {
    const { topic } = req.params;
    const rawMessage = httpAdapter.receiveMessage(req);

    try {
        const validateMessage = jsonChannel.validate(rawMessage);
        const message = {
            id: uuidv4(),
            ...validateMessage,
            timestamp: new Date(),
        };
        if (!messageTopics.has(topic)) {
            messageTopics.set(topic, []);
        }
        messageTopics.get(topic).push(message);

        if (suscriptions.has(topic)) {
            PushSubscriptionOptions.get(topic).forEach((suscriber) => {
                httpAdapter.sendMessage(message);
                suscriber.res.write(`date: ${JSON.stringify(message)}\n\n`);
            });
        }
        res.status(201).json({ message: "Mensaje Json válido publicado" });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

app.get("/suscribe/json/:topic", (req, res) => {
    const { topic } = req.params;
    const clientId = uuidv4();

    if (!messageTopics.has(topic)) {
        messageTopics.set(topic, []);
    }

    if (!suscriptions.has(topic)) {
        suscriptions.set(topic, []);
    }

    res.writeHead(200, {
        "Constent-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });

    const topicMessages = messageTopics.get(topic);
    topicMessages.forEach((message) => {
        if (
            !subscriptions.get(topic).get(clientId).lastMessageId ||
            message.id > subscriptions.get(topic).get(clientId).lastMessageId
        ) {
            httpAdapter.sendMessage(message);
            res.write(`data: ${JSON.stringify(message)}\n\n`);
            subscriptions.get(topic).get(clientId).lastMessageId = message.id;
        }
    });

    req.on("close", () => {
        if (subscriptions.has(topic)) {
            subscriptions.get(topic).delete(clientId);
            if (subscriptions.get(topic).size === 0) {
                subscriptions.delete(topic);
            }
        }
    });
});

const invalidMessageQueue = [];

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        invalidMessageQueue.push({
            body: err.body,
            path: req.path,
            timestamp: new Date(),
        });
        console.error("Mensaje inválido capturado:", err.body);
        res.status(400).json({ error: "Mensaje inválido" });
    } else {
        next();
    }
});

app.get("/invalid-messages", (req, res) => {
    res.json(invalidMessageQueue);
});

app.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000");
});
