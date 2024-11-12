<template>
  <div class="container">
    <div class="bg-[#2d2d2c] p-4 rounded-lg">
      <!-- Filter Title -->
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-white">Title</label>
        <input type="text" id="title" class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-[#ff6740] focus:border-[#ff6740] sm:text-sm text-white">
      </div>

      <!-- Filter Author -->
      <div class="mb-4">
        <label for="author" class="block text-sm font-medium text-white">Author</label>
        <input type="text" id="author" class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-[#ff6740] focus:border-[#ff6740] sm:text-sm text-white">
      </div>

      <!-- Filter Character -->
      <div class="mb-4">
        <label for="character" class="block text-sm font-medium text-white">Character</label>
        <input type="text" id="character" class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-[#ff6740] focus:border-[#ff6740] sm:text-sm text-white">
      </div>

      <!-- Status Filter -->
      <div class="mb-4">
        <span class="block text-sm font-medium text-white">Status</span>
        <div class="mt-2 space-x-4">
          <label class="inline-flex items-center">
            <input type="radio" name="status" class="form-radio text-[#ff6740]" checked>
            <span class="ml-2 text-white">All</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" name="status" class="form-radio text-[#ff6740]">
            <span class="ml-2 text-white">Publishing</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" name="status" class="form-radio text-[#ff6740]">
            <span class="ml-2 text-white">Finished</span>
          </label>
        </div>
      </div>


      <!-- Type Filter -->
      <div class="mb-4">
        <span class="block text-sm font-medium text-white">Type</span>
        <div class="mt-2 space-x-4">
          <label class="inline-flex items-center">
            <input type="radio" name="type" class="form-radio text-[#ff6740]" checked>
            <span class="ml-2 text-white">All</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" name="type" class="form-radio text-[#ff6740]">
            <span class="ml-2 text-white">Manga</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" name="type" class="form-radio text-[#ff6740]">
            <span class="ml-2 text-white">Manhwa</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" name="type" class="form-radio text-[#ff6740]">
            <span class="ml-2 text-white">Doujinshi</span>
          </label>
        </div>
      </div>

      <!-- Order By Filter -->
      <div class="mb-4">
        <span class="block text-sm font-medium text-white">Order By</span>
        <div class="mt-2 space-x-4">
          <label class="inline-flex items-center">
            <input type="radio" name="order" class="form-radio text-[#ff6740]" checked>
            <span class="ml-2 text-white">A-Z</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" name="order" class="form-radio text-[#ff6740]">
            <span class="ml-2 text-white">Latest Update</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" name="order" class="form-radio text-[#ff6740]">
            <span class="ml-2 text-white">Latest Added</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" name="order" class="form-radio text-[#ff6740]">
            <span class="ml-2 text-white">Popular</span>
          </label>
        </div>
      </div>

      <!-- Genre Filter -->
      <div class="mb-4">
        <span class="block text-sm font-medium text-white">Genre</span>
        <div class="mt-2 h-48 overflow-y-scroll grid grid-cols-2 md:grid-cols-5 gap-6 text-sm text-gray-400">
          <div v-for="(genre, index) in genres" :key="index" class="flex items-center">
            <input type="checkbox" :id="'genre-' + index" :value="genre" v-model="selectedGenre" class="form-checkbox h-3 w-3 text-[#ff6740] rounded-full border-gray-600 focus:ring-[#ff6740]">
            <label :for="'genre-' + index" class="ml-2">{{ genre.name }}</label>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <button @click="emitSearch" class="bg-[#ff6740] text-white px-4 py-2 rounded-md">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      genres: [],
      authors: [],
      types: [],
      selectedGenre: [], // Store selected genres
    };
  },
  async mounted() {
    // Fetch data from API
    try {
      const genreResponse = await this.$axios.get('/api/web/genres');
      const authorResponse = await this.$axios.get('/api/web/authors');
      const typeResponse = await this.$axios.get('/api/web/types');

      this.genres = genreResponse.data.data;
      this.authors = authorResponse.data.data;
      this.types = typeResponse.data.data;
    } catch (error) {
      console.error('Error fetching filter data:', error);
    }
  }
};
</script>
