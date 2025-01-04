import { Request, Response, Router } from "express";
import { login, resetPassword, signin } from "../controllers/client.controller";

const client_routes: Router = Router();

client_routes.post("/signin", async (_req: Request, res: Response) => {
    await signin(_req, res);
});

client_routes.post("/login", async (_req: Request, res: Response) => {
    await login(_req, res);
});

client_routes.post("/reset-password", (_req: Request, res: Response) => {
    resetPassword(_req, res);
});

export default client_routes;
