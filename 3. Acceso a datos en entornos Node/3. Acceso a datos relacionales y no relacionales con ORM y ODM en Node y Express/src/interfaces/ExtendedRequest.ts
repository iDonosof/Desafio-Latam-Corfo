import { Request } from "express";
import { Client } from "../models";

export default interface ExtendedRequest extends Request {
    user: Client;
}
