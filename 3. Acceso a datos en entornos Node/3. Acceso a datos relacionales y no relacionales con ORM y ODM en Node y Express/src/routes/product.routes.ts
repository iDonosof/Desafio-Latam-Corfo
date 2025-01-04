import { Request, Response, Router } from "express";
import {
    findAllProducts,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller";

import private_routes from "../middlewares/private_routes";

const product_routes: Router = Router();

product_routes.get("/", async (_req: Request, res: Response) => {
    await findAllProducts(_req, res);
});

product_routes.get("/:id", async (_req: Request, res: Response) => {
    await findProductById(_req, res);
});

product_routes.post("/", private_routes, (_req: Request, res: Response) => {
    createProduct(_req, res);
});

product_routes.put("/:id", private_routes, (_req: Request, res: Response) => {
    updateProduct(_req, res);
});

product_routes.delete("/:id", private_routes, (_req: Request, res: Response) => {
    deleteProduct(_req, res);
});

export default product_routes;
