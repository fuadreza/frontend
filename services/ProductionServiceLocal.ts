import { db } from './database/db'
import type { IProductionService, NewProduction } from './interfaces/IProductionService'

export const productionServiceLocal: IProductionService = {
    getProductions() {
        return db.productions.toArray()
    },
    addProduction(production: NewProduction) {
        return db.productions.add(production)
    },
    deleteProduction(id: number) {
        return db.productions.delete(id)
    }
}
