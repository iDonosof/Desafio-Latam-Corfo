import { GetAll as GetAllProducts } from "../../infrastructure/database/Products.js";
import { GetAll as GetAllSales } from "../../infrastructure/database/Sales.js";

/**
 * Get the top 3 sold products
 * @returns an array of product objects
 */
async function GetBestProducts() {
    const [products, sales] = await Promise.all([GetAllProducts(), GetAllSales()]);
    return products
        .reduce((prevProducts, currProduct) => {
            const productsSold = sales
                .filter((sale) => sale.productId === currProduct.id)
                .map((sale) => sale.quantitySold)
                .reduce((prevNum, currNum) => prevNum + currNum, 0);
            return [
                ...prevProducts,
                {
                    product: currProduct,
                    sold: productsSold,
                },
            ];
        }, [])
        .toSorted((a, b) => b.sold - a.sold)
        .map((group) => group.product)
        .filter((prod, index) => index < 3);
}

/**
 * Get the total sold by category
 * @returns a list of object with category name and the total sold
 */
async function GetSalesByCategory() {
    const [products, sales] = await Promise.all([GetAllProducts(), GetAllSales()]);

    const totalBySale = sales.map(({ productId, quantitySold }) => {
        const price = products.find((prod) => prod.id === productId).price;
        const total = price * quantitySold;
        return {
            productId,
            total,
        };
    });

    return products
        .map(({ id, category }) => {
            const sold = totalBySale
                .filter((sale) => sale.productId === id)
                .map((sale) => sale.total)
                .reduce((prev, curr) => prev + curr, 0);
            return {
                category,
                sold,
            };
        })
        .reduce((prev, curr) => {
            let total = prev[curr.category]?.sold ?? 0;
            total += curr.sold;
            return {
                ...prev,
                [curr.category]: total,
            };
        }, {});
}

/**
 * Generate the report with the stock of each product
 * @returns a list of products and the status of the stock as string
 */
async function GetInventoryReport() {
    const status = {
        low: "Low Stock",
        in: "In Stock",
        enough: "Enough Stock",
    };
    const products = await GetAllProducts();
    return products.map(({ name, stock, category }) => {
        let currentStatus = status.low;
        if (stock > 10 && stock < 20) currentStatus = status.in;
        else if (stock > 20) currentStatus = status.enough;
        return {
            name,
            category,
            stock,
            currentStatus,
        };
    });
}

export { GetBestProducts, GetSalesByCategory, GetInventoryReport, GetAllProducts };
