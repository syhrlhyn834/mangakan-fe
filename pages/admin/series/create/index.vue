<template>
  <div class="pt-4">
    <form @submit.prevent="storeseries">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Series</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">Untuk Menyimpan data series Manga.</p>
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nama Lengkap</label>
              <div class="mt-2">
                <input type="text" v-model="series.name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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

        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  //layout
  layout: 'admin',


  data() {
      return {
          //state series
          series: {
              name: '',
          },
          //state validation
          validation: []
      }
  },

  methods: {
      //storeseries method
      async storeseries() {

          //sending data to server
          await this.$axios.post('/api/admin/series', {

              //data
              name: this.series.name,
          })
          .then(() => {

              //sweet alert
              this.$swal.fire({
                  title: 'BERHASIL!',
                  text: "Data Berhasil Disimpan!",
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000
              })

              //redirect, if success store data
              this.$router.push({
              name: 'admin-series'
              })

          })
          .catch(error => {

              //assign error to state "validation"
              this.validation = error.response.data
          })
      }
  }

}
</script>
