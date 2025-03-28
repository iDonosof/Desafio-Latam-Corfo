import sequelize from "../database/sequelize";
import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from "sequelize";

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    declare id: CreationOptional<number>;
    declare product_name: string;
    declare product_description: string;
    declare product_price: number;
    declare category_id: number;
    declare stock: number;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "product",
        timestamps: false,
    }
);

export default Product;
