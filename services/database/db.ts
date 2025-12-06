import Dexie from 'dexie'
import type { IMaterial } from '../interfaces/IMaterialService'
import type { IPackaging } from '../interfaces/IPackagingService'
import type { IProduct } from '../interfaces/IProductService'
import type { IProduction } from '../interfaces/IProductionService'
import type { Table } from 'dexie'

export class LocalDB extends Dexie {
    materials!: Table<IMaterial, number>
    packagings!: Table<IPackaging, number>
    products!: Table<IProduct, number>
    productions!: Table<IProduction, number>

    constructor() {
        super('MyAppLocalDatabase')

        // You MUST increment the version number when changing the schema!
        this.version(5).stores({
            materials: '++id, name, costPerUnit, metric',
            packagings: '++id, name, costPerUnit, metric',
            products: '++id, name, sellingPrice, laborCost',
            productions: '++id, productId, date, quantity'
        })
    }
}

export const db = new LocalDB()