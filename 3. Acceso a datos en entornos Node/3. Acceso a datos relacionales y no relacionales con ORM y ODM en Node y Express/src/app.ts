import express, { Request, Response } from "express";
import { DEFAULT_PORT } from "./config/enviroment";
import client_routes from "./routes/client.routes";
import product_routes from "./routes/product.routes";
import sale_routes from "./routes/sale.routes";
import sync_database from "./models";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Vet Store Documentation",
            version: "1.0.0",
            description: "API Documentation"
        },
        servers: [
            {
                url: `http://localhost:${DEFAULT_PORT}`
            }
        ]
    },
    apis: ["./routes/*.ts"]
};

const swaggerDoc = swaggerJsDoc(swaggerOptions);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

const v1 = express.Router();

app.use("/api/v1", v1);
v1.use("/clients", client_routes);
v1.use("/products", product_routes);
v1.use("/sales", sale_routes);

v1.get("/ping", (_req: Request, res: Response) => {
    res.json({ message: "Welcome to the API" });
});

app.listen(DEFAULT_PORT, () => {
    console.log(`Server running on port ${DEFAULT_PORT}`);
    sync_database().catch((err: unknown) => {
        console.error("Failed to sync database", err);
    });
});

export default app;
