import type { PromiseExtended } from 'dexie'

export interface IProduction {
    id?: number
    productId: number
    date: string
    quantity: number
    hppPerUnit: number
    totalHPP: number
    includePacking: boolean
}

export interface NewProduction {
    productId: number
    date: string
    quantity: number
    hppPerUnit: number
    totalHPP: number
    includePacking: boolean
}

export interface IProductionService {
    getProductions(): PromiseExtended<IProduction[]>
    addProduction(production: NewProduction): PromiseExtended<number>
    deleteProduction(id: number): PromiseExtended<void>
}
