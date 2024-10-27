<template>
  <div>
    <!-- navbar -->
    <Navbar />
    <div class="mt-20 sm:mb-0 mb-22">
      <!-- content -->
      <Nuxt />
    </div>

    <!-- footer -->
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer,
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

<style>
</style>
