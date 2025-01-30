import sequelize from "../database/sequelize";
import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from "sequelize";

class ProductSold extends Model<InferAttributes<ProductSold>, InferCreationAttributes<ProductSold>> {
    declare id: CreationOptional<number>;
    declare quantity: number;
    declare unit_price: number;
    declare sale_id: number;
    declare product_id: number;
}

ProductSold.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unit_price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        sale_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "ProductSold",
        timestamps: false,
    }
);

export default ProductSold;
