import sequelize from "../database/sequelize";
import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from "sequelize";

class Sale extends Model<InferAttributes<Sale>, InferCreationAttributes<Sale>> {
    declare id: CreationOptional<number>;
    declare sale_date: Date;
    declare sale_time: string;
    declare sale_total: number;
    declare client_id: number;
}

Sale.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sale_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        sale_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        sale_total: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Sale",
        timestamps: false,
    }
);

export default Sale;
