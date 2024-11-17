<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-semibold mb-4">Edit Manga</h1>
    <form @submit.prevent="updateManga" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Judul</label>
          <input
            v-model="manga.title"
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
          <label for="description" class="block text-sm font-medium text-gray-700">Deskripsi</label>
          <textarea
            v-model="manga.description"
            id="description"
            name="description"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows="3"
            required
          ></textarea>
          <p v-if="validation.description" class="text-red-500 text-sm mt-1">{{ validation.description[0] }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Status -->
        <div>
          <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
          <select
            v-model="manga.status"
            id="status"
            name="status"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="" disabled>Select Status</option>
            <option value="Publishing">Publishing</option>
            <option value="Finished">Finished</option>
          </select>
          <p v-if="validation.status" class="text-red-500 text-sm mt-1">{{ validation.status[0] }}</p>
        </div>

        <!-- Author -->
        <div>
          <label for="author" class="block text-sm font-medium text-gray-700">Authors</label>
          <multiselect
            v-model="manga.author_id"
            :options="authors"
            label="name"
            track-by="id"
            :multiple="false"
            :searchable="true"
            required
          ></multiselect>
          <p v-if="validation.author" class="text-red-500 text-sm mt-1">{{ validation.author[0] }}</p>
        </div>

        <!-- Group -->
        <div>
          <label for="group" class="block text-sm font-medium text-gray-700">Groups</label>
          <multiselect
            v-model="manga.group_id"
            :options="groups"
            label="name"
            track-by="id"
            :multiple="false"
            :searchable="true"
            required
          ></multiselect>
          <p v-if="validation.group" class="text-red-500 text-sm mt-1">{{ validation.group[0] }}</p>
        </div>

        <!-- Type -->
        <div>
          <label for="type" class="block text-sm font-medium text-gray-700">Type</label>
          <multiselect
            v-model="manga.type_id"
            :options="types"
            label="name"
            track-by="id"
            :multiple="false"
            :searchable="true"
            required
          ></multiselect>
          <p v-if="validation.type" class="text-red-500 text-sm mt-1">{{ validation.type[0] }}</p>
        </div>

        <!-- Series -->
        <div>
          <label for="series" class="block text-sm font-medium text-gray-700">Series</label>
          <multiselect
            v-model="manga.series_id"
            :options="series"
            label="name"
            track-by="id"
            :multiple="false"
            :searchable="true"
            required
          ></multiselect>
          <p v-if="validation.series" class="text-red-500 text-sm mt-1">{{ validation.series[0] }}</p>
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
          <p v-if="validation.genre" class="text-red-500 text-sm mt-1">{{ validation.genre[0] }}</p>
        </div>

        <!-- Character -->
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
          <p v-if="validation.character" class="text-red-500 text-sm mt-1">{{ validation.character[0] }}</p>
        </div>
      </div>

      <!-- Image Upload -->
      <div class="mt-10">
        <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Cover Photo</label>
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
                <input id="file-upload" type="file" class="sr-only" @change="handleFileChange" />
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

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Manga
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'admin',

  data() {
  return {
    manga: {
      title: '',
      description: '',
      status: '',
      author_id: '', // Fixed key from authors_id to author_id for consistency
      type_id: '',   // Fixed key from types_id to type_id for consistency
      characters: [],
      series_id: '',
      genres: [],
      group_id: '',
      image: '',
    },
    validation: {},
    imagePreview: null,
    authors: [],  // Fixed: initialized authors
    groups: [],   // Fixed: initialized groups
    types: [],    // Fixed: initialized types
    series: [],   // Fixed: initialized series
    genres: [],   // Fixed: initialized genres
    characters: [], // Fixed: initialized characters
  };
},


  mounted() {
this.$axios.get(`/api/admin/mangas/${this.$route.params.id}`)

  .then(response => {

    //assing response data to state "manga.title"
    this.manga.title = response.data.data.title

    //assing response data to state "manga.description"
    this.manga.description = response.data.data.description

    //assing response data to state "manga.status"
    this.manga.status = response.data.data.status

    //assing response data to state "manga.authors"
    this.manga.author_id = response.data.data.author

    //assing response data to state "manga.types"
    this.manga.type_id = response.data.data.type

    //assing response data to state "manga.characters"
    this.manga.characters = response.data.data.characters

    //assing response data to state "manga.series"
    this.manga.series_id = response.data.data.series

    //assing response data to state "manga.genres"
    this.manga.genres = response.data.data.genres

    //assing response data to state "manga.groups"
    this.manga.group_id = response.data.data.group

    this.imagePreview = response.data.data.image;

  })

//fetching data authors
this.$axios.get('/api/admin/authors')

  .then(response => {

    //assing response data to state "authors"
    this.authors = response.data.data.data
  })

//fetching data types
this.$axios.get('/api/admin/types')

  .then(response => {

    //assing response data to state "types"
    this.types = response.data.data.data
  })

  //fetching data characters
this.$axios.get('/api/admin/characters')

.then(response => {

  //assing response data to state "series"
  this.characters = response.data.data.data
})
//fetching data series
this.$axios.get('/api/admin/series')

  .then(response => {

    //assing response data to state "series"
    this.series = response.data.data.data
  })
  //fetching data genres
this.$axios.get('/api/admin/genres')

.then(response => {

  //assing response data to state "genres"
  this.genres = response.data.data.data
})
//fetching data groups
this.$axios.get('/api/admin/groups')

  .then(response => {

    //assing response data to state "groups"
    this.groups = response.data.data.data
  })

},

  methods: {

    async updateManga() {
      /**
         * get selected character
         */
         let characters = this.manga.characters
        let selectedCharacters = []

        characters.forEach((character) => {
          selectedCharacters.push(character.id)
        })

        /**
         * get selected character
         */
         let genres = this.manga.genres
        let selectedGenres = []

        genres.forEach((genre) => {
          selectedGenres.push(genre.id)
        })

        //define formData
        let formData = new FormData();

        formData.append('image', this.manga.image)
        formData.append('title', this.manga.title)
        formData.append('description', this.manga.description)
        formData.append('status', this.manga.status)
        formData.append('author_id', this.manga.author_id ? this.manga.author_id.id : '')
        formData.append('type_id', this.manga.type_id ? this.manga.type_id.id : '')
        formData.append('series_id', this.manga.series_id ? this.manga.series_id.id : '')
        formData.append('group_id', this.manga.group_id ? this.manga.group_id.id : '')
        formData.append("_method", "PATCH")

        //append genres array
        for (var i = 0; i < selectedCharacters.length; i++) {
            formData.append('characters[]', selectedCharacters[i]);
        }

        for (var i = 0; i < selectedGenres.length; i++) {
            formData.append('genres[]', selectedGenres[i]);
        }

        //sending data to server
        await this.$axios.post(`/api/admin/mangas/${this.$route.params.id}`, formData)
          .then(() => {

            //sweet alert
            this.$swal.fire({
              title: 'BERHASIL!',
              text: "Data Berhasil Diupdate!",
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            })
            //redirect, if success store data
            this.$router.push({
              name: 'admin-manga'
            })

          })
          .catch(error => {

            //assign error to state "validation"
            this.validation = error.response.data
          })

      },

    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.manga.image = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },

    handleFileDrop(event) {
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.handleFileChange({ target: { files } });
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
