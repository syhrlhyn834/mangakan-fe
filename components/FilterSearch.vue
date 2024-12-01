<template>
  <div class="container">
    <div class="bg-[#2d2d2c] p-4 rounded-lg">
      <!-- Filter Title -->
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-white">Title</label>
        <input type="text" v-model="title" id="title" class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-[#ff6740] focus:border-[#ff6740] sm:text-sm text-white">
      </div>

      <!-- Filter Author -->
      <div class="mb-4">
        <label for="author" class="block text-sm font-medium text-white">Author</label>
        <input type="text" v-model="author" id="author" class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-[#ff6740] focus:border-[#ff6740] sm:text-sm text-white">
      </div>

      <!-- Filter Character -->
      <div class="mb-4">
        <label for="character" class="block text-sm font-medium text-white">Character</label>
        <input type="text" v-model="character" id="character" class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-[#ff6740] focus:border-[#ff6740] sm:text-sm text-white">
      </div>

      <!-- Status Filter -->
      <div class="mb-4">
        <span class="block text-sm font-medium text-white">Status</span>
        <div class="mt-2 space-x-4">
          <label class="inline-flex items-center">
            <input type="radio" name="status" value="All" v-model="selectedStatus" class="form-radio text-[#ff6740]">
            <span class="ml-2 text-white">All</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" name="status" value="Publishing" v-model="selectedStatus" class="form-radio text-[#ff6740]">
            <span class="ml-2 text-white">Publishing</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" name="status" value="Finished" v-model="selectedStatus" class="form-radio text-[#ff6740]">
            <span class="ml-2 text-white">Finished</span>
          </label>
        </div>
      </div>


      <!-- Order By Filter -->
      <div class="mb-4">
        <span class="block text-sm font-medium text-white">Order By</span>
        <div class="mt-2 space-x-4">
          <label class="inline-flex items-center">
            <input type="radio" name="order" value="A-Z" v-model="selectedOrder" class="form-radio text-[#ff6740]">
            <span class="ml-2 text-white">A-Z</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" name="order" value="Latest Update" v-model="selectedOrder" class="form-radio text-[#ff6740]">
            <span class="ml-2 text-white">Latest Update</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" name="order" value="Latest Added" v-model="selectedOrder" class="form-radio text-[#ff6740]">
            <span class="ml-2 text-white">Latest Added</span>
          </label>
        </div>
      </div>

     <!-- Filter Genre -->
<div class="mb-4">
  <span class="block text-sm font-medium text-white">Genre</span>
  <div class="mt-2 h-48 overflow-y-scroll grid grid-cols-2 md:grid-cols-5 gap-6 text-sm text-gray-400">
    <div v-for="(genre, index) in genres" :key="index" class="flex items-center">
      <!-- Menggunakan slug sebagai value -->
      <input type="checkbox" :id="'genre-' + index" :value="genre.slug" v-model="selectedGenre" class="form-checkbox h-3 w-3 text-[#ff6740] rounded-full border-gray-600 focus:ring-[#ff6740]">
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
      title: '',
      author: '',
      character: '',
      selectedStatus: 'All', // Default status
      selectedType: 'All', // Default type
      selectedOrder: 'A-Z', // Default order
      selectedGenre: [], // Store selected genres
      genres: [], // Available genres
      authors: [], // Available authors
    };
  },
  async mounted() {
  // Fetch data from API
  try {
    const genreResponse = await this.$axios.get('/api/web/genres');
    const authorResponse = await this.$axios.get('/api/web/authors');
    const typeResponse = await this.$axios.get('/api/web/types');

    this.genres = genreResponse.data.data.sort((a, b) => {
      return a.name.localeCompare(b.name); // Sort by genre name A-Z
    });
    this.authors = authorResponse.data.data;
    this.types = typeResponse.data.data;
  } catch (error) {
    console.error('Error fetching filter data:', error);
  }
},
  methods: {
    emitSearch() {
      // Menyusun objek filter berdasarkan input dari pengguna
      const filters = {
        title: this.title,
        author: this.author,
        character: this.character,
        status: this.selectedStatus,
        type: this.selectedType,
        order: this.selectedOrder,
        genres: this.selectedGenre
      };

      // Emit data filter ke parent atau melakukan pencarian di API
      this.$emit('search', filters);

      // Contoh pemanggilan API menggunakan axios (opsional)
      /*
      this.$axios.get('/api/search', { params: filters })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Search error:', error);
        });
      */
    }
  }
};
</script>
