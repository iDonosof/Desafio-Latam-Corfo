import { Request, Response, Router } from "express";
import { createSale, findSaleById } from "../controllers/sale.controller";

import private_routes from "../middlewares/private_routes";

const sale_routes: Router = Router();

sale_routes.post("/", private_routes, (_req: Request, res: Response) => {
    createSale(_req, res);
});

sale_routes.get("/:id", private_routes, (_req: Request, res: Response) => {
    findSaleById(_req, res);
});

export default sale_routes;
