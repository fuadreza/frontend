import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IProduction, NewProduction } from '~/services/interfaces/IProductionService'
import { productionServiceLocal } from '~/services/ProductionServiceLocal'
import { useProductStore } from './productStore'
import { useMaterialStore } from './materialStore'
import { usePackagingStore } from './packagingStore'

export const useProductionStore = defineStore('production', () => {
    const productions = ref<IProduction[]>([])
    const productStore = useProductStore()

    async function fetchProductions() {
        productions.value = await productionServiceLocal.getProductions()
    }

    async function addProduction(
        production: NewProduction,
        usage?: {
            materials?: { id: number, quantity: number }[],
            packaging?: { id: number, quantity: number }[]
        }
    ) {
        // 1. Save production
        await productionServiceLocal.addProduction(production)

        // 2. Update Product Stock (Output)
        if (productStore.products.length === 0) {
            await productStore.fetchProducts() // Ensure loaded
        }
        await productStore.fetchProductsWithDetails() // Ensure details loaded for recipe fallback

        const product = productStore.products.find(p => p.id === production.productId)

        if (product) {
            const currentStock = product.stock || 0
            const newStock = currentStock + production.quantity
            await productStore.updateStock(production.productId, newStock)
        }

        // 3. Update Material & Packaging Stock (Deduction)
        const materialStore = useMaterialStore()
        const packagingStore = usePackagingStore()

        // Determine items to deduct
        let materialsToDeduct: { id: number, quantity: number }[] = []
        let packagingToDeduct: { id: number, quantity: number }[] = []

        if (usage) {
            // Use provided usage
            materialsToDeduct = usage.materials || []
            packagingToDeduct = usage.packaging || []
        } else {
            // Fallback to standard recipe
            const productDetail = productStore.productsWithDetails.find(p => p.id === production.productId)
            if (productDetail) {
                if (productDetail.materials) {
                    materialsToDeduct = productDetail.materials.map(pm => ({
                        id: pm.material.id!,
                        quantity: pm.quantity * production.quantity
                    }))
                }
                // Only deduct packaging if included in production (or always? usually always if packed)
                // If includePacking is false in production, maybe we shouldn't deduct? 
                // But logically, if you produce, you pack. 'includePacking' in stored data often refers to Cost Calculation inclusion.
                // Let's assume we always deduct if defined in recipe, unless explicitly told otherwise.
                // However, matching the HPP logic: if includePacking is true, we definitely used it.
                if (productDetail.packaging) {
                    packagingToDeduct = productDetail.packaging.map(pp => ({
                        id: pp.packaging.id!,
                        quantity: pp.quantity * production.quantity
                    }))
                }
            }
        }

        // Execute Deductions
        for (const m of materialsToDeduct) {
            // We need current stock to calculate new stock
            // updateStock in materialStore expects NEW TOTAL stock or delta?
            // "updateStock(id: number, quantity: number) { await materialServiceLocal.updateStock(id, quantity); }"
            // Convention usually implies setting the new value. Let's verify materialStore implementation.
            // stores/materialStore.ts -> calls materialServiceLocal.updateStock
            // Let's assume we need to fetch, subtract, and update.
            // For safety, let's look up the material in store first.

            const mat = materialStore.materials.find(x => x.id === m.id)
            if (mat) {
                const current = mat.stock || 0
                const newStock = Math.max(0, current - m.quantity)
                await materialStore.updateStock(m.id, newStock)
            } else {
                // Try fetching if not found (edge case)
                // For now, skip if not found to avoid errors
            }
        }

        for (const p of packagingToDeduct) {
            const pkg = packagingStore.packagings.find(x => x.id === p.id)
            if (pkg) {
                const current = pkg.stock || 0
                const newStock = Math.max(0, current - p.quantity)
                await packagingStore.updateStock(p.id, newStock)
            }
        }

        // Refresh all
        await fetchProductions()
        // Material/Packaging stores refresh themselves on updateStock
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
