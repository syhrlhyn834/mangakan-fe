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
  middleware: 'auth',
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
    // Ambil title dan image2 dari data API
    const headerTitle = this.headerMedia?.data?.[0]?.title || 'Default Title';
    const image2 = this.headerMedia?.data?.[0]?.image2 || 'https://api.arlchoose.store/storage/headers/TPfDh0sK6PhlA5wjeN9oymvbtU0U0XIyxAsJmv29.png';

    return {
        titleTemplate: (titleChunk) => {
            return titleChunk ? `${titleChunk} - ${headerTitle}` : headerTitle;
        },
        link: [
            {
              rel: 'icon',
              type: 'image/x-icon',
                href: image2 // Favicon dari image2
            }
        ]
    };
}
};
</script>

<style scoped>
/* Gaya kustom jika diperlukan */
</style>
