import { Request, Response } from "express";

import { validateStringInputs } from "../utils/validations";

import { Category } from "../models";

import { CATEGORY_STATUS } from "../common/status";

export const getCategories = async (_: Request, res: Response): Promise<void> => {
    try {
        const categories = await Category.findAll({ where: { status: CATEGORY_STATUS.ENABLED.id } });

        res.status(200).json(categories);
    } catch {
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};

export const getCategory = async (req: Request, res: Response): Promise<void> => {
    const { resource_id } = req.params;
    if (!resource_id) {
        res.status(400).json({ error: "Missing id" });
        return;
    }
    try {
        const category = await Category.findOne({ where: { resource_id } });

        if (!category) {
            res.status(404).json({ error: "Category not found" });
            return;
        }

        res.json(category);
    } catch {
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
    const { name, description, status = CATEGORY_STATUS.ENABLED.id }: Category = req.body;

    try {
        validateStringInputs({ name, description });
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).json({ error: e.message });
        }
        return;
    }

    try {
        await Category.create({ name, description, status });
        res.status(201).json({ message: "Category created successfully" });
    } catch {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    const { resource_id } = req.params;
    const { name, description, status = CATEGORY_STATUS.ENABLED.id }: Category = req.body;

    if (!resource_id) {
        res.status(400).json({ error: "Missing id" });
        return;
    }

    try {
        validateStringInputs({ name, description });
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).json({ error: e.message });
        }
        return;
    }

    let category: Category | null = null;

    try {
        category = await Category.findOne({ where: { resource_id } });

        if (!category) {
            res.status(404).json({ error: "Category not found" });
            return;
        }

        category.name = name;
        category.description = description;
        category.status = status;
        await category.save();

        res.status(200).json({ message: "Category updated successfully" });
    } catch {
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    const { resource_id } = req.params;

    if (!resource_id) {
        res.status(400).json({ error: "Missing id" });
        return;
    }
    let category: Category | null = null;

    try {
        category = await Category.findOne({ where: { resource_id } });

        if (!category) {
            res.status(404).json({ error: "Category not found" });
            return;
        }

        category.status = CATEGORY_STATUS.DISABLED.id;
        await category.save();

        res.status(200).json({ message: "Category deleted successfully" });
    } catch {
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};
