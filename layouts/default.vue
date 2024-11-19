<template>
  <div class="flex flex-col md:flex-row bg-[#191b1d]">
    <!-- Sidebar Komponen (Hanya Desktop) -->
    <SidebarNavbar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />

    <!-- Konten Utama dengan Scroll -->
    <div :class="['flex-1 overflow-y-auto', isSidebarOpen ? 'md:ml-64' : 'md:ml-0']">
      <!-- Navbar Komponen (Mobile/Desktop) -->
      <Navbar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
      <div class="mb-4">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarNavbar from '~/components/SidebarNavbar.vue';
import Navbar from '~/components/Navbar.vue';

export default {
  middleware: 'auth',
  components: {
    SidebarNavbar,
    Navbar,
  },
  data() {
    return {
      isSidebarOpen: true, // Default terbuka untuk desktop
      headerMedia: null,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
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
</style>
