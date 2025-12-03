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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari bahan..."
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />

          <select
            v-model="filterCategory"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Semua Kategori</option>
            <option value="Biji Kopi">Biji Kopi</option>
            <option value="Teh">Teh</option>
            <option value="Coklat">Coklat</option>
            <option value="Gula">Gula</option>
            <option value="Susu">Susu</option>
          </select>

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
              <th class="px-6 py-3">Kategori</th>
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
              <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                  {{ material.category }}
                </span>
              </td>
              <td class="px-6 py-4">{{ material.stock }}</td>
              <td class="px-6 py-4 text-gray-500">{{ material.unit }}</td>
              <td class="px-6 py-4">
                {{ formatCurrency(material.pricePerUnit) }}
              </td>
              <td class="px-6 py-4 font-medium">
                {{ formatCurrency(material.stock * material.pricePerUnit) }}
              </td>

              <td class="px-6 py-4">
                <span :class="['px-2 py-1 text-xs rounded-full', getStatusClass(material)]">
                  {{ getStatusText(material) }}
                </span>
              </td>

              <td class="px-6 py-4 space-x-3">
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

          <select v-model="form.category" class="input">
            <option value="">Pilih kategori</option>
            <option value="Biji Kopi">Biji Kopi</option>
            <option value="Teh">Teh</option>
            <option value="Coklat">Coklat</option>
            <option value="Gula">Gula</option>
            <option value="Susu">Susu</option>
          </select>

          <div class="grid grid-cols-2 gap-4">
            <input v-model.number="form.stock" type="number" placeholder="Stok" class="input" />
            <select v-model="form.unit" class="input">
              <option value="kg">kg</option>
              <option value="gram">gram</option>
              <option value="liter">liter</option>
              <option value="pcs">pcs</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <input v-model.number="form.pricePerUnit" type="number" placeholder="Harga per unit" class="input" />
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

definePageMeta({ layout: "dashboard" });


const showAddModal = ref(false);
const editMode = ref(false);

const searchQuery = ref("");
const filterCategory = ref("");
const filterStatus = ref("");

interface Material {
  id: number;
  name: string;
  category: string;
  stock: number;
  unit: string;
  pricePerUnit: number;
  minStock: number;
  notes?: string;
}

const emptyForm = (): Material => ({
  id: 0,
  name: "",
  category: "",
  stock: 0,
  unit: "kg",
  pricePerUnit: 0,
  minStock: 10,
  notes: ""
});

const form = ref<Material>(emptyForm());

const materials = ref<Material[]>([
  { id: 1, name: "Kopi Arabica Premium", category: "Biji Kopi", stock: 150, unit: "kg", pricePerUnit: 85000, minStock: 20 },
  { id: 2, name: "Kopi Robusta Grade A", category: "Biji Kopi", stock: 200, unit: "kg", pricePerUnit: 65000, minStock: 30 },
  { id: 3, name: "Teh Hijau Organik", category: "Teh", stock: 75, unit: "kg", pricePerUnit: 120000, minStock: 15 },
  { id: 4, name: "Coklat Bubuk Premium", category: "Coklat", stock: 50, unit: "kg", pricePerUnit: 95000, minStock: 10 },
  { id: 5, name: "Gula Pasir", category: "Gula", stock: 300, unit: "kg", pricePerUnit: 15000, minStock: 50 },
  { id: 6, name: "Susu Bubuk Full Cream", category: "Susu", stock: 8, unit: "kg", pricePerUnit: 75000, minStock: 15 },
  { id: 7, name: "Vanilla Extract", category: "Perisa", stock: 5, unit: "liter", pricePerUnit: 250000, minStock: 10 }
]);

// ───────────────────────────────────────────────
// FILTERED DATA
// ───────────────────────────────────────────────

const filteredMaterials = computed(() => {
  return materials.value.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchCategory = !filterCategory.value || m.category === filterCategory.value;

    let matchStatus = true;
    if (filterStatus.value === "aman") matchStatus = m.stock > m.minStock * 2;
    if (filterStatus.value === "rendah") matchStatus = m.stock <= m.minStock * 2 && m.stock > 0;
    if (filterStatus.value === "habis") matchStatus = m.stock === 0;

    return matchSearch && matchCategory && matchStatus;
  });
});

const safeStock = computed(() => materials.value.filter((m) => m.stock > m.minStock * 2).length);
const lowStock = computed(() => materials.value.filter((m) => m.stock <= m.minStock * 2 && m.stock > 0).length);

const totalValue = computed(() => {
  return materials.value.reduce((sum, m) => sum + m.stock * m.pricePerUnit, 0);
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

const getStatusClass = (m: Material) => {
  if (m.stock === 0) return "bg-red-100 text-red-800";
  if (m.stock <= m.minStock) return "bg-yellow-100 text-yellow-800";
  if (m.stock <= m.minStock * 2) return "bg-blue-100 text-blue-800";
  return "bg-green-100 text-green-800";
};

const getStatusText = (m: Material) => {
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

const editMaterial = (m: Material) => {
  form.value = JSON.parse(JSON.stringify(m)); // fix reactivity clone
  editMode.value = true;
  showAddModal.value = true;
};

const deleteMaterial = (id: number) => {
  if (confirm("Yakin ingin menghapus bahan ini?")) {
    materials.value = materials.value.filter((m) => m.id !== id);
  }
};

const saveMaterial = () => {
  if (!form.value.name || !form.value.category) {
    alert("Nama dan kategori tidak boleh kosong.");
    return;
  }

  if (editMode.value) {
    const index = materials.value.findIndex((m) => m.id === form.value.id);
    if (index !== -1) {
      materials.value[index] = JSON.parse(JSON.stringify(form.value));
    }
  } else {
    const newId = materials.value.length
      ? Math.max(...materials.value.map((m) => m.id)) + 1
      : 1;
    materials.value.push({ ...form.value, id: newId });
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
