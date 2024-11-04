<template>
  <div class="relative">
    <!-- Sidebar dengan Transition untuk efek slide -->
    <transition name="slide-fade">
      <div v-if="isSidebarOpen" class="w-full md:w-64 bg-[#2d2d2c] h-auto md:h-screen shadow-md hidden md:block">
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center">
            <img alt="MangaDex Logo" class="w-10 h-10" src="https://storage.googleapis.com/a1aa/image/w0Di61ixga6NIht03hfB3mc9oODsKPvulltsfXlANn7rPStTA.jpg" />
            <span class="ml-2 text-xl font-bold text-white">MangaDex</span>
          </div>
          <!-- Tombol X untuk menutup sidebar -->
          <button @click="$emit('toggle-sidebar')" class="text-2xl text-white">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <nav>
          <ul class="ml-2">
            <li class="mb-4"><nuxt-link class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="/"><i class="fas fa-home mr-2"></i> Home</nuxt-link></li>
            <li class="mb-4"><nuxt-link class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="/all"><i class="fas fa-layer-group mr-2"></i> All list</nuxt-link></li>
            <li class="mb-4">
              <span @click="toggleTypes" class="cursor-pointer flex items-center text-white hover:bg-[#ff6740] p-2 rounded">
                <i class="fas fa-list mr-2"></i>
                Types <i :class="submenuIconClass" class="ml-2 submenu-icon"></i>
              </span>
              <transition name="fade-slide">
                <ul v-show="isTypesOpen" class="transition-all duration-300 ease-in-out">
                  <li class="mb-2"><nuxt-link class="flex text-white items-center hover:bg-[#ff6740] p-2 rounded" to="#">Doujinshi</nuxt-link></li>
                  <li class="mb-2"><nuxt-link class="flex text-white items-center hover:bg-[#ff6740] p-2 rounded" to="#">Manga</nuxt-link></li>
                  <li class="mb-2"><nuxt-link class="flex text-white items-center hover:bg-[#ff6740] p-2 rounded" to="#">Manhwa</nuxt-link></li>
                </ul>
              </transition>
            </li>
            <li class="mb-4"><nuxt-link class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="#"><i class="fas fa-tags mr-2"></i> Genres</nuxt-link></li>
            <li class="mb-4"><nuxt-link class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="#"><i class="fas fa-pencil-alt mr-2"></i> Authors</nuxt-link></li>
            <li class="mb-4"><nuxt-link class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="#"><i class="fas fa-users mr-2"></i> Groups</nuxt-link></li>
            <li class="mb-4"><nuxt-link class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="#"><i class="fas fa-th-list mr-2"></i> Series</nuxt-link></li>
            <li class="mb-4"><nuxt-link class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="#"><i class="fas fa-user-friends mr-2"></i> Characters</nuxt-link></li>
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
      isTypesOpen: false, // Untuk submenu Types
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
    }
  },
}
</script>

<style scoped>
/* Animasi untuk efek fade dan slide */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to /* slide-fade-leave-active diakhiri */ {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
