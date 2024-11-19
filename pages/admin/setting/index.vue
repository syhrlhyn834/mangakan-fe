<template>
  <div class="pt-4">
    <form @submit.prevent="storeData">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Header</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
              <div class="mt-2">
                <input type="text" v-model="header.title" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <div v-if="validation.title" class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                  </svg>
                  <span class="sr-only">Info</span>
                  <div>
                    <span class="font-medium">{{ validation.title[0] }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
              <div class="mt-2">
                <input type="text" v-model="header.name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <div v-if="validation.name" class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                  </svg>
                  <span class="sr-only">Info</span>
                  <div>
                    <span class="font-medium">{{ validation.name[0] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
            <div>
              <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Logo</label>
              <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                   @dragover.prevent @dragenter.prevent @drop.prevent="handleFileDrop($event, 'image')">
                <div class="text-center">
                  <div class="mt-4 flex text-sm leading-6 text-gray-600">
                    <label for="file-upload1" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span class="text-center">Upload a file</span>
                      <input id="file-upload1" type="file" class="sr-only" @change="handleFileChange($event, 'image')" />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs leading-5 text-gray-600">PNG, JPG, JPEG, SVG up to 10MB</p>
                  <div class="pt-8">
                    <!-- Only show the old image if there's no new image -->
                    <img v-if="!imagePreview1 && header.image" :src="header.image" alt="Old Image Preview" class="mt-4 h-28 w-50 object-cover" />
                    <!-- Show the new image preview -->
                    <img v-if="imagePreview1" :src="imagePreview1" alt="New Image Preview" class="mt-4 h-28 w-50 object-cover" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Icon</label>
              <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                   @dragover.prevent @dragenter.prevent @drop.prevent="handleFileDrop($event, 'image2')">
                <div class="text-center">
                  <div class="mt-4 flex text-sm leading-6 text-gray-600">
                    <label for="file-upload2" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span class="text-center">Upload a file</span>
                      <input id="file-upload2" type="file" class="sr-only" @change="handleFileChange($event, 'image2')" />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs leading-5 text-gray-600">PNG, JPG, JPEG, SVG up to 10MB</p>
                  <div class="pt-8">
                    <!-- Only show the old image if there's no new image -->
                    <img v-if="!imagePreview2 && header.image2" :src="header.image2" alt="Old Image Preview" class="mt-4 h-28 w-50 object-cover" />
                    <!-- Show the new image preview -->
                    <img v-if="imagePreview2" :src="imagePreview2" alt="New Image Preview" class="mt-4 h-28 w-50 object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--Footer-->
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Footer</h2>
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="footer" class="block text-sm font-medium leading-6 text-gray-900">Copyright</label>
              <div class="mt-2">
                <input type="text" v-model="footer.copyright" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  head() {
  return {
    title: 'Setting',
  };
},
  data() {
    return {
      // state header
      header: {
        image: '',
        image2: '',
        name: '',
        title: ''
      },
      // state footer
      footer: {
        copyright: ''
      },
      // state validation
      validation: [],
      // state for image preview
      imagePreview1: null,
      imagePreview2: null
    }
  },
  mounted() {
    // fetching data header
    this.$axios.get(`/api/admin/headers/1`)
      .then(response => {
        // assign response data to state "header"
        this.header.name = response.data.data.name
        this.header.title = response.data.data.title
        this.header.image = response.data.data.image
        this.header.image2 = response.data.data.image2
      })

    // fetching data footer
    this.$axios.get(`/api/admin/footers/1`)
      .then(response => {
        // assign response data to state "footer"
        this.footer.copyright = response.data.data.copyright
      })
  },
  methods: {
    handleFileChange(e, imageType) {
      let image = e.target.files[0];
      if (!image) {
        this.$swal.fire({
          title: 'OOPS!',
          text: "Tidak ada file yang dipilih!",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
        return;
      }
      if (!image.type.match('image.*')) {
        e.target.value = '';
        this.$swal.fire({
          title: 'OOPS!',
          text: "Format File Tidak Didukung!",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        if (imageType === 'image') {
          this.header.image = image;
          this.imagePreview1 = URL.createObjectURL(image);
        } else if (imageType === 'image2') {
          this.header.image2 = image;
          this.imagePreview2 = URL.createObjectURL(image);
        }
      }
    },
    handleFileDrop(e, imageType) {
      e.preventDefault();
      let image = e.dataTransfer.files[0];
      if (!image) {
        this.$swal.fire({
          title: 'OOPS!',
          text: "Tidak ada file yang di-drop!",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
        return;
      }
      if (!image.type.match('image.*')) {
        this.$swal.fire({
          title: 'OOPS!',
          text: "Format File Tidak Didukung!",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        if (imageType === 'image') {
          this.header.image = image;
          this.imagePreview1 = URL.createObjectURL(image);
        } else if (imageType === 'image2') {
          this.header.image2 = image;
          this.imagePreview2 = URL.createObjectURL(image);
        }
      }
    },
    async storeData() {
      try {
        // Define formData for header
        let formData = new FormData();

        // Append images only if they are new
        if (this.imagePreview1) {
          formData.append('image', this.header.image);
        }
        if (this.imagePreview2) {
          formData.append('image2', this.header.image2);
        }

        formData.append('name', this.header.name);
        formData.append('title', this.header.title);
        formData.append("_method", "PATCH");

        // Sending header data to server
        await this.$axios.post(`/api/admin/headers/1`, formData);

        // Define formData for footer
        let footerData = new FormData();
        footerData.append('copyright', this.footer.copyright);
        footerData.append("_method", "PATCH");

        // Sending footer data to server
        await this.$axios.post(`/api/admin/footers/1`, footerData);

        // Sweet alert
        this.$swal.fire({
          title: 'BERHASIL!',
          text: "Data Berhasil Diupdate!",
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });

        // Redirect, if success store data
        this.$router.push({
          name: 'admin-setting'
        });
      } catch (error) {
        // Assign error to state "validation"
        this.validation = error.response.data;
      }
    }
  }
}
</script>


<style>
</style>
