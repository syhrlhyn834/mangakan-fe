<template>
  <div class="bg-[#191b1d] min-h-screen flex flex-col">
    <div class="px-4 mb-2 flex-grow">
      <div class="bg-[#ff6740] text-white p-1 md:p-1.5 rounded mb-2 flex justify-between items-center">
        <h2 class="text-xl font-bold"><i class="fas fa-folder-open mr-1"></i> DAFTAR SEMUA</h2>
        <a
          href="#"
          class="bg-white text-[#ff6740] font-semibold text-xs md:text-sm py-1 px-4 rounded transition-all duration-300 ease-in-out transform hover:bg-[#ff9a70] hover:text-white hover:scale-105 hover:shadow-md"
          @click.prevent="toggleFilterSearch"
        >
          Filter Search
        </a>
      </div>

      <!-- Conditional Rendering for Filter Search -->
      <FilterSearch v-if="showFilterSearch" />

      <div class="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5">
        <div class="flex flex-col items-start">
          <!-- Enlarged Manga Cover Image with Label -->
          <div class="relative w-full">
            <img
              src="https://storage.googleapis.com/a1aa/image/zXuVImZRVU7zAlrpxaSnXeIN2l8qeIw5Gi4UkkYDNxHiOCrTA.jpg"
              alt="Manga Cover"
              class="w-full h-72 object-cover rounded-lg shadow-lg"
            />
            <span class="absolute bottom-3 right-3 bg-blue-600 text-sm font-bold px-3 py-1 rounded">Doujinshi</span>
          </div>

          <!-- Enlarged Title, Chapter, and Status Outside of the Image -->
          <div class="w-full mt-3">
            <h3 class="text-lg text-white font-semibold truncate">Manga Title Example</h3>
            <div class="flex items-center justify-between text-sm mt-2 text-gray-400">
              <span>Chapter 10</span>
              <span class="text-right">Finished</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-start">
          <!-- Enlarged Manga Cover Image with Label -->
          <div class="relative w-full">
            <img
              src="https://storage.googleapis.com/a1aa/image/zXuVImZRVU7zAlrpxaSnXeIN2l8qeIw5Gi4UkkYDNxHiOCrTA.jpg"
              alt="Manga Cover"
              class="w-full h-72 object-cover rounded-lg shadow-lg"
            />
            <span class="absolute bottom-3 right-3 bg-blue-600 text-sm font-bold px-3 py-1 rounded">Doujinshi</span>
          </div>

          <!-- Enlarged Title, Chapter, and Status Outside of the Image -->
          <div class="w-full mt-3">
            <h3 class="text-lg text-white font-semibold truncate">Manga Title Example</h3>
            <div class="flex items-center justify-between text-sm mt-2 text-gray-400">
              <span>Chapter 10</span>
              <span class="text-right">Finished</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-start">
          <!-- Enlarged Manga Cover Image with Label -->
          <div class="relative w-full">
            <img
              src="https://storage.googleapis.com/a1aa/image/zXuVImZRVU7zAlrpxaSnXeIN2l8qeIw5Gi4UkkYDNxHiOCrTA.jpg"
              alt="Manga Cover"
              class="w-full h-72 object-cover rounded-lg shadow-lg"
            />
            <span class="absolute bottom-3 right-3 bg-blue-600 text-sm font-bold px-3 py-1 rounded">Doujinshi</span>
          </div>

          <!-- Enlarged Title, Chapter, and Status Outside of the Image -->
          <div class="w-full mt-3">
            <h3 class="text-lg text-white font-semibold truncate">Manga Title Example</h3>
            <div class="flex items-center justify-between text-sm mt-2 text-gray-400">
              <span>Chapter 10</span>
              <span class="text-right">Finished</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-start">
          <!-- Enlarged Manga Cover Image with Label -->
          <div class="relative w-full">
            <img
              src="https://storage.googleapis.com/a1aa/image/zXuVImZRVU7zAlrpxaSnXeIN2l8qeIw5Gi4UkkYDNxHiOCrTA.jpg"
              alt="Manga Cover"
              class="w-full h-72 object-cover rounded-lg shadow-lg"
            />
            <span class="absolute bottom-3 right-3 bg-blue-600 text-sm font-bold px-3 py-1 rounded">Doujinshi</span>
          </div>

          <!-- Enlarged Title, Chapter, and Status Outside of the Image -->
          <div class="w-full mt-3">
            <h3 class="text-lg text-white font-semibold truncate">Manga Title Example</h3>
            <div class="flex items-center justify-between text-sm mt-2 text-gray-400">
              <span>Chapter 10</span>
              <span class="text-right">Finished</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-start">
          <!-- Enlarged Manga Cover Image with Label -->
          <div class="relative w-full">
            <img
              src="https://storage.googleapis.com/a1aa/image/zXuVImZRVU7zAlrpxaSnXeIN2l8qeIw5Gi4UkkYDNxHiOCrTA.jpg"
              alt="Manga Cover"
              class="w-full h-72 object-cover rounded-lg shadow-lg"
            />
            <span class="absolute bottom-3 right-3 bg-blue-600 text-sm font-bold px-3 py-1 rounded">Doujinshi</span>
          </div>

          <!-- Enlarged Title, Chapter, and Status Outside of the Image -->
          <div class="w-full mt-3">
            <h3 class="text-lg text-white font-semibold truncate">Manga Title Example</h3>
            <div class="flex items-center justify-between text-sm mt-2 text-gray-400">
              <span>Chapter 10</span>
              <span class="text-right">Finished</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-start">
          <!-- Enlarged Manga Cover Image with Label -->
          <div class="relative w-full">
            <img
              src="https://storage.googleapis.com/a1aa/image/zXuVImZRVU7zAlrpxaSnXeIN2l8qeIw5Gi4UkkYDNxHiOCrTA.jpg"
              alt="Manga Cover"
              class="w-full h-72 object-cover rounded-lg shadow-lg"
            />
            <span class="absolute bottom-3 right-3 bg-blue-600 text-sm font-bold px-3 py-1 rounded">Doujinshi</span>
          </div>

          <!-- Enlarged Title, Chapter, and Status Outside of the Image -->
          <div class="w-full mt-3">
            <h3 class="text-lg text-white font-semibold truncate">Manga Title Example</h3>
            <div class="flex items-center justify-between text-sm mt-2 text-gray-400">
              <span>Chapter 10</span>
              <span class="text-right">Finished</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-start">
          <!-- Enlarged Manga Cover Image with Label -->
          <div class="relative w-full">
            <img
              src="https://storage.googleapis.com/a1aa/image/zXuVImZRVU7zAlrpxaSnXeIN2l8qeIw5Gi4UkkYDNxHiOCrTA.jpg"
              alt="Manga Cover"
              class="w-full h-72 object-cover rounded-lg shadow-lg"
            />
            <span class="absolute bottom-3 right-3 bg-blue-600 text-sm font-bold px-3 py-1 rounded">Doujinshi</span>
          </div>

          <!-- Enlarged Title, Chapter, and Status Outside of the Image -->
          <div class="w-full mt-3">
            <h3 class="text-lg text-white font-semibold truncate">Manga Title Example</h3>
            <div class="flex items-center justify-between text-sm mt-2 text-gray-400">
              <span>Chapter 10</span>
              <span class="text-right">Finished</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-start">
          <!-- Enlarged Manga Cover Image with Label -->
          <div class="relative w-full">
            <img
              src="https://storage.googleapis.com/a1aa/image/zXuVImZRVU7zAlrpxaSnXeIN2l8qeIw5Gi4UkkYDNxHiOCrTA.jpg"
              alt="Manga Cover"
              class="w-full h-72 object-cover rounded-lg shadow-lg"
            />
            <span class="absolute bottom-3 right-3 bg-blue-600 text-sm font-bold px-3 py-1 rounded">Doujinshi</span>
          </div>

          <!-- Enlarged Title, Chapter, and Status Outside of the Image -->
          <div class="w-full mt-3">
            <h3 class="text-lg text-white font-semibold truncate">Manga Title Example</h3>
            <div class="flex items-center justify-between text-sm mt-2 text-gray-400">
              <span>Chapter 10</span>
              <span class="text-right">Finished</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-start">
          <!-- Enlarged Manga Cover Image with Label -->
          <div class="relative w-full">
            <img
              src="https://storage.googleapis.com/a1aa/image/zXuVImZRVU7zAlrpxaSnXeIN2l8qeIw5Gi4UkkYDNxHiOCrTA.jpg"
              alt="Manga Cover"
              class="w-full h-72 object-cover rounded-lg shadow-lg"
            />
            <span class="absolute bottom-3 right-3 bg-blue-600 text-sm font-bold px-3 py-1 rounded">Doujinshi</span>
          </div>

          <!-- Enlarged Title, Chapter, and Status Outside of the Image -->
          <div class="w-full mt-3">
            <h3 class="text-lg text-white font-semibold truncate">Manga Title Example</h3>
            <div class="flex items-center justify-between text-sm mt-2 text-gray-400">
              <span>Chapter 10</span>
              <span class="text-right">Finished</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-start">
          <!-- Enlarged Manga Cover Image with Label -->
          <div class="relative w-full">
            <img
              src="https://storage.googleapis.com/a1aa/image/zXuVImZRVU7zAlrpxaSnXeIN2l8qeIw5Gi4UkkYDNxHiOCrTA.jpg"
              alt="Manga Cover"
              class="w-full h-72 object-cover rounded-lg shadow-lg"
            />
            <span class="absolute bottom-3 right-3 bg-blue-600 text-sm font-bold px-3 py-1 rounded">Doujinshi</span>
          </div>

          <!-- Enlarged Title, Chapter, and Status Outside of the Image -->
          <div class="w-full mt-3">
            <h3 class="text-lg text-white font-semibold truncate">Manga Title Example</h3>
            <div class="flex items-center justify-between text-sm mt-2 text-gray-400">
              <span>Chapter 10</span>
              <span class="text-right">Finished</span>
            </div>
          </div>
        </div>

        <!-- Tambahkan item manga lainnya jika diperlukan -->
      </div>
    </div>

    <!-- Footer Pagination -->
    <footer class="px-4">
      <nav class="pagination flex justify-center" aria-label="Page">
        <ul class="inline-flex items-center space-x-2">
          <li v-for="page in displayPages" :key="page" class="inline-block">
            <a :href="`/doujin/page/${page}/`" :class="page === currentPage ? 'bg-[#ff6740] text-white' : 'text-gray-500 hover:text-white hover:bg-gray-700'" class="px-3 py-1 rounded-md font-bold transition">
              <strong>{{ page }}</strong>
            </a>
          </li>
          <li v-if="totalPages > maxPagesToShow && currentPage < totalPages - maxPagesToShow" class="inline-block text-gray-500">...</li>
          <li>
            <a :href="`/doujin/page/${totalPages}/`" title="Last page" class="text-gray-500 hover:text-white px-3 py-1 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current">
                <polyline points="13 17 18 12 13 7"></polyline>
                <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>
import FilterSearch from '@/components/FilterSearch.vue'; // Pastikan path ini sesuai dengan lokasi komponen Anda

export default {
  name: 'Manga',
  components: {
    FilterSearch,
  },
  data() {
    return {
      showFilterSearch: false, // State untuk menampilkan FilterSearch
      currentPage: 1,
      totalPages: 385,
      maxPagesToShow: 5,
    };
  },
  computed: {
    displayPages() {
      const pages = [];
      const start = Math.max(this.currentPage - Math.floor(this.maxPagesToShow / 2), 1);
      const end = Math.min(start + this.maxPagesToShow - 1, this.totalPages);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    toggleFilterSearch() {
      this.showFilterSearch = !this.showFilterSearch; // Toggle visibility
    },
  },
}
</script>

<style scoped>
.pagination a {
  transition: all 0.3s ease;
}
</style>
