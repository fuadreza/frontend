import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IProduction, NewProduction } from '~/services/interfaces/IProductionService'
import { productionServiceLocal } from '~/services/ProductionServiceLocal'

export const useProductionStore = defineStore('production', () => {
    const productions = ref<IProduction[]>([])

    async function fetchProductions() {
        productions.value = await productionServiceLocal.getProductions()
    }

    async function addProduction(production: NewProduction) {
        await productionServiceLocal.addProduction(production)
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
