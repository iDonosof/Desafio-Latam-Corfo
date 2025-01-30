import Credential from "./credential.model";
import Client from "./client.model";
import Category from "./category.model";
import Product from "./product.model";
import Sale from "./sale.model";
import ProductSold from "./product_sold.model";
import sequelize from "../database/sequelize";

Credential.hasOne(Client, {
    foreignKey: "credential_id",
});

Client.belongsTo(Credential, {
    foreignKey: "credential_id",
});

Client.hasMany(Sale, {
    foreignKey: "client_id",
});

Sale.belongsTo(Client, {
    foreignKey: "client_id",
});

Sale.hasMany(ProductSold, {
    foreignKey: "sale_id",
});

Category.hasMany(Product, {
    foreignKey: "category_id",
});

Product.belongsTo(Category, {
    foreignKey: "category_id",
});

Product.hasMany(ProductSold, {
    foreignKey: "product_id",
});

ProductSold.belongsTo(Sale, {
    foreignKey: "sale_id",
});

ProductSold.belongsTo(Product, {
    foreignKey: "product_id",
});

const sync_database = async (force: boolean = false) => {
    try {
        await sequelize.sync({ force });
        console.log("Tables created");
    } catch (err: unknown) {
        throw new Error("Failed to sync database. " + String(err));
    }
};

export default sync_database;
export { Credential, Client, Category, Product, Sale, ProductSold };
