import { GetAll as GetAllProducts } from "../../infrastructure/database/Products.js";
import { GetAll as GetAllSales } from "../../infrastructure/database/Sales.js";
import { GetAll as GetAllClients } from "../../infrastructure/database/Clients.js";
import { DEFAULT_VIP_TOTAL } from "./common/Constants.js";

/**
 * Returns a list with the objects clients and the total spent
 * @returns a list of clients and the total spent
 */
async function GetClientsVip() {
    const [clients, products, sales] = await Promise.all([GetAllClients(), GetAllProducts(), GetAllSales()]);
    const totalBySale = sales.map(({ productId, quantitySold, clientId }) => {
        const price = products.find((prod) => prod.id === productId).price;
        const total = price * quantitySold;
        return {
            clientId,
            total,
        };
    });

    return clients
        .map((client) => {
            const total = totalBySale.filter((sale) => sale.clientId === client.id).reduce((prev, curr) => curr.total + prev, 0);
            return {
                ...client,
                totalSpent: total,
            };
        })
        .filter((client) => client.totalSpent > DEFAULT_VIP_TOTAL);
}

export { GetClientsVip, GetAllClients };
