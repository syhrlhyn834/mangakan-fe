<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Chapter Manga</h1>
    <div class="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <input v-model="search" @input="searchData" type="text" id="table-search" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
      </div>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Manga
            </th>
            <th scope="col" class="px-6 py-3">
              Judul
            </th>
            <th scope="col" class="px-6 py-3">
              Chapter
            </th>
            <th scope="col" class="px-6 py-3">
              Gambar
            </th>
            <th scope="col" class="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="chapter in filteredchapters" :key="chapter.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ chapter.manga?.title || 'No title available' }}
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ chapter.title }}
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ chapter.chapter_number }}
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <v-img
                  :src="chapter.image"
                  class="h-32 w-32"
                  alt="Logo"
                  :lazy-src="chapter.image"
                  contain
                ></v-img>
            </td>
            <td class="px-9 py-4 flex space-x-4">
              <router-link :to="{ name: 'admin-chapter-edit-id', params: { id: chapter.id } }" class="text-blue-600 dark:text-blue-500 hover:underline">
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.304 4.844 16.156 6.696M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844-1.707-1.707 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                </svg>
              </router-link>
              <a href="#" @click.prevent="deletechapter(chapter.id)" class="text-red-600 dark:text-red-500 hover:underline">
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <nav class="flex items-center flex-wrap md:flex-row justify-between pt-4 md:pb-20" aria-label="Table navigation">
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.from }}</span> to <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.to }}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.total }}</span></span>
      <ul class="inline-flex -space-x-px text-sm h-8">
        <li>
          <button @click.prevent="changePage(pagination.current_page - 1)" :disabled="!pagination.prev_page_url" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
        </li>
        <li v-for="page in pagination.last_page" :key="page">
          <button @click.prevent="changePage(page)" :class="{'text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-white': page === pagination.current_page, 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': page !== pagination.current_page}" class="flex items-center justify-center px-3 h-8 leading-tight border">
            {{ page }}
          </button>
        </li>
        <li>
          <button @click.prevent="changePage(pagination.current_page + 1)" :disabled="!pagination.next_page_url" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
        </li>
      </ul>
    </nav>

    <!-- Speed dial menu -->
    <div
      data-dial-init
      class="fixed bottom-6 right-6 group"
    >
      <button
    type="button"
    @click="$router.push({ name: 'admin-chapter-create' })"
    class="flex items-center justify-center ml-auto text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
  >
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z"
      />
    </svg>
    <span class="sr-only">Add chapter</span>
  </button>
</div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  head() {
  return {
    title: 'Chapter',
  };
},


  data() {
    return {
      search: '',
      filteredchapters: [],
      pagination: {}
    };
  },
  async asyncData({ $axios, query }) {
    const search = query.q || '';
    const page = query.page || 1;

    try {
      const response = await $axios.$get(`/api/admin/chapters?q=${search}&page=${page}`);
      return {
        filteredchapters: response.data.data,
        pagination: response.data,
        search
      };
    } catch (error) {
      console.error('Error fetching chapters:', error);
      return {
        filteredchapters: [],
        pagination: {},
        search
      };
    }
  },
  methods: {
    async fetchchapters() {
      try {
        const response = await this.$axios.$get(`/api/admin/chapters?q=${this.search}`);
        this.filteredchapters = response.data.data;
        this.pagination = response.data;
      } catch (error) {
        console.error('Error fetching chapters:', error);
      }
    },
    async deletechapter(id) {
      try {
        const confirmed = await this.$swal.fire({
          title: 'Are you sure?',
          text: 'You are about to delete this chapter.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel'
        });

        if (confirmed.isConfirmed) {
          await this.$axios.delete(`/api/admin/chapters/${id}`);
          await this.fetchchapters(); // Refresh data after deletion
          await this.$swal.fire({
            title: 'Deleted!',
            text: 'The chapter has been deleted.',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
        }
      } catch (error) {
        console.error('Error deleting chapter:', error);
        this.$swal.fire({
          title: 'Error',
          text: 'Failed to delete chapter.',
          icon: 'error',
          timer: 2000
        });
      }
    },
    async changePage(page) {
      try {
        const response = await this.$axios.$get(`/api/admin/chapters?q=${this.search}&page=${page}`);
        this.filteredchapters = response.data.data;
        this.pagination = response.data;
        this.$router.push({ path: this.$route.path, query: { q: this.search, page: page } });
      } catch (error) {
        console.error('Error changing page:', error);
      }
    },
    searchData() {
      this.fetchchapters();
    }
  }
};
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
