<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-semibold mb-4">Tambah Manga</h1>
    <form @submit.prevent="storeManga" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Judul</label>
          <input
            v-model="form.title"
            type="text"
            id="title"
            name="title"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
          <p v-if="validation.title" class="text-red-500 text-sm mt-1">{{ validation.title[0] }}</p>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="form.description"
            id="description"
            name="description"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          ></textarea>
          <p v-if="validation.description" class="text-red-500 text-sm mt-1">{{ validation.description[0] }}</p>
        </div>

        <!-- Author -->
        <div>
          <label for="author" class="block text-sm font-medium text-gray-700">Authors</label>
          <multiselect
            v-model="manga.author"
            :options="author"
            label="name"
            track-by="id"
            :multiple="false"
            :searchable="true"
            required
          ></multiselect>
          <p v-if="validation.author_id" class="text-red-500 text-sm mt-1">{{ validation.author_id[0] }}</p>
        </div>

        <!-- Group -->
        <div>
          <label for="group" class="block text-sm font-medium text-gray-700">Groups</label>
          <multiselect
            v-model="manga.groups"
            :options="groups"
            label="name"
            track-by="id"
            :multiple="false"
            :searchable="true"
            required
          ></multiselect>
          <p v-if="validation.group_id" class="text-red-500 text-sm mt-1">{{ validation.group_id[0] }}</p>
        </div>

        <!-- Status -->
        <div>
          <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
          <select
            v-model="form.status"
            id="status"
            name="status"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="" disabled>Pilih Status</option>
            <option value="Publishing">Publishing</option>
            <option value="Finished">Finished</option>
          </select>
          <p v-if="validation.status" class="text-red-500 text-sm mt-1">{{ validation.status[0] }}</p>
        </div>


        <!-- Series -->
        <div>
          <label for="series" class="block text-sm font-medium text-gray-700">Series</label>
          <multiselect
            v-model="manga.series"
            :options="series"
            label="name"
            track-by="id"
            :multiple="false"
            :searchable="true"
            required
          ></multiselect>
          <p v-if="validation.series_id" class="text-red-500 text-sm mt-1">{{ validation.series_id[0] }}</p>
        </div>

        <!-- Genre -->
        <div>
          <label for="genre" class="block text-sm font-medium text-gray-700">Genre</label>
          <multiselect
            v-model="manga.genres"
            :options="genres"
            label="name"
            track-by="id"
            :multiple="true"
            :searchable="true"
            required
          ></multiselect>
          <p v-if="validation.genre_id" class="text-red-500 text-sm mt-1">{{ validation.genre_id[0] }}</p>
        </div>

        <div>
          <label for="character" class="block text-sm font-medium text-gray-700">Character</label>
          <multiselect
            v-model="manga.characters"
            :options="characters"
            label="name"
            track-by="id"
            :multiple="true"
            :searchable="true"
            required
          ></multiselect>
          <p v-if="validation.character_id" class="text-red-500 text-sm mt-1">{{ validation.character_id[0] }}</p>
        </div>

        <!-- Image Upload -->
        <div class="mt-10">
          <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
          <div
            class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
            @dragover.prevent @dragenter.prevent @drop.prevent="handleFileDrop"
          >
            <div class="text-center">
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  for="file-upload"
                  class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" type="file" class="sr-only" @change="handleFileChange" required />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-gray-600">PNG, JPG, JPEG, SVG up to 10MB</p>
              <p v-if="validation.image" class="text-red-500 text-sm mt-1">{{ validation.image[0] }}</p>
              <div v-if="imagePreview">
                <img :src="imagePreview" alt="Image Preview" class="mt-4 h-80 w-120 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Tambah Manga
        </button>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  layout: 'admin',
  head() {
  return {
    title: 'Tambah Manga',
  };
},

  data() {
    return {
      manga: {},
      form: {
        title: '',
        description: '',
        status: '',
        image: '',
        genres: [],
        characters: [],
      },
      author: [],
      groups: [],
      series: [],
      genres: [],
      characters: [],
      validation: {},
      imagePreview: null,
    };
  },

  async mounted() {
    try {
      const [authorsResponse, groupsResponse, seriesResponse, genresResponse, charactersResponse] = await Promise.all([
        this.$axios.get('/api/admin/authorsView'),
        this.$axios.get('/api/admin/groupsView'),
        this.$axios.get('/api/admin/seriesView'),
        this.$axios.get('/api/admin/genresView'),
        this.$axios.get('/api/admin/charactersView'),
      ]);

      this.author = authorsResponse.data?.data || [];
      this.groups = groupsResponse.data?.data || [];
      this.series = seriesResponse.data?.data || [];
      this.genres = genresResponse.data?.data || [];
      this.characters = charactersResponse.data?.data || [];
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  methods: {
    async storeManga() {

      let genres = this.manga.genres
        let selectedGenres = []


        genres.forEach((genre) => {
          selectedGenres.push(genre.id)
        })

        let characters = this.manga.characters
        let selectedCharacters = []
        characters.forEach((character) => {
          selectedCharacters.push(character.id)
        })

      let formData = new FormData();
      formData.append('image', this.form.image);
      formData.append('title', this.form.title);
      formData.append('description', this.form.description);
      formData.append('status', this.form.status);

      //append genres array
      for (var i = 0; i < selectedGenres.length; i++) {
          formData.append('genres[]', selectedGenres[i]);
        }
        for (var i = 0; i < selectedCharacters.length; i++) {
          formData.append('characters[]', selectedCharacters[i]);
        }

      formData.append('author_id', this.manga.author ? this.manga.author.id : '');
      formData.append('group_id', this.manga.groups ? this.manga.groups.id : '');
      formData.append('series_id', this.manga.series ? this.manga.series.id : '');

      try {
        const response = await this.$axios.post('/api/admin/mangas', formData);
        this.$router.push({ name: 'admin-manga' });
        this.$swal.fire({
          title: 'Success',
          text: 'Manga berhasil ditambahkan.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          this.validation = error.response.data.errors;
        } else {
          console.error('Error:', error);
          this.$swal.fire({
            title: 'Error',
            text: 'Terjadi kesalahan saat menambahkan manga.',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    },

    handleFileChange(e) {
      const image = e.target.files[0];
      if (!image.type.match('image.*')) {
        this.form.image = null;
        this.imagePreview = null;
        this.$swal.fire({
          title: 'OOPS!',
          text: "Format File Tidak Didukung!",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        this.form.image = image;
        this.imagePreview = URL.createObjectURL(image);
      }
    },

    handleFileDrop(e) {
      e.preventDefault();
      let image = e.dataTransfer.files[0];
      if (!image.type.match('image.*')) {
        this.form.image = null;
        this.imagePreview = null;
        this.$swal.fire({
          title: 'OOPS!',
          text: "Format File Tidak Didukung!",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        this.form.image = image;
        this.imagePreview = URL.createObjectURL(image);
      }
    }
  }
};
</script>

