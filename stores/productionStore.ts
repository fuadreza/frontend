import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IProduction, NewProduction } from '~/services/interfaces/IProductionService'
import { productionServiceLocal } from '~/services/ProductionServiceLocal'
import { useProductStore } from './productStore'

export const useProductionStore = defineStore('production', () => {
    const productions = ref<IProduction[]>([])
    const productStore = useProductStore()

    async function fetchProductions() {
        productions.value = await productionServiceLocal.getProductions()
    }

    async function addProduction(production: NewProduction) {
        // 1. Save production
        await productionServiceLocal.addProduction(production)

        // 2. Update Product Stock
        // Ensure we have the latest product data
        if (productStore.products.length === 0) {
            await productStore.fetchProducts()
        }

        const product = productStore.products.find(p => p.id === production.productId)

        if (product) {
            const currentStock = product.stock || 0
            const newStock = currentStock + production.quantity

            // Update stock via product store to ensure consistency
            // We pass only stock update;
            await productStore.updateStock(production.productId, newStock)
        }

        await fetchProductions()
    }

    async function deleteProduction(id: number) {
        await productionServiceLocal.deleteProduction(id)
        await fetchProductions()
    }

    return {
        productions,
        fetchProductions,
        addProduction,
        deleteProduction
    }
})
