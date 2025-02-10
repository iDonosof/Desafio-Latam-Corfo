import express, { Express, Router } from "express";
import { DEFAULT_PORT } from "./config/enviroment";
import sync_database from "./models";
import userRouter from "./routes/user.route";

const app: Express = express();
const rootRouter: Router = Router();
app.use(express.json());

app.use("/api/v1", rootRouter);
rootRouter.use("/user", userRouter);

app.listen(DEFAULT_PORT, (): void => {
    console.log(`Server is running on port ${DEFAULT_PORT}`);
    sync_database();
});
