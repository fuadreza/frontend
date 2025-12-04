import type { IPackaging, IPackagingService, NewPackaging } from "./interfaces/IPackagingService";
import { db } from "./database/db";
import type { PromiseExtended } from "dexie";

export class PackagingServiceLocal implements IPackagingService {
    getPackagings(): Promise<IPackaging[]> {
        return db.packagings.toArray();
    }
    getPackagingsBulk(ids: number[]): PromiseExtended<(IPackaging | undefined)[]> {
        return db.packagings.bulkGet(ids);
    }
    addPackaging(packaging: NewPackaging): Promise<number> {
        return db.packagings.add(packaging as IPackaging);
    }
    updatePackaging(id: number, packaging: Partial<IPackaging>): Promise<number> {
        return db.packagings.update(id, packaging);
    }
    deletePackaging(id: number): Promise<void> {
        return db.packagings.delete(id);
    }
    updateStock(id: number, quantity: number): Promise<number> {
        return db.packagings.update(id, { stock: quantity });
    }
}

export const packagingServiceLocal = new PackagingServiceLocal();