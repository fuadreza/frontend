import type { PromiseExtended } from 'dexie'

export interface IProduction {
    id?: number
    productName: string
    date: string
    quantity: number
    hppPerUnit: number
    totalHPP: number
    includePacking: boolean
}

export interface NewProduction {
    productName: string
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
