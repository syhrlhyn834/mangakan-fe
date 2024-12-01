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
</style>
