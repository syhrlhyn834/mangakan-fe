<template>
  <div>
    <div class="bg-[#191b1d] min-h-screen flex flex-col">
      <div class="px-4 mb-2 flex-grow">

        <!-- Header Section -->
        <div class="bg-[#ff6740] text-white p-1 md:p-1.5 rounded mb-2 flex items-center">
          <h2 class="text-lg font-semibold">
            <i class="fas fa-folder-open mr-1"></i> Series
          </h2>
        </div>

        <!-- Content Section -->
        <div class="text-white">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <!-- Iterasi data genre -->
            <div
              v-for="(genre, index) in genres"
              :key="genre.id"
              class="flex rounded overflow-hidden text-sm"
            >
              <div class="flex-1 bg-gray-800 p-2">
                <nuxt-link :to="{name: 'series-slug', params: {slug: genre.slug}}" class="text-lg text-white font-semibold truncate">
                  {{ genre.name }}
                </nuxt-link>
              </div>
              <div class="bg-black p-2">
                <span>{{ genre.mangaCount }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
  return {
    title: 'Daftar Series',
  };
},
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get('/api/web/series');
      const genres = response.data.data
        .map((genre) => ({
          ...genre,
          mangaCount: genre.mangas.length // Hitung jumlah manga
        }))
        .filter((genre) => genre.mangaCount > 0) // Hapus genre dengan jumlah manga 0
        .sort((a, b) => a.name.localeCompare(b.name)); // Urutkan berdasarkan nama genre (A-Z)

      return {
        genres,
      };
    } catch (error) {
      console.error('Error fetching genres:', error);
      return {
        genres: [], // Tetap inisialisasi genres jika terjadi error
      };
    }
  },
};
</script>


<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>
