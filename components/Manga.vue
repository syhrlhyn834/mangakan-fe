<template>
  <div class="bg-[#191b1d] min-h-screen flex flex-col justify-between">
    <!-- Konten Manga & Doujinshi -->
    <div class="px-4 mb-2">
      <div class="bg-[#ff6740] text-white p-1 md:p-1.5 rounded mb-2 flex justify-between items-center">
        <h2 class="text-xl font-bold"><i class="fas fa-folder-open mr-1"></i> DOUJINSHI & MANGA</h2>
        <a href="#" class="bg-white text-[#ff6740] font-semibold text-xs md:text-sm py-1 px-4 rounded transition-all duration-300 ease-in-out transform hover:bg-[#ff9a70] hover:text-white hover:scale-105 hover:shadow-md">
          Lihat Semua
        </a>
      </div>
      <div class="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <div v-for="manga in mangas.filter(m => m.type.name !== 'Manhwa')" :key="manga.id" class="flex flex-col items-start">
          <div class="relative w-full">
            <v-img
              :src="manga.image"
              :lazy-src="manga.image"
              :alt="manga.title"
              class="w-full h-72 object-cover rounded-lg shadow-lg"
            ></v-img>
            <span class="absolute bottom-3 right-3 bg-blue-600 text-sm font-bold px-3 py-1 rounded">{{ manga.type.name }}</span>
          </div>
          <div class="w-full mt-3">
            <h3 class="text-lg text-white font-semibold truncate">{{ manga.title }}</h3>
            <div class="flex items-center justify-between text-sm mt-2 text-gray-400">
              <span>Chapter {{ manga.chapters.length }}</span>
              <span class="text-right">{{ manga.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Pagination -->
    <footer class="py-4 text-center">
      <nav class="pagination" aria-label="Page">
        <ul class="inline-flex items-center space-x-2">
          <li v-for="page in displayPages" :key="page" class="inline-block">
            <a :href="`/doujin/page/${page}/`" :class="page === currentPage ? 'bg-[#ff6740] text-white' : 'text-white hover:text-white hover:bg-gray-700'" class="px-3 py-1 rounded-md font-bold transition">
              <strong>{{ page }}</strong>
            </a>
          </li>
          <li v-if="totalPages > maxPagesToShow && currentPage < totalPages - maxPagesToShow" class="inline-block text-white">...</li>
          <li>
            <a :href="`/doujin/page/${totalPages}/`" title="Last page" class="text-white hover:text-white px-3 py-1 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current">
                <polyline points="13 17 18 12 13 7"></polyline>
                <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </footer>

    <!-- Konten Manhwa -->
    <div class="px-4 mb-2">
      <div class="bg-[#ff6740] text-white p-1 md:p-1.5 rounded mb-2 flex justify-between items-center">
        <h2 class="text-xl font-bold"><i class="fas fa-folder-open mr-1"></i> MANHWA</h2>
        <a href="#" class="bg-white text-[#ff6740] font-semibold text-xs md:text-sm py-1 px-4 rounded transition-all duration-300 ease-in-out transform hover:bg-[#ff9a70] hover:text-white hover:scale-105 hover:shadow-md">
          Lihat Semua
        </a>
      </div>
      <div class="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <div v-for="manga in mangas.filter(m => m.type.name === 'Manhwa')" :key="manga.id" class="flex flex-col items-start">
          <div class="relative w-full">
            <v-img
              :src="manga.image"
              :lazy-src="manga.image"
              :alt="manga.title"
              class="w-full h-72 object-cover rounded-lg shadow-lg"
            ></v-img>
            <span class="absolute bottom-3 right-3 bg-blue-600 text-sm font-bold px-3 py-1 rounded">{{ manga.type.name }}</span>
          </div>
          <div class="w-full mt-3">
            <h3 class="text-lg text-white font-semibold truncate">{{ manga.title }}</h3>
            <div class="flex items-center justify-between text-sm mt-2 text-gray-400">
              <span>Chapter {{ manga.chapters.length }}</span>
              <span class="text-right">{{ manga.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer Pagination -->
    <footer class="py-4 text-center">
      <nav class="pagination" aria-label="Page">
        <ul class="inline-flex items-center space-x-2">
          <li v-for="page in displayPages" :key="page" class="inline-block">
            <a :href="`/doujin/page/${page}/`" :class="page === currentPage ? 'bg-[#ff6740] text-white' : 'text-white hover:text-white hover:bg-gray-700'" class="px-3 py-1 rounded-md font-bold transition">
              <strong>{{ page }}</strong>
            </a>
          </li>
          <li v-if="totalPages > maxPagesToShow && currentPage < totalPages - maxPagesToShow" class="inline-block text-white">...</li>
          <li>
            <a :href="`/doujin/page/${totalPages}/`" title="Last page" class="text-white hover:text-white px-3 py-1 rounded-md">
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
  name: 'Manga',
  data() {
    return {
      mangas: [],
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
  async fetch() {
  try {
    const response = await this.$axios.get('/api/web/mangas');
    let mangasData = response.data.data.data;

    // Map untuk menambahkan tanggal `updated_at` chapter terbaru pada setiap manga
    mangasData = mangasData.map(manga => {
      // Dapatkan tanggal `updated_at` dari chapter terbaru
      const latestChapterDate = manga.chapters.length
        ? new Date(Math.max(...manga.chapters.map(ch => new Date(ch.updated_at))))
        : new Date(manga.updated_at);

      return {
        ...manga,
        latestChapterDate
      };
    });

    // Urutkan manga berdasarkan tanggal chapter terbaru
    this.mangas = mangasData.sort((a, b) => b.latestChapterDate - a.latestChapterDate);

  } catch (error) {
    console.error('Failed to fetch mangas:', error);
  }
}

};
</script>


<style scoped>
.pagination a {
  transition: all 0.3s ease;
}
</style>
