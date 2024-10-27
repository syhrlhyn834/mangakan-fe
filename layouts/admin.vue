<template>
  <div class="flex flex-col md:flex-row">
    <Sidebar />
    <div class="flex-1 mt-18 p-4 max-w-full mx-auto md:max-w-7xl md:ml-64">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      headerMedia: null,
    };
  },

  async fetch() {
    try {
      const response = await this.$axios.get('/api/web/headers');
      this.headerMedia = response.data;
    } catch (error) {
      console.error('Error fetching header:', error);
    }
  },

  head() {
    const headerTitle = this.headerMedia?.data?.[0]?.title || 'Manga';
    return {
      titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - ${headerTitle}` : headerTitle;
      }
    };
  }
};
</script>

<style scoped>
/* Gaya kustom jika diperlukan */
</style>
