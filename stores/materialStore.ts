import { defineStore } from "pinia";
import type { IMaterial, NewMaterial } from "../services/interfaces/IMaterialService";
import { materialServiceLocal } from "../services/MaterialServiceLocal";

export const useMaterialStore = defineStore('material', {
    state: () => ({
        materials: [] as IMaterial[],
    }),
    actions: {
        async fetchMaterials() {
            this.materials = await materialServiceLocal.getMaterials();
        },
        async addMaterial(material: NewMaterial) {
            await materialServiceLocal.addMaterial(material);
            this.fetchMaterials();
        },
        async updateMaterial(id: number, material: Partial<IMaterial>) {
            await materialServiceLocal.updateMaterial(id, material);
            this.fetchMaterials();
        },
        async deleteMaterial(id: number) {
            await materialServiceLocal.deleteMaterial(id);
            this.fetchMaterials();
        },
        async updateStock(id: number, quantity: number) {
            await materialServiceLocal.updateStock(id, quantity);
            this.fetchMaterials();
        },
    },
})