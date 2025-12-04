import type { IProductService, IProduct, NewProduct } from "./interfaces/IProductService";
import { db } from "./database/db";

export class ProductServiceLocal implements IProductService {
    getProducts(): Promise<IProduct[]> {
        return db.products.toArray();
    }
    addProduct(product: NewProduct): Promise<number> {
        return db.products.add(product as IProduct);
    }
    updateProduct(id: number, product: Partial<IProduct>): Promise<number> {
        return db.products.update(id, product);
    }
    deleteProduct(id: number): Promise<void> {
        return db.products.delete(id);
    }
    updateStock(id: number, quantity: number): Promise<number> {
        return db.products.update(id, { stock: quantity });
    }
}

export const productServiceLocal = new ProductServiceLocal();
