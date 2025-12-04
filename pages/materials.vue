<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Total Bahan</p>
              <p class="text-2xl font-semibold text-gray-900">{{ materials.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Stok Aman</p>
              <p class="text-2xl font-semibold text-gray-900">{{ safeStock }}</p>
            </div>
          </div>
        </div>

        <!-- Perlu Restock -->
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Perlu Restock</p>
              <p class="text-2xl font-semibold text-gray-900">{{ lowStock }}</p>
            </div>
          </div>
        </div>

        <!-- Nilai Total -->
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Nilai Total</p>
              <p class="text-2xl font-semibold text-gray-900">{{ formatCurrency(totalValue) }}</p>
            </div>
          </div>
        </div>

      </div>

      <!-- Filter & Search -->
      <div class="bg-white p-4 rounded-lg shadow mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari bahan..."
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />

          <select
            v-model="filterStatus"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Semua Status</option>
            <option value="aman">Stok Aman</option>
            <option value="rendah">Stok Rendah</option>
            <option value="habis">Habis</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3">Nama Bahan</th>
              <!-- <th class="px-6 py-3">Kategori</th> -->
              <th class="px-6 py-3">Stok</th>
              <th class="px-6 py-3">Satuan</th>
              <th class="px-6 py-3">Harga/Unit</th>
              <th class="px-6 py-3">Total Nilai</th>
              <th class="px-6 py-3">Status</th>
              <th class="px-6 py-3">Aksi</th>
            </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="material in filteredMaterials" :key="material.id">
              <td class="px-6 py-4 font-medium text-gray-900">{{ material.name }}</td>
              <td class="px-6 py-4 text-center">{{ material.stock }}</td>
              <td class="px-6 py-4 text-gray-500 text-center">{{ material.metric }}</td>
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
                <button @click="editMaterial(material)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                <button @click="deleteMaterial(material.id)" class="text-red-600 hover:text-red-900">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">

        <h3 class="text-lg font-semibold mb-4">
          {{ editMode ? 'Edit Bahan' : 'Tambah Bahan Baru' }}
        </h3>

        <div class="space-y-4">
          <input v-model="form.name" type="text" placeholder="Nama bahan" class="input" />

          <div class="grid grid-cols-2 gap-4">
            <input v-model.number="form.stock" type="number" placeholder="Stok" class="input" />
            <select v-model="form.metric" class="input">
              <option value="kg">kg</option>
              <option value="gram">gram</option>
              <option value="liter">liter</option>
              <option value="pcs">pcs</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <input v-model.number="form.costPerUnit" type="number" placeholder="Harga per unit" class="input" />
            <input v-model.number="form.minStock" type="number" placeholder="Stok minimum" class="input" />
          </div>

          <textarea v-model="form.notes" rows="3" class="input" placeholder="Catatan"></textarea>
        </div>

        <div class="flex justify-end mt-6 space-x-3">
          <button @click="closeModal" class="btn-secondary">Batal</button>
          <button @click="saveMaterial" class="btn-primary">
            {{ editMode ? 'Update' : 'Simpan' }}
          </button>
        </div>

      </div>
    </div>

    <!-- Modern Floating Action Button -->
    <button
      @click="openAddModal"
      class="fixed bottom-8 right-8 group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-out z-10"
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
import type { IMaterial } from "~/services/interfaces/IMaterialService";
import { useMaterialStore } from "~/stores/materialStore";

definePageMeta({ layout: "dashboard" });

const materialStore = useMaterialStore();

const showAddModal = ref(false);
const editMode = ref(false);

const searchQuery = ref("");
const filterCategory = ref("");
const filterStatus = ref("");

onMounted(() => {
  materialStore.fetchMaterials();
});

const emptyForm = (): IMaterial => ({
  id: 0,
  name: "",
  stock: 0,
  minStock: 0,
  metric: "",
  costPerUnit: 0,
  notes: ""
});

const form = ref<IMaterial>(emptyForm());

const materials = ref<IMaterial[]>([]);

// ───────────────────────────────────────────────
// FILTERED DATA
// ───────────────────────────────────────────────

const filteredMaterials = computed(() => {
  return materialStore.materials.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    // const matchCategory = !filterCategory.value || m.category === filterCategory.value;

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

// ───────────────────────────────────────────────
// UTILS
// ───────────────────────────────────────────────

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(value);

const getStatusClass = (m: IMaterial) => {
  if (m.stock === 0) return "bg-red-100 text-red-800";
  if (m.stock <= m.minStock) return "bg-yellow-100 text-yellow-800";
  if (m.stock <= m.minStock * 2) return "bg-blue-100 text-blue-800";
  return "bg-green-100 text-green-800";
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
  form.value = emptyForm();
  editMode.value = false;
  showAddModal.value = true;
};

const editMaterial = (m: IMaterial) => {
  form.value = JSON.parse(JSON.stringify(m)); // fix reactivity clone
  editMode.value = true;
  showAddModal.value = true;
};

const deleteMaterial = (id: number) => {
  if (confirm("Yakin ingin menghapus bahan ini?")) {
    materialStore.deleteMaterial(id);
  }
};

const saveMaterial = () => {
  if (!form.value.name || !form.value.metric) {
    alert("Nama dan satuan tidak boleh kosong.");
    return;
  }

  if (editMode.value) {
    materialStore.updateMaterial(JSON.parse(JSON.stringify(form.value)));
  } else {
    const newId = materialStore.materials.length
      ? Math.max(...materialStore.materials.map((m) => m.id)) + 1
      : 1;
    materialStore.addMaterial({ ...form.value, id: newId });
  }
  closeModal();
};

const closeModal = () => {
  showAddModal.value = false;
  editMode.value = false;
  form.value = emptyForm();
};
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500;
}
.btn-primary {
  @apply px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700;
}
.btn-secondary {
  @apply px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100;
}
</style>
