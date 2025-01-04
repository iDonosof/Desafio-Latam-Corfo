import { Request, Response } from "express";
import { Credential, Client } from "../models";
import sequelize from "../database/sequelize";
import { generateUUID } from "../utils/uuid";
import { compare, encrypt } from "../utils/encrypt";
import { generate_token } from "../utils/jwt";
import CredentialWithClient from "../interfaces/CredentialWithClient";

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

    const user = await Credential.findOne({
        include: { model: Client },
        where: { username },
    }) as CredentialWithClient | null;

    if (!user) {
        res.status(401).json({
            message: "Invalid username or password",
        });

        return
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

const resetPassword = (_req: Request, res: Response) => {
    res.json({
        message: "Reset password",
    });
};

export { signin, login, resetPassword };
