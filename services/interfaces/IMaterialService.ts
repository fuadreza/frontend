import type { PromiseExtended } from "dexie";

export interface IMaterial {
    id: number;
    name: string;
    costPerUnit: number; // Biaya per unit bahan baku (misalnya per kg, per meter, dll.)
    metric: string;
    stock: number;
    minStock: number;
    notes?: string | null;
}

// Interface for new materials (ID is not required)
export type NewMaterial = Omit<IMaterial, 'id'>;

export interface IMaterialService {
    getMaterials(): Promise<IMaterial[]>;
    getMaterialsBulk(ids: number[]): PromiseExtended<(IMaterial | undefined)[]>;
    addMaterial(material: NewMaterial): Promise<number>;
    updateMaterial(id: number, material: Partial<IMaterial>): Promise<number>;
    deleteMaterial(id: number): Promise<void>;
    updateStock(id: number, quantity: number): Promise<number>;
}
