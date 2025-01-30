import sequelize from "../database/sequelize";
import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from "sequelize";

class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    declare id: CreationOptional<number>;
    declare category_name: string;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "category",
        timestamps: false,
    }
);

export default Category;
