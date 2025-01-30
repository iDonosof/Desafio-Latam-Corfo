import { Request, Response, Router } from "express";
import { login, resetPassword, signin, disableUser } from "../controllers/client.controller";

const client_routes: Router = Router();

client_routes.post("/signin", async (_req: Request, res: Response) => {
    await signin(_req, res);
});

client_routes.post("/login", async (_req: Request, res: Response) => {
    await login(_req, res);
});

client_routes.put("/reset-password", async (_req: Request, res: Response) => {
    await resetPassword(_req, res);
});

client_routes.delete(":resource_id", async(_req: Request, res: Response) => {
    await disableUser(_req, res);
});

export default client_routes;
