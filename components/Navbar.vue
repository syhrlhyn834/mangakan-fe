<template>
  <div>
    <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://arlchoose.id" class="flex items-center space-x-3 rtl:space-x-reverse" v-for="(header, index) in headers" :key="header.id">
            <v-img
              :src="header.image2"
              class="h-8 w-8"
              alt="Logo"
              v-lazy="header.image2"
            ></v-img>
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{{ header.name }}</span>
        </a>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <NuxtLink to="/login">
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Client Login
            </button>
          </NuxtLink>

          <button @click="toggleMenu" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" :aria-expanded="isMenuOpen ? 'true' : 'false'" aria-controls="navbar-sticky">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path :stroke="isMenuOpen ? 'black' : 'currentColor'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        <div class="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul :class="{'hidden md:flex': !isMenuOpen, 'flex flex-col md:flex-row': isMenuOpen}" class="p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NuxtLink to="/" exact class="nav-link" aria-current="page">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" exact class="nav-link">About</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" exact class="nav-link">Blog</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/gallery" exact class="nav-link">Gallery</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" exact class="nav-link">Contact</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/app" exact class="nav-link">App</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>


<script>
export default {
  data() {
    return {
      headers: [],
      isMenuOpen: false
    };
  },
  async fetch() {
    try {
      const [headersResponse] = await Promise.all([
        this.$axios.get('/api/web/headers')
      ]);
      this.headers = headersResponse.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  },
};
</script>

<style scoped>
.nav-link {
  display: block;
  padding: 0.5rem 0.75rem;
  color: #1f2937; /* text-gray-900 */
  border-radius: 0.375rem; /* rounded */
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #f9fafb; /* bg-gray-100 */
}

.nuxt-link-active,
.nuxt-link-exact-active {
  color: #1d4ed8; /* text-blue-700 */
  background-color: #e0f2fe; /* bg-blue-100 */
}
</style>
