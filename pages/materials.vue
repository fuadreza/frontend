<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-800 dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Total Bahan</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100 dark:text-gray-100">{{ materialStore.materials.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Stok Aman</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100 dark:text-gray-100">{{ safeStock }}</p>
            </div>
          </div>
        </div>

        <!-- Perlu Restock -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Perlu Restock</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100 dark:text-gray-100">{{ lowStock }}</p>
            </div>
          </div>
        </div>

        <!-- Nilai Total -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Nilai Total</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100 dark:text-gray-100">{{ formatCurrency(totalValue) }}</p>
            </div>
          </div>
        </div>

      </div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari bahan..."
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
          >

          <select
            v-model="filterStatus"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
          >
            <option value="">Semua Status</option>
            <option value="aman">Stok Aman</option>
            <option value="rendah">Stok Rendah</option>
            <option value="habis">Habis</option>
          </select>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 dark:bg-gray-800 shadow dark:shadow-gray-900/50 transition-colors duration-300 rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th class="px-6 py-3 text-gray-500 dark:text-gray-400 ">Nama Bahan</th>
              <th class="px-6 py-3 text-gray-500 dark:text-gray-400 ">Stok</th>
              <th class="px-6 py-3 text-gray-500 dark:text-gray-400 ">Satuan</th>
              <th class="px-6 py-3 text-gray-500 dark:text-gray-400 ">Harga/Unit</th>
              <th class="px-6 py-3 text-gray-500 dark:text-gray-400 ">Total Nilai</th>
              <th class="px-6 py-3 text-gray-500 dark:text-gray-400 ">Status</th>
              <th class="px-6 py-3 text-gray-500 dark:text-gray-400 ">Aksi</th>
            </tr>
          </thead>

          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200">
            <tr v-for="material in filteredMaterials" :key="material.id">
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 dark:text-gray-100">{{ material.name }}</td>
              <td class="px-6 py-4 text-center">{{ material.stock }}</td>
              <td class="px-6 py-4 text-gray-500 dark:text-gray-400 text-center">{{ material.metric }}</td>
              <td class="px-6 py-4 text-center">
                {{ formatCurrency(material.costPerUnit) }}
              </td>
              <td class="px-6 py-4 font-medium text-center">
                {{ formatCurrency(material.stock * material.costPerUnit) }}
              </td>

              <td class="px-6 py-4 text-center">
                <span :class="['px-2 py-1 text-xs rounded-full text', getStatusClass(material)]">
                  {{ getStatusText(material) }}
                </span>
              </td>

              <td class="px-6 py-4 space-x-3 text-center">
                <button class="text-indigo-600 hover:text-indigo-900" @click="editMaterial(material)">Edit</button>
                <button class="text-red-600 hover:text-red-900" @click="deleteMaterial(material.id)">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity" @click="closeModal"/>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all max-w-2xl w-full relative z-20">
          <div class="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              {{ editMode ? 'Edit Bahan' : 'Tambah Bahan Baru' }}
            </h3>
          </div>
          
          <div class="px-6 py-4 max-h-96 overflow-y-auto">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Bahan</label>
                <input
                  v-model="formData.name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                  placeholder="Contoh: Gula Pasir"
                >
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stok</label>
                  <input
                    v-model.number="formData.stock"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                    placeholder="0"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Satuan</label>
                  <select
                    v-model="formData.metric"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                  >
                    <option value="kg">kg</option>
                    <option value="gram">gram</option>
                    <option value="liter">liter</option>
                    <option value="pcs">pcs</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Harga per Unit</label>
                  <input
                    v-model.number="formData.costPerUnit"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                    placeholder="0"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stok Minimum</label>
                  <input
                    v-model.number="formData.minStock"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                    placeholder="0"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Catatan</label>
                <textarea
                  v-model="formData.notes"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                  placeholder="Catatan tambahan..."
                />
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 px-6 py-4 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700">
            <button
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              @click="closeModal"
            >
              Batal
            </button>
            <button
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
              @click="saveMaterial"
            >
              {{ editMode ? 'Update' : 'Simpan' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
      class="fixed bottom-8 right-8 group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-out z-10"
      @click="openAddModal"
    >
      <svg class="h-6 w-6 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      <span class="font-semibold text-sm whitespace-nowrap">Tambah Bahan</span>
    </button>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { IMaterial, NewMaterial } from "~/services/interfaces/IMaterialService";
import { useMaterialStore } from "~/stores/materialStore";

definePageMeta({ layout: "dashboard" });

const materialStore = useMaterialStore();

const showAddModal = ref(false);
const editMode = ref(false);

const searchQuery = ref("");
const filterStatus = ref("");

onMounted(() => {
  materialStore.fetchMaterials();
});

const emptyForm = (): NewMaterial => ({
  name: "",
  stock: 0,
  minStock: 0,
  metric: "",
  costPerUnit: 0,
  notes: ""
});

const formData = ref<Partial<IMaterial>>(emptyForm());

const filteredMaterials = computed(() => {
  return materialStore.materials.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    let matchStatus = true;
    if (filterStatus.value === "aman") matchStatus = m.stock > m.minStock * 2;
    if (filterStatus.value === "rendah") matchStatus = m.stock <= m.minStock * 2 && m.stock > 0;
    if (filterStatus.value === "habis") matchStatus = m.stock === 0;

    return matchSearch && matchStatus;
  });
});

const safeStock = computed(() => materialStore.materials.filter((m) => m.stock > m.minStock * 2).length);
const lowStock = computed(() => materialStore.materials.filter((m) => m.stock <= m.minStock * 2 && m.stock > 0).length);

const totalValue = computed(() => {
  return materialStore.materials.reduce((sum, m) => sum + m.stock * m.costPerUnit, 0);
});

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(value);

const getStatusClass = (m: IMaterial) => {
  if (m.stock === 0) return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300";
  if (m.stock <= m.minStock) return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300";
  if (m.stock <= m.minStock * 2) return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
  return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
};

const getStatusText = (m: IMaterial) => {
  if (m.stock === 0) return "Habis";
  if (m.stock <= m.minStock) return "Kritis";
  if (m.stock <= m.minStock * 2) return "Rendah";
  return "Aman";
};

// ───────────────────────────────────────────────
// CRUD
// ───────────────────────────────────────────────

const openAddModal = () => {
  formData.value = emptyForm();
  editMode.value = false;
  showAddModal.value = true;
};

const editMaterial = (m: IMaterial) => {
  formData.value = JSON.parse(JSON.stringify(m)); // fix reactivity clone
  editMode.value = true;
  showAddModal.value = true;
};

const deleteMaterial = (id: number) => {
  if (confirm("Yakin ingin menghapus bahan ini?")) {
    materialStore.deleteMaterial(id);
  }
};

const saveMaterial = () => {
  if (!formData.value.name || !formData.value.metric) {
    alert("Nama dan satuan tidak boleh kosong.");
    return;
  }

  if (editMode.value) {
    if (formData.value.id) {
      materialStore.updateMaterial(formData.value.id, formData.value);
    }
  } else {
    materialStore.addMaterial({...formData.value as NewMaterial});
  }
  closeModal();
};

const closeModal = () => {
  showAddModal.value = false;
  editMode.value = false;
  formData.value = emptyForm();
};
</script>


