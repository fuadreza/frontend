import type { IMaterial } from "./IMaterialService";
import type { IPackaging } from "./IPackagingService";

// Interface untuk material yang dibutuhkan oleh produk
export interface ProductMaterial {
    materialId: number;
    quantity: number; // Jumlah unit material yang dibutuhkan untuk 1 unit produk
}

// Interface untuk packaging yang dibutuhkan oleh produk
export interface ProductPackaging {
    packagingId: number;
    quantity: number; // Jumlah unit packaging yang dibutuhkan untuk 1 unit produk
}

// Interface utama untuk Produk
export interface IProduct {
    id: number;
    name: string;
    description: string;
    sellingPrice: number; // Harga jual per unit produk
    stock: number;

    // Biaya lain per unit produk (misalnya tenaga kerja, overhead)
    laborCost: number;

    // RELASI: Daftar bahan baku yang dibutuhkan
    productMaterial: ProductMaterial[];

    // RELASI: Daftar kemasan yang dibutuhkan
    productPackaging: ProductPackaging[];

    isActive: boolean;
}

// Extend IProduct for the full, 'joined' view
export interface IProductWithDetails extends IProduct {
    // Overwrite the ID-based references with the full objects
    materials: {
        material: IMaterial;
        quantity: number;
    }[];
    packaging: {
        packaging: IPackaging;
        quantity: number;
    }[];
}

export type NewProduct = Omit<IProduct, 'id'>;

export interface IProductService {
    getProducts(): Promise<IProduct[]>
    addProduct(product: NewProduct): Promise<number>
    updateProduct(id: number, product: Partial<IProduct>): Promise<number>
    deleteProduct(id: number): Promise<void>
    updateStock(id: number, quantity: number): Promise<number>
}
