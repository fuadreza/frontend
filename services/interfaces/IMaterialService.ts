export interface IMaterial {
    id: number;
    name: string;
    costPerUnit: number; // Biaya per unit bahan baku (misalnya per kg, per meter, dll.)
    metric: string;
    stock: number;
    minStock: number;
    notes?: string;
}

export interface IMaterialService {
    getMaterials(): Promise<IMaterial[]>;
    addMaterial(material: IMaterial): Promise<number>;
    updateMaterial(material: IMaterial): Promise<number>;
    deleteMaterial(id: number): Promise<void>;
    updateStock(id: number, quantity: number): Promise<number>;
}
