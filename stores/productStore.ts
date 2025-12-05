import { defineStore } from "pinia";
import type { IProduct, IProductWithDetails, NewProduct } from "~/services/interfaces/IProductService";
import { productServiceLocal } from "~/services/ProductServiceLocal";
import { materialServiceLocal } from "~/services/MaterialServiceLocal";
import { packagingServiceLocal } from "~/services/PackagingServiceLocal";

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [] as IProduct[],
        productsWithDetails: [] as IProductWithDetails[],
    }),
    actions: {
        async fetchProducts() {
            this.products = await productServiceLocal.getProducts();
        },
        async fetchProductsWithDetails() {
            const products = await productServiceLocal.getProducts();
            const tempProducts = [] as IProductWithDetails[];
            await Promise.all(products.map(async product => {
                // Extract IDs for efficient bulk retrieval
                const materialIds = product.productMaterial ? product.productMaterial.map(material => material.materialId) : [];
                const packagingIds = product.productPackaging ? product.productPackaging.map(packaging => packaging.packagingId) : [];
                const [materials, packagings] = await Promise.all([
                    materialServiceLocal.getMaterialsBulk(materialIds),
                    packagingServiceLocal.getPackagingsBulk(packagingIds)
                ]);

                // Map materials and packaging to productMaterial and productPackaging
                const productMaterial = product.productMaterial ? product.productMaterial.map(material => ({
                    material: materials?.find(m => m && m.id === material.materialId)!,
                    quantity: material.quantity
                })) : [];
                const productPackaging = product.productPackaging ? product.productPackaging.map(packaging => ({
                    packaging: packagings?.find(p => p && p.id === packaging.packagingId)!,
                    quantity: packaging.quantity
                })) : [];

                // Create product with detail
                const tempProduct: IProductWithDetails = {
                    ...product,
                    materials: productMaterial,
                    packaging: productPackaging,
                };

                tempProducts.push(tempProduct);
            }));
            this.productsWithDetails = tempProducts;
        },
        async addProduct(product: NewProduct) {
            await productServiceLocal.addProduct({
                ...product,
                productMaterial: product.productMaterial.map(material => ({
                    materialId: material.materialId,
                    quantity: material.quantity
                })),
                productPackaging: product.productPackaging.map(packaging => ({
                    packagingId: packaging.packagingId,
                    quantity: packaging.quantity
                }))
            });
            this.fetchProductsWithDetails();
        },
        async updateProduct(id: number, product: Partial<IProduct>) {
            await productServiceLocal.updateProduct(id, {
                ...product,
                productMaterial: product.productMaterial?.map(material => ({
                    materialId: material.materialId,
                    quantity: material.quantity
                })),
                productPackaging: product.productPackaging?.map(packaging => ({
                    packagingId: packaging.packagingId,
                    quantity: packaging.quantity
                }))
            });
            this.fetchProductsWithDetails();
        },
        async deleteProduct(id: number) {
            await productServiceLocal.deleteProduct(id);
            this.fetchProductsWithDetails();
        },
    },
})