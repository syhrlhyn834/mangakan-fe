<template>
  <div class="bg-[#191b1d] text-white">
    <!-- Main Content -->
    <div class="container mx-auto p-4">
      <!-- Card 1 -->
      <div class="bg-gray-800 p-4 rounded mb-4">
        <div class="flex flex-col sm:flex-row">
          <!-- Image Section -->
          <div class="w-full sm:w-1/4 flex justify-center sm:justify-start mb-4 sm:mb-0">
            <v-img
              :src="manga.image"
              :lazy-src="manga.image"
              :alt="'Cover image of ' + manga.title"
              class="w-full h-96 object-cover rounded-lg shadow-lg"
            ></v-img>
          </div>

          <!-- Details Section -->
          <div class="w-full sm:w-3/4 sm:pl-4">
            <h1 class="text-2xl font-bold">{{ manga.title }}</h1>
            <p class="italic">{{ manga.description }}</p>
            <div class="mt-2">
              <p><strong>Status:</strong>
                <nuxt-link
                  :to="`/status/${manga.status}`"
                  class="text-white hover:text-orange-500 transition-colors duration-300">
                  {{ manga.status }}
                </nuxt-link>
              </p>

              <p><strong>Type:</strong>
                <nuxt-link
                  :to="`/types/${manga.type.slug}`"
                  class="text-white hover:text-orange-500 transition-colors duration-300">
                  {{ manga.type.name }}
                </nuxt-link>
              </p>

              <p><strong>Series:</strong>
                <nuxt-link
                  :to="`/series/${manga.series.slug}`"
                  class="text-white hover:text-orange-500 transition-colors duration-300">
                  {{ manga.series.name }}
                </nuxt-link>
              </p>

              <p v-if="manga.characters && manga.characters.length > 0">
                <strong>Character:</strong>
                <span v-for="(character, index) in manga.characters" :key="character.id">
                  <nuxt-link
                    :to="`/character/${character.slug}`"
                    class="text-white hover:text-orange-500 transition-colors duration-300">
                    {{ character.name }}<span v-if="index < manga.characters.length - 1">, </span>
                  </nuxt-link>
                </span>
              </p>



              <p><strong>Author:</strong>
                <nuxt-link
                  :to="`/author/${manga.author.slug}`"
                  class="text-white hover:text-orange-500 transition-colors duration-300">
                  {{ manga.author.name }}
                </nuxt-link>
              </p>

              <p><strong>Group:</strong>
                <nuxt-link
                  :to="`/group/${manga.group.slug}`"
                  class="text-white hover:text-orange-500 transition-colors duration-300">
                  {{ manga.group.name }}
                </nuxt-link>
              </p>

              <p><strong>Created Date:</strong> {{ manga.created_at }}</p>
            </div>
            <div class="mt-2">
              <span
                v-for="genre in manga.genres"
                :key="genre.id"
                class="bg-[#ff6740] text-white px-2 rounded mr-2 mb-2 inline-block text-sm"
              >
              <nuxt-link
              :to="`/genre/${genre.slug}`" class="text-white"> {{ genre.name }}</nuxt-link>
              </span>
            </div>
          </div>
        </div>
      </div>

     <!-- Daftar Chapter Card -->
<div class="bg-gray-800 p-4 rounded mb-4">
  <h2 class="text-xs md:text-xl font-bold">Daftar Chapter {{ manga.title }}:</h2>
  <input class="w-full mt-2 p-1 bg-black text-sm text-white rounded" placeholder="Cari Chapter Ex: 99" type="text" />
  <div class="mt-2">
    <div class="flex flex-col space-y-4">
      <div v-for="(chapter, index) in manga.chapters" :key="chapter.id" class="flex items-center">
        <div class="bg-[#ff6740] text-white text-sm py-1 px-2 rounded text-center w-12 h-auto">
          <div>{{ chapter.chapter_number }}</div>
          <!-- Pastikan kondisi ini benar, jika status adalah Finished dan chapter ini adalah yang terakhir -->
          <div v-if="manga.status === 'Finished' && chapter.chapter_number === getLastChapterNumber(manga.chapters)">END</div>
        </div>
        <div class="flex flex-col ml-2">
          <p class="font-bold text-sm"><nuxt-link :to="{name: 'manga-chapter-slug', params: {slug: chapter.slug}}">
            {{ chapter.title | truncate(15) }}
          </nuxt-link></p>

          <span class="text-xs">{{ chapter.created_at }}</span>
        </div>
      </div>
    </div>
  </div>
</div>


      <!-- You May Also Like Section -->
      <div class="mt-4">
        <h2 class="text-xl font-bold bg-[#ff6740] text-white py-2 px-4 rounded">You May Also Like:</h2>
        <div class="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-2">
          <div
            v-for="item in youMayAlsoLike"
            :key="item.id"
            class="flex flex-col items-start"
          >
            <div class="relative w-full">
              <img
                :src="item.image"
                :alt="'Cover image of ' + item.title"
                class="w-full h-72 object-cover rounded-lg shadow-lg"
              />
              <span class="absolute bottom-3 right-3 bg-blue-600 text-sm text-white font-bold px-3 py-1 rounded">
                {{ item.type.name }}
              </span>
            </div>
            <div class="w-full mt-3">
              <nuxt-link :to="{name: 'manga-slug', params: {slug: item.slug}}" class="text-lg text-white font-semibold truncate">
                {{ item.title }}
              </nuxt-link>
              <div class="flex items-center justify-between text-sm mt-2 text-gray-400">
                <span>Chapter {{ item.chapters.length }}</span>
                <span class="text-right">{{ item.status }}</span>
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
  filters: {
    truncate(value, length) {
      if (!value) return '';
      return value.length > length ? value.substring(0, length) + '...' : value;
    }
  },
  async asyncData({ params, $axios }) {
  try {
    // Fetch manga details by slug
    const { data: mangaDetails } = await $axios.get(`/api/web/mangas/${params.slug}`);

    // Fetch the latest manga for "You May Also Like"
    const { data: latestMangas } = await $axios.get(`/api/web/mangas`);

    // Filter mangas with the same genre as the current manga, excluding the current manga
    const filteredMangas = latestMangas.data.data.filter((item) => {
      return item.genres.some((genre) =>
        mangaDetails.data.genres.some((mangaGenre) => mangaGenre.id === genre.id)
      ) && item.id !== mangaDetails.data.id;
    });

    // If no manga with the same genre, fallback to the latest mangas, excluding the current manga
    const youMayAlsoLike = filteredMangas.length > 0
      ? filteredMangas
      : latestMangas.data.data.filter(item => item.id !== mangaDetails.data.id).slice(0, 6);

    return {
      manga: mangaDetails.data,
      youMayAlsoLike // Show mangas with the same genre or fallback to the latest 6 mangas excluding the current one
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      manga: null,
      youMayAlsoLike: []
    };
  }
},
  methods: {
    // Fungsi untuk mendapatkan nomor chapter terbesar
    getLastChapterNumber(chapters) {
      return Math.max(...chapters.map(chapter => chapter.chapter_number));
    }
  }
};
</script>

<style scoped>
/* Add any additional styles you need */
</style>
