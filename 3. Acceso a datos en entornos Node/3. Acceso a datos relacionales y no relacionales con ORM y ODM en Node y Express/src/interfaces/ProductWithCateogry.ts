import { Product, Category } from "../models";

export default interface ProductWithCateogry extends Product {
    category: Category;
}