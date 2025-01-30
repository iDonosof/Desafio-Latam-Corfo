import { Sequelize } from "sequelize";
import { DB_PASSWORD, DB_USER, DB_HOST, DB_NAME } from "../config/enviroment";

export default new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres",
});
