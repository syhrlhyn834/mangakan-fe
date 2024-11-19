<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-semibold mb-4">Tambah Chapter</h1>
    <form @submit.prevent="storechapter" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Judul</label>
          <input
            v-model="chapter.title"
            type="text"
            id="title"
            name="title"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
          <p v-if="validation.title" class="text-red-500 text-sm mt-1">{{ validation.title[0] }}</p>
        </div>

        <!-- Manga -->
        <div>
          <label for="manga" class="block text-sm font-medium text-gray-700">Pilih Manga</label>
      <multiselect
        v-model="chapter.manga_id"
        :options="mangas"
        :track-by="'id'"
        label="title"
        :searchable="true"
        :allow-empty="false"
        placeholder="Pilih Manga"
        :close-on-select="true"
        :clear-on-select="false"
        :multiple="false"
        class="mt-1 block w-full"
      ></multiselect>
      <p v-if="validation.manga_id" class="text-red-500 text-sm mt-1">{{ validation.manga_id[0] }}</p>
    </div>


      </div>

      <!-- Chapter Number -->
      <div>
        <label for="chapter_number" class="block text-sm font-medium text-gray-700">Chapter Number</label>
        <input v-model="chapter.chapter_number" type="number" id="chapter_number" name="chapter_number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
        <p v-if="validation.chapter_number" class="text-red-500 text-sm mt-1">{{ validation.chapter_number[0] }}</p>
      </div>

      <!-- Content Type Selection -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Content Type</label>
        <div class="flex space-x-4">
          <label class="inline-flex items-center">
            <input type="radio" value="file" v-model="chapter.contentType" class="form-radio" />
            <span class="ml-2">File (PDF/CBZ)</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" value="url" v-model="chapter.contentType" class="form-radio" />
            <span class="ml-2">URL</span>
          </label>
        </div>
      </div>

      <!-- Content Input -->
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
        <div v-if="chapter.contentType === 'file'">
          <input
            type="file"
            id="content"
            @change="handleFileChangeContent"
            accept=".pdf,.cbz"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
          <p v-if="validation.content" class="text-red-500 text-sm mt-1">{{ validation.content[0] }}</p>
        </div>
        <div v-else-if="chapter.contentType === 'url'">
          <input
            v-model="chapter.content"
            type="url"
            id="content-url"
            name="content-url"
            placeholder="https://example.com/content"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
          <p v-if="validation.content" class="text-red-500 text-sm mt-1">{{ validation.content[0] }}</p>
        </div>
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

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Upload chapter
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
    chapter: {
      image: '',
      title: '',
      manga_id: '',
      chapter_number: '',
      content: '', // This will hold either file or URL based on the choice
      contentType: 'file', // New property to track the content type
    },
    mangas: [],
    validation: {},
    imagePreview: null,
  };
  },

  async mounted() {
    try {
      const chapterResponse = await this.$axios.get('/api/admin/mangasView');
      if (chapterResponse.data && chapterResponse.data.data && Array.isArray(chapterResponse.data.data)) {
        this.mangas = chapterResponse.data.data; // Corrected to use mangas
      } else {
        console.error('Invalid response structure for mangas:', chapterResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  methods: {
    handleFileChange(e) {
      let image = e.target.files[0];
      if (!image.type.match('image.*')) {
        e.target.value = '';
        this.chapter.image = null;
        this.imagePreview = null;
        this.$swal.fire({
          title: 'OOPS!',
          text: "Format File Tidak Didukung!",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        this.chapter.image = image;
        this.imagePreview = URL.createObjectURL(image);
      }
    },
    handleFileChangeContent(e) {
      let contentFile = e.target.files[0];
      if (!contentFile || (!contentFile.name.endsWith('.pdf') && !contentFile.name.endsWith('.cbz'))) {
        e.target.value = '';
        this.chapter.content = null;
        this.$swal.fire({
          title: 'OOPS!',
          text: "Format File Harus PDF atau CBZ!",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        this.chapter.content = contentFile;
      }
    },
    handleFileDrop(e) {
      e.preventDefault();
      let image = e.dataTransfer.files[0];

      if (!image.type.match('image.*')) {
        this.$swal.fire({
          title: 'OOPS!',
          text: "Format File Tidak Didukung!",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        this.chapter.image = image;
        this.imagePreview = URL.createObjectURL(image);
      }
    },
    async storechapter() {
  let formData = new FormData();
  formData.append('image', this.chapter.image);
  formData.append('title', this.chapter.title);
  formData.append('manga_id', this.chapter.manga_id.id || this.chapter.manga_id);
  formData.append('chapter_number', this.chapter.chapter_number);

  // Append content based on the selected content type
  if (this.chapter.contentType === 'file') {
    formData.append('content', this.chapter.content); // This will be the file
  } else if (this.chapter.contentType === 'url') {
    formData.append('url', this.chapter.content); // This will be the URL
  }


  try {
    await this.$axios.post(`/api/admin/chapters`, formData);
    this.$swal.fire({
      title: 'BERHASIL!',
      text: "Data Berhasil Diupdate!",
      icon: 'success',
      showConfirmButton: false,
      timer: 2000
    });
    this.$router.push({ name: 'admin-chapter' });
  } catch (error) {
    console.error('Error submitting chapter:', error.response.data);
    this.validation = error.response.data.errors; // Capture the validation errors
  }
}
  }
};
</script>

<style>
.ck-editor__editable {
  min-height: 200px;
}
</style>
