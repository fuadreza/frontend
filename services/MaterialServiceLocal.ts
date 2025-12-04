import type { IMaterial, IMaterialService, NewMaterial } from "./interfaces/IMaterialService";
import { db } from "./database/db";

export class MaterialServiceLocal implements IMaterialService {
    getMaterials(): Promise<IMaterial[]> {
        return db.materials.toArray();
    }
    addMaterial(material: NewMaterial): Promise<number> {
        return db.materials.add(material as IMaterial);
    }
    updateMaterial(id: number, material: Partial<IMaterial>): Promise<number> {
        return db.materials.update(id, material);
    }
    deleteMaterial(id: number): Promise<void> {
        return db.materials.delete(id);
    }
    updateStock(id: number, quantity: number): Promise<number> {
        return db.materials.update(id, { stock: quantity });
    }
}

export const materialServiceLocal = new MaterialServiceLocal();
