import sequelize from "../database/sequelize";
import { Request, Response } from "express";
import { Sale, ProductSold } from "../models";
import { get_current_time } from "../utils/date";
import ExtendedRequest from "../interfaces/ExtendedRequest";
import { Client } from "../models";

type ProductSoldType = {
    quantity: number;
    unit_price: number;
    product_id: number;
};

const findSaleById = async (_req: Request, res: Response) => {
    const id = parseInt(_req.params.id);
    const sale = await Sale.findByPk(id, { include: ProductSold });
    res.json(sale);
};

const createSale = async (_req: Request, res: Response) => {
    const { products }: { products: ProductSoldType[] } = _req.body as { products: ProductSoldType[] };
    const { id }: Client = (_req as ExtendedRequest).user;

    const saleTotal = products.reduce((total, product) => total + product.quantity * product.unit_price, 0);

    let transaction;
    try {
        transaction = await sequelize.transaction();
        const sale = await Sale.create(
            {
                sale_date: new Date(),
                sale_time: get_current_time(),
                sale_total: saleTotal,
                client_id: id,
            },
            { transaction }
        );

        await ProductSold.bulkCreate(
            products.map(({ quantity, unit_price, product_id }: ProductSoldType) => ({
                quantity,
                unit_price,
                sale_id: sale.id,
                product_id,
            })),
            { transaction }
        );
        await transaction.commit();
        res.json({
            sale,
        });
    } catch (err) {
        console.log(err);
        await transaction?.rollback();
        res.status(500).json({
            message: "Internal server error",
        });
        return;
    }
};

export { createSale, findSaleById };
