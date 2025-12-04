export interface Packaging {
    id: number;
    name: string;
    costPerUnit: number; // Biaya per unit kemasan (misalnya per kotak, per botol, dll.)
    metric: string;
}

export interface IPackagingService {
    getPackagings(): Promise<Packaging[]>;
    addPackaging(packaging: Packaging): Promise<void>;
    updatePackaging(packaging: Packaging): Promise<void>;
    deletePackaging(id: number): Promise<void>;
}
