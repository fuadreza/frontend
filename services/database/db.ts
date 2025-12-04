import Dexie from 'dexie';
import type { IMaterial } from '../interfaces/IMaterialService';
import type { Packaging } from '../interfaces/IPackagingService';
import type { Product } from '../interfaces/IProductService';
import type { Table } from 'dexie';

export class LocalDB extends Dexie {
    materials!: Table<IMaterial, number>;
    packaging!: Table<Packaging, number>;
    products!: Table<Product, number>;

    constructor() {
        super('MyAppLocalDatabase');

        // You MUST increment the version number when changing the schema!
        this.version(1).stores({
            materials: '++id, name, costPerUnit, metric',
            packaging: '++id, name, costPerUnit, metric',
            products: '++id, name, sellingPrice, laborCost',
        });
    }
}

export const db = new LocalDB();