export interface IPackaging {
    id: number;
    name: string;
    costPerUnit: number; // Biaya per unit kemasan (misalnya per kotak, per botol, dll.)
    metric: string;
    stock: number;
    minStock: number;
    supplier: string;
    notes?: string | null;
}

export type NewPackaging = Omit<IPackaging, 'id'>;

export interface IPackagingService {
    getPackagings(): Promise<IPackaging[]>;
    addPackaging(packaging: NewPackaging): Promise<number>;
    updatePackaging(id: number, packaging: Partial<IPackaging>): Promise<number>;
    deletePackaging(id: number): Promise<void>;
    updateStock(id: number, quantity: number): Promise<number>;
}
