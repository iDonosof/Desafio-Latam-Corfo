import express, { Request, Response } from "express";
import { DEFAULT_PORT } from "./config/enviroment";
import client_routes from "./routes/client.routes";
import product_routes from "./routes/product.routes";
import sale_routes from "./routes/sale.routes";
import sync_database from "./models";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
