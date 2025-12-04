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
export interface Product {
    id: number;
    name: string;
    sellingPrice: number; // Harga jual per unit produk

    // Biaya lain per unit produk (misalnya tenaga kerja, overhead)
    laborCost: number;

    // RELASI: Daftar bahan baku yang dibutuhkan
    materials: ProductMaterial[];

    // RELASI: Daftar kemasan yang dibutuhkan
    packaging: ProductPackaging[];
}

export interface IProductService {
    getProducts(): Promise<Product[]>
    addProduct(product: Product): Promise<void>
    updateProduct(product: Product): Promise<void>
    deleteProduct(id: number): Promise<void>
}
