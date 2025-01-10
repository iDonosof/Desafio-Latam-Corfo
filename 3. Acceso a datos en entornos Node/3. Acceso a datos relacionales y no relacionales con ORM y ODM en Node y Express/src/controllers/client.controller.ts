import { Request, Response } from "express";
import { Credential, Client } from "../models";
import sequelize from "../database/sequelize";
import { generateUUID } from "../utils/uuid";
import { compare, encrypt } from "../utils/encrypt";
import { generate_token } from "../utils/jwt";
import CredentialWithClient from "../interfaces/CredentialWithClient";
import { CLIENT_STATUS } from "../common/constants";

const signin = async (_req: Request, res: Response) => {
    const { username, password } = _req.body as Credential;
    const { first_name, last_name, email, phone_number } = _req.body as Client;
    const resource_id: string = generateUUID();
    const encrypted_password: string = await encrypt(password);
    let transaction;

    try {
        transaction = await sequelize.transaction();
        const credential: Credential = await Credential.create(
            {
                username,
                password: encrypted_password,
            },
            { transaction }
        );

        const client: Client = await Client.create(
            {
                first_name,
                resource_id,
                last_name,
                email,
                phone_number,
                status: CLIENT_STATUS.ENABLED,
                credential_id: credential.id,
            },
            { transaction }
        );

        await transaction.commit();

        res.status(201).json(client);
    } catch (error) {
        console.error("Failed to create user", error);
        await transaction?.rollback();
        res.status(500).json({
            message: "Failed to create user",
        });
    }
};

const login = async (_req: Request, res: Response) => {
    const { username, password } = _req.body as Credential;

    const user = (await Credential.findOne({
        include: { model: Client },
        where: { username },
    })) as CredentialWithClient | null;

    if (!user) {
        res.status(401).json({
            message: "Invalid username or password",
        });

        return;
    }

    if (user.client.status !== CLIENT_STATUS.ENABLED) {
        res.status(401).json({
            message: "Account blocked or disabled",
        });

        return;
    }

    if (!(await compare(password, user.password))) {
        res.status(401).json({
            message: "Invalid username or password",
        });

        return;
    }

    const token = generate_token(user.client.resource_id);

    res.json({
        token,
    });
};

const resetPassword = async (_req: Request, res: Response) => {
    const { username, password } = _req.body as Credential;
    const credential: Credential | null = await Credential.findOne({ where: { username } });

    if (!credential) {
        res.status(400).json({ message: "User not found" });
        return;
    }

    await credential.update({ password });
    await credential.save();

    res.json({
        message: "Password updated",
    });
};

const disableUser = async (_req: Request, res: Response) => {
    const { resource_id } = _req.params;

    const client = await Client.findOne({ where: { resource_id } });

    if (!client) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    await client.update({ status: CLIENT_STATUS.DISABLED });
    await client.save();

    res.json({
        message: "User disabled",
    });
};

export { signin, login, resetPassword, disableUser };
