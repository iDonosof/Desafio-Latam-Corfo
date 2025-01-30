import sequelize from "../database/sequelize";
import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from "sequelize";
import { generateUUID } from "../utils/uuid";

class Client extends Model<InferAttributes<Client>, InferCreationAttributes<Client>> {
    declare id: CreationOptional<number>;
    declare resource_id: CreationOptional<string>;
    declare first_name: string;
    declare last_name: string;
    declare email: string;
    declare phone_number: string;
    declare status: CreationOptional<number>;
    declare credential_id: number;
}

Client.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        resource_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        credential_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "client",
        timestamps: false,
    }
);

Client.beforeCreate((client: Client) => {
    client.resource_id = generateUUID();
});

export default Client;
