import sequelize from "../database/sequelize";
import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
} from "sequelize";

class Credential extends Model<InferAttributes<Credential>, InferCreationAttributes<Credential>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare password: string;
    declare last_login: CreationOptional<Date>;
}

Credential.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_login: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "credential",
        timestamps: false,
    }
);

export default Credential;
