<template>
  <div class="flex flex-wrap justify-center p-4">
    <div v-for="(item, index) in cards" :key="index" class="flex items-center justify-center rounded bg-gray-50 h-36 w-full sm:w-80 m-2 dark:bg-gray-800">
      <a href="#" class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div class="flex items-center space-x-2">
          <svg v-if="item.icon" :class="item.iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path :d="item.iconPath"></path>
          </svg>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ item.title }}</h5>
        </div>
        <p class="font-normal text-gray-700 dark:text-gray-400 text-4xl">{{ item.value }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  head() {
  return {
    title: 'Dashboard',
  };
},
  data() {
    return {
      cards: []
    };
  },
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.$get('/api/admin/dashboard');
      return {
        cards: [
          {
            title: 'Total Author',
            value: data.authors,
            iconClass: 'w-8 h-8 text-gray-900 dark:text-white',
            iconPath: 'M4 4v16h16V4H4z'
          },
          {
            title: 'Total Chapter',
            value: data.chapters,
            iconClass: 'w-8 h-8 text-gray-900 dark:text-white',
            iconPath: 'M9 5v14l7-7-7-7z'
          },
          {
            title: 'Total Character',
            value: data.characters,
            iconClass: 'w-8 h-8 text-gray-900 dark:text-white',
            iconPath: 'M4 4v16h16V4H4z'
          },
          {
            title: 'Total Genre',
            value: data.genres,
            iconClass: 'w-8 h-8 text-gray-900 dark:text-white',
            iconPath: 'M3 7v10l7-5-7-5zm0 0h18M3 7l7 5-7 5m0 0h18'
          },
          {
            title: 'Total Group',
            value: data.groups,
            iconClass: 'w-8 h-8 text-gray-900 dark:text-white',
            iconPath: 'M3 7v10l7-5-7-5zm0 0h18M3 7l7 5-7 5m0 0h18'
          },
          {
            title: 'Total Manga',
            value: data.mangas,
            iconClass: 'w-8 h-8 text-gray-900 dark:text-white',
            iconPath: 'M3 7v10l7-5-7-5zm0 0h18M3 7l7 5-7 5m0 0h18'
          },
          {
            title: 'Total Series',
            value: data.series,
            iconClass: 'w-8 h-8 text-gray-900 dark:text-white',
            iconPath: 'M3 7v10l7-5-7-5zm0 0h18M3 7l7 5-7 5m0 0h18'
          },
        ]
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return {
        cards: []
      };
    }
  },
};
</script>

<style scoped>
/* CSS tambahan dapat ditambahkan di sini jika diperlukan */
</style>
