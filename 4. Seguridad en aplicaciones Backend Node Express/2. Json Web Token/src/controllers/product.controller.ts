import { Request, Response } from "express";
import { Category, Product } from "../models";
import ProductWithCateogry from "../interfaces/ProductWithCateogry";

const findAllProducts = async (_req: Request, res: Response) => {
    const products = (await Product.findAll({ include: { model: Category } })) as ProductWithCateogry[];
    res.json(products);
};

const findProductById = async (_req: Request, res: Response) => {
    const id = parseInt(_req.params.id);
    const product = (await Product.findOne({ include: { model: Category }, where: { id } })) as ProductWithCateogry;
    res.json(product);
};

const createProduct = (_req: Request, res: Response) => {
    res.json({
        message: "Product created",
    });
};

const updateProduct = (_req: Request, res: Response) => {
    res.json({
        message: "Product updated",
    });
};

const deleteProduct = (_req: Request, res: Response) => {
    res.json({
        message: "Product deleted",
    });
};

export { findAllProducts, findProductById, createProduct, updateProduct, deleteProduct };
