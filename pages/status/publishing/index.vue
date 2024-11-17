

<template>
  <div class="bg-[#191b1d] min-h-screen flex flex-col">
    <div class="px-4 mb-2 flex-grow">
      <div class="bg-[#ff6740] text-white p-1 md:p-1.5 rounded mb-2 flex justify-between items-center">
        <h2 class="text-xl font-bold"><i class="fas fa-folder-open mr-1"></i> Status: Publishing Upload Terbaru</h2>
      </div>

      <div class="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <div v-for="manga in mangas" :key="manga.id" class="flex flex-col items-start">
          <div class="relative w-full">
            <v-img
              :src="manga.image"
              :lazy-src="manga.image"
              :alt="manga.title"
              class="w-full h-72 object-cover rounded-lg shadow-lg"
            ></v-img>
            <span class="absolute bottom-3 right-3 bg-blue-600 text-sm text-white font-bold px-3 py-1 rounded">{{ manga.type.name }}</span>
          </div>
          <div class="w-full mt-3">
            <nuxt-link :to="{name: 'manga-slug', params: {slug: manga.slug}}" class="text-lg text-white font-semibold truncate">
              {{ manga.title }}
            </nuxt-link>
            <div class="flex items-center justify-between text-sm mt-2 text-gray-400">
              <span>Chapter {{ manga.chapters.length }}</span>
              <span class="text-right">{{ manga.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  <!-- Pagination untuk  -->
<footer class="py-4 text-center">
  <nav class="pagination" aria-label="Page">
    <ul class="inline-flex items-center space-x-2">
      <!-- Tombol Previous Page dengan ikon SVG untuk  -->
      <li v-if="currentPage > 1" class="inline-block">
        <a @click.prevent="changePage(currentPage - 1)"
           class="text-white hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current">
            <polyline points="11 17 6 12 11 7"></polyline>
            <polyline points="18 17 13 12 18 7"></polyline>
          </svg>
        </a>
      </li>

      <!-- Loop untuk halaman pagination  -->
      <li v-for="page in displayPages" :key="page" class="inline-block">
        <span v-if="page === '...'" class="text-white">...</span>
        <a v-else
           @click.prevent="changePage(page)"
           :class="page === currentPage ? 'bg-[#ff6740] text-white' : 'text-white hover:text-white hover:bg-gray-700'"
           class="px-3 py-1 rounded-md font-bold transition">
          <strong>{{ page }}</strong>
        </a>
      </li>

      <!-- Tombol Next Page dengan ikon SVG untuk  -->
      <li v-if="currentPage < totalPages" class="inline-block">
        <a @click.prevent="changePage(currentPage + 1)"
           class="text-white hover:text-white">
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
export default {
  name: 'All',
  data() {
    return {
      mangas: [],
      currentPage: 1,
      totalPages: null,
    };
  },
  computed: {
    displayPages() {
      return this.getDisplayPages(this.totalPages, this.currentPage);
    },
  },
  methods: {
    async fetchMangas(page) {
      try {
        const response = await this.$axios.get(`/api/web/mangaPublishing?page=${page}`);
        this.mangas = response.data.data.data;
        this.currentPage = response.data.data.current_page;  // Perbaikan di sini
        this.totalPages = response.data.data.last_page;      // Perbaikan di sini
      } catch (error) {
        console.error("Error fetching mangas:", error);
      }
    },
    getDisplayPages(totalPages, currentPage) {
  const pages = [];
  const maxPagesToShow = 5;

  // Pastikan halaman pertama dan terakhir selalu muncul
  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    const start = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 2);
    const end = Math.min(start + maxPagesToShow - 1, totalPages - 1);

    // Selalu tampilkan halaman pertama dan terakhir
    if (start > 2) {
      pages.push(1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push(totalPages);
    }
  }

  return pages;
},
    changePage(page) {
      this.$router.push({ query: { ...this.$route.query, pageManga: page } });
      this.fetchMangas(page);  // Memanggil method dengan nama yang sesuai
    },
  },

  async mounted() {
    const pageManga = parseInt(this.$route.query.pageManga) || 1;

    // Set current page dari URL jika ada
    this.currentPage = pageManga;

    // Fetch data berdasarkan halaman yang diambil dari URL
    await this.fetchMangas(this.currentPage);  // Memanggil method dengan nama yang sesuai
  },
};
</script>

<style scoped>
.pagination a {
  transition: all 0.3s ease;
  cursor: pointer; /* Menambahkan cursor pointer */
}
</style>
