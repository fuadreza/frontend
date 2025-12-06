import type { PromiseExtended } from 'dexie'
import type { IProduct } from './IProductService'
import type { IMaterial } from './IMaterialService'
import type { IPackaging } from './IPackagingService'

export interface IProduction {
    id?: number
    productId: number
    date: string
    quantity: number
    hppPerUnit: number
    totalHPP: number
    includePacking: boolean
    productionMaterial?: { id: number, quantity: number }[]
    productionPackaging?: { id: number, quantity: number }[]
}

export interface IProductionWithDetails extends IProduction {
    product: IProduct
    materials: {
        material: IMaterial;
        quantity: number;
    }[];
    packaging: {
        packaging: IPackaging;
        quantity: number;
    }[];
}

export interface NewProduction {
    productId: number
    date: string
    quantity: number
    hppPerUnit: number
    totalHPP: number
    includePacking: boolean
    materials?: { id: number, quantity: number }[]
    packaging?: { id: number, quantity: number }[]
}

export interface IProductionService {
    getProductions(): PromiseExtended<IProduction[]>
    addProduction(production: NewProduction): PromiseExtended<number>
    deleteProduction(id: number): PromiseExtended<void>
}
