import { defineStore } from "pinia";
import type { IPackaging, NewPackaging } from "../services/interfaces/IPackagingService";
import { packagingServiceLocal } from "../services/PackagingServiceLocal";

export const usePackagingStore = defineStore("packaging", {
    state: () => ({
        packagings: [] as IPackaging[],
    }),
    actions: {
        async fetchPackagings() {
            this.packagings = await packagingServiceLocal.getPackagings();
        },
        async addPackaging(packaging: NewPackaging) {
            packagingServiceLocal.addPackaging(packaging);
            this.fetchPackagings();
        },
        async updatePackaging(id: number, packaging: Partial<IPackaging>) {
            await packagingServiceLocal.updatePackaging(id, packaging);
            this.fetchPackagings();
        },
        async deletePackaging(id: number) {
            await packagingServiceLocal.deletePackaging(id);
            this.fetchPackagings();
        },
        async updateStock(id: number, quantity: number) {
            await packagingServiceLocal.updateStock(id, quantity);
            this.fetchPackagings();
        },
    },
});