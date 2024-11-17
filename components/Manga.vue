<template>
  <div class="bg-[#191b1d] min-h-screen flex flex-col justify-between">
    <!-- Konten Doujinshi & Manga -->
    <div class="px-4 mb-2">
      <div class="bg-[#ff6740] text-white p-1 md:p-1.5 rounded mb-2 flex justify-between items-center">
        <h2 class="text-xl font-bold"><i class="fas fa-folder-open mr-1"></i> DOUJINSHI & MANGA</h2>
        <NuxtLink
    to="/doujinmanga"
    class="bg-white text-[#ff6740] font-semibold text-xs md:text-sm py-1 px-4 rounded transition-all duration-300 ease-in-out transform hover:bg-[#ff9a70] hover:text-white hover:scale-105 hover:shadow-md"
  >
    Lihat Semua
  </NuxtLink>
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
              {{ manga.title | truncate(15) }}
            </nuxt-link>


            <div class="flex items-center justify-between text-sm mt-2 text-gray-400">
              <span>Chapter {{ manga.chapters.length }}</span>
              <span class="text-right">{{ manga.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination for Doujin/Manga -->
    <footer class="py-4 text-center">
      <nav class="pagination" aria-label="Page">
        <ul class="inline-flex items-center space-x-2">
          <li v-if="currentPageDoujin > 1" class="inline-block">
            <a @click.prevent="changePageDoujin(currentPageDoujin - 1)"
               class="text-white hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current">
                <polyline points="11 17 6 12 11 7"></polyline>
                <polyline points="18 17 13 12 18 7"></polyline>
              </svg>
            </a>
          </li>
          <!-- Loop untuk halaman pagination -->
          <li v-for="page in displayPagesDoujin" :key="page" class="inline-block">
            <span v-if="page === '...'" class="text-white">...</span>
            <a v-else
               @click.prevent="changePageDoujin(page)"
               :class="page === currentPageDoujin ? 'bg-[#ff6740] text-white' : 'text-white hover:text-white hover:bg-gray-700'"
               class="px-3 py-1 rounded-md font-bold transition">
              <strong>{{ page }}</strong>
            </a>
          </li>

          <!-- Tombol Next Page dengan ikon SVG -->
          <li v-if="currentPageDoujin < totalPagesDoujin" class="inline-block">
            <a @click.prevent="changePageDoujin(currentPageDoujin + 1)"
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


    <!-- Konten Manhwa -->
    <div class="px-4 mb-2">
      <div class="bg-[#ff6740] text-white p-1 md:p-1.5 rounded mb-2 flex justify-between items-center">
        <h2 class="text-xl font-bold"><i class="fas fa-folder-open mr-1"></i> MANHWA</h2>
        <NuxtLink
    to="/manhwa"
    class="bg-white text-[#ff6740] font-semibold text-xs md:text-sm py-1 px-4 rounded transition-all duration-300 ease-in-out transform hover:bg-[#ff9a70] hover:text-white hover:scale-105 hover:shadow-md"
  >
    Lihat Semua
  </NuxtLink>
      </div>
      <div class="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <div v-for="manhwa in manhwas" :key="manhwa.id" class="flex flex-col items-start">
          <div class="relative w-full">
            <v-img
              :src="manhwa.image"
              :lazy-src="manhwa.image"
              :alt="manhwa.title"
              class="w-full h-72 object-cover rounded-lg shadow-lg"
            ></v-img>
            <span class="absolute bottom-3 right-3 bg-blue-600 text-sm text-white font-bold px-3 py-1 rounded">{{ manhwa.type.name }}</span>
          </div>
          <div class="w-full mt-3">
            <nuxt-link :to="{name: 'manga-slug', params: {slug: manhwa.slug}}" class="text-lg text-white font-semibold truncate">
              {{ manhwa.title | truncate(20) }}
            </nuxt-link>

            <div class="flex items-center justify-between text-sm mt-2 text-gray-400">
              <span>Chapter {{ manhwa.chapters.length }}</span>
              <span class="text-right">{{ manhwa.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

<!-- Pagination untuk Manhwa -->
<footer class="py-4 text-center">
  <nav class="pagination" aria-label="Page">
    <ul class="inline-flex items-center space-x-2">
      <!-- Tombol Previous Page dengan ikon SVG untuk Manhwa -->
      <li v-if="currentPageManhwa > 1" class="inline-block">
        <a @click.prevent="changePageManhwa(currentPageManhwa - 1)"
           class="text-white hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current">
            <polyline points="11 17 6 12 11 7"></polyline>
            <polyline points="18 17 13 12 18 7"></polyline>
          </svg>
        </a>
      </li>

      <!-- Loop untuk halaman pagination Manhwa -->
      <li v-for="page in displayPagesManhwa" :key="page" class="inline-block">
        <span v-if="page === '...'" class="text-white">...</span>
        <a v-else
           @click.prevent="changePageManhwa(page)"
           :class="page === currentPageManhwa ? 'bg-[#ff6740] text-white' : 'text-white hover:text-white hover:bg-gray-700'"
           class="px-3 py-1 rounded-md font-bold transition">
          <strong>{{ page }}</strong>
        </a>
      </li>

      <!-- Tombol Next Page dengan ikon SVG untuk Manhwa -->
      <li v-if="currentPageManhwa < totalPagesManhwa" class="inline-block">
        <a @click.prevent="changePageManhwa(currentPageManhwa + 1)"
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
  name: 'Manga',
  filters: {
    truncate(value, length) {
      if (!value) return '';
      return value.length > length ? value.substring(0, length) + '...' : value;
    }
  },
  data() {

    return {
      mangas: [],
      manhwas: [],
      currentPageDoujin: 1,
      currentPageManhwa: 1,
      totalPagesDoujin: null,
      totalPagesManhwa: null,
    };
  },
  computed: {
    displayPagesDoujin() {
      return this.getDisplayPages(this.totalPagesDoujin, this.currentPageDoujin);
    },
    displayPagesManhwa() {
      return this.getDisplayPages(this.totalPagesManhwa, this.currentPageManhwa);
    },
  },
  methods: {
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
    async fetchDoujin(page) {
      try {
        const mangaResponse = await this.$axios.get(`/api/web/doujinmangaHome?q=&page=${page}`);
        this.mangas = this.processMangaData(mangaResponse.data.data.data);
        this.currentPageDoujin = mangaResponse.data.data.current_page;
        this.totalPagesDoujin = mangaResponse.data.data.last_page;
      } catch (error) {
        console.error('Failed to fetch mangas:', error);
      }
    },
    async fetchManhwa(page) {
      try {
        const manhwaResponse = await this.$axios.get(`/api/web/manhwaHome?q=&page=${page}`);
        this.manhwas = this.processMangaData(manhwaResponse.data.data.data);
        this.currentPageManhwa = manhwaResponse.data.data.current_page;
        this.totalPagesManhwa = manhwaResponse.data.data.last_page;
      } catch (error) {
        console.error('Failed to fetch manhwas:', error);
      }
    },
    processMangaData(mangaData) {
      return mangaData.map(manga => {
        const latestChapterDate = manga.chapters.length
          ? new Date(Math.max(...manga.chapters.map(ch => new Date(ch.updated_at))))
          : new Date(manga.updated_at);

        return {
          ...manga,
          latestChapterDate,
        };
      }).sort((a, b) => b.latestChapterDate - a.latestChapterDate);
    },
    changePageDoujin(page) {
      this.$router.push({ query: { ...this.$route.query, pageDoujin: page } });
      this.fetchDoujin(page);
    },
    changePageManhwa(page) {
      this.$router.push({ query: { ...this.$route.query, pageManhwa: page } });
      this.fetchManhwa(page);
    },
  },
  async mounted() {
    const pageDoujin = parseInt(this.$route.query.pageDoujin) || 1;
    const pageManhwa = parseInt(this.$route.query.pageManhwa) || 1;

    // Set current page dari URL jika ada
    this.currentPageDoujin = pageDoujin;
    this.currentPageManhwa = pageManhwa;

    // Fetch data berdasarkan halaman yang diambil dari URL
    await this.fetchDoujin(this.currentPageDoujin);
    await this.fetchManhwa(this.currentPageManhwa);
  },
};
</script>


<style scoped>
.pagination a {
  transition: all 0.3s ease;
  cursor: pointer; /* Menambahkan cursor pointer */
}

</style>
