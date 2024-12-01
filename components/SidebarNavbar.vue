<template>
  <div class="relative">
    <transition name="slide-fade">
      <div v-if="isSidebarOpen" class="w-full md:w-64 bg-[#2d2d2c] h-auto md:h-screen shadow-md hidden md:block fixed top-0 left-0 z-10">
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center">
            <img
              v-if="logoImage"
              :src="logoImage"
              alt="Logo MangaDex"
              class="w-10 h-10"
            />
            <span class="ml-2 text-xl font-bold text-white">{{ logoName }}</span>
          </div>
          <button @click="$emit('toggle-sidebar')" class="text-2xl text-white">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <nav>
          <ul class="ml-2">
            <li class="mb-4"><nuxt-link class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="/"><i class="fas fa-home mr-2"></i> Home</nuxt-link></li>
            <li class="mb-4"><nuxt-link class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="/genre"><i class="fas fa-tags mr-2"></i> Genres</nuxt-link></li>
            <li class="mb-4"><nuxt-link class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="/author"><i class="fas fa-pencil-alt mr-2"></i> Authors</nuxt-link></li>
            <li class="mb-4"><nuxt-link class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="/group"><i class="fas fa-users mr-2"></i> Groups</nuxt-link></li>
            <li class="mb-4"><nuxt-link class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="/series"><i class="fas fa-th-list mr-2"></i> Series</nuxt-link></li>
            <li class="mb-4"><nuxt-link class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="/character"><i class="fas fa-user-friends mr-2"></i> Characters</nuxt-link></li>
          </ul>
        </nav>
        <Footer />
      </div>
    </transition>
  </div>
</template>

<script>
import Footer from './Footer.vue';

export default {
  name: 'SidebarNavbar',
  components: {
    Footer,
  },
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isTypesOpen: false,
      logoImage: '',  // Menyimpan URL logo dari API
      logoName: '',    // Menyimpan nama logo dari API
    };
  },
  computed: {
    submenuIconClass() {
      return this.isTypesOpen ? 'fas fa-chevron-down' : 'fas fa-chevron-right';
    }
  },
  methods: {
    toggleTypes() {
      this.isTypesOpen = !this.isTypesOpen;
    },
    async fetchLogo() {
      try {
        const response = await this.$axios.get('/api/web/headers');
        if (response.data.success && response.data.data.length > 0) {
          this.logoImage = response.data.data[0].image;  // Menyimpan URL logo ke data
          this.logoName = response.data.data[0].name;    // Menyimpan nama logo ke data
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    }
  },
  mounted() {
    this.fetchLogo();  // Mengambil logo saat komponen dimuat
  }
}
</script>



<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
