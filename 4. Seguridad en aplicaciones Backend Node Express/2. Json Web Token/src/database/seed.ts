import sync_database, { Category, Product, Credential, Client } from "../models";
import sequelize from "./sequelize";
import { encrypt } from "../utils/encrypt";
import { generateUUID } from "../utils/uuid";

async function seed() {
    await sync_database(true);

    const categories = await Category.bulkCreate([
        { category_name: "Comida de perro" },
        { category_name: "Comida de Gato" },
        { category_name: "Juguetes para perro" },
        { category_name: "Juguetes para gato" },
    ]);

    await Product.bulkCreate([
        {
            product_name: "Dog Chow Adulto 18kg",
            product_description: "",
            product_price: 38999,
            category_id: categories[0].id,
            stock: 10,
        },
        {
            product_name: "Cat Chow Adulto 8kg",
            product_description: "",
            product_price: 25990,
            category_id: categories[1].id,
            stock: 10,
        },
        {
            product_name: "Peluche Perro Interactivo",
            product_description: "",
            product_price: 20990,
            category_id: categories[2].id,
            stock: 10,
        },
        {
            product_name: "Peluche Gato Interactivo",
            product_description: "",
            product_price: 20990,
            category_id: categories[3].id,
            stock: 10,
        },
    ]);
    let transaction;

    try {
        transaction = await sequelize.transaction();
        const credential: Credential = await Credential.create({
            username: "test",
            password: await encrypt("asd123asd"),
        });

        await Client.create({
            first_name: "test",
            resource_id: generateUUID(),
            last_name: "tester",
            email: "",
            phone_number: "",
            credential_id: credential.id,
        });

        await transaction.commit();
    } catch (error) {
        console.error("Failed to create user", error);
        await transaction?.rollback();
    }
}

seed()
    .then(() => {
        console.log("Seeding completed");
    })
    .catch((error: unknown) => {
        console.error("Failed to seed", error);
    });
