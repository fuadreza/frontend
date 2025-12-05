import type { IProduct, IProductWithDetails } from '~/services/interfaces/IProductService';
// Asumsikan MaterialCost dan PackagingCost sudah didefinisikan

/**
 * Menghitung total biaya bahan baku untuk satu unit produk.
 * @param productWithDetails produk yang akan dihitung.
 * @returns Total biaya bahan baku per unit produk
 */
function calculateMaterialCost(
    productWithDetails: IProductWithDetails,
): number {
    let totalCost = 0;
    for (const item of productWithDetails.materials) {
        totalCost += (item.quantity * item.material.costPerUnit);
    }
    return totalCost;
}

/**
 * Menghitung total biaya kemasan untuk satu unit produk.
 * @param productWithDetails produk yang akan dihitung.
 * @returns Total biaya kemasan per unit produk
 */
function calculatePackagingCost(
    productWithDetails: IProductWithDetails,
): number {
    let totalCost = 0;
    for (const item of productWithDetails.packaging) {
        totalCost += (item.quantity * item.packaging.costPerUnit);
    }
    return totalCost;
}

/**
 * Menghitung Harga Pokok Produksi (HPP) dan Margin.
 * @param productWithDetails produk yang akan dihitung.
 * @returns Objek yang berisi HPP dan Margin.
 */
export function calculateProductMetrics(
    productWithDetails: IProductWithDetails,
) {
    // 1. Hitung Biaya Material
    const materialCost = calculateMaterialCost(productWithDetails);

    // 2. Hitung Biaya Packaging
    const packagingCost = calculatePackagingCost(productWithDetails);

    // 3. Hitung HPP (Cost of Goods Sold/COGS)
    // HPP = Biaya Material + Biaya Packaging + Biaya Tenaga Kerja (Labor Cost)
    const HPP = materialCost + packagingCost + productWithDetails.laborCost;

    // 4. Hitung Margin Laba Kotor (Gross Margin) dalam persen
    // Margin = Harga Jual - HPP
    const margin = productWithDetails.sellingPrice - HPP;
    const marginPercentage = (margin / productWithDetails.sellingPrice) * 100;

    return {
        HPP: HPP,
        margin: margin,
        marginPercentage: marginPercentage,
    };
}
