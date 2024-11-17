<template>
  <div class="bg-[#191b1d] text-white p-4 flex flex-col items-center md:flex-row md:justify-between sticky top-0 z-50">
    <div class="flex items-center justify-center mb-2 md:hidden">
      <img
        v-if="logoImage"
        :src="logoImage"
        alt="Logo"
        class="w-12 h-12"
      />
    </div>
    <div class="flex items-center justify-between w-full md:w-auto">
      <!-- Tombol Hamburger khusus desktop -->
      <button v-if="!isSidebarOpen" @click="$emit('toggle-sidebar')" class="mr-2 text-lg hidden md:block">
        <i class="fas fa-bars"></i>
      </button>
      <!-- Tombol Hamburger untuk mobile -->
      <button @click="toggleMenu" class="mr-2 text-lg md:hidden">
        <i class="fas fa-bars"></i>
      </button>
      <div class="relative w-full">
        <input
  v-model="searchQuery"
  type="text"
  placeholder="Cari Judul/Genre/Series/Character/Author/Group..."
  class="w-full max-w-full p-2 pr-10 rounded bg-gray-800 text-white"
/>

      </div>
      <button @click="search" class="ml-2 text-lg">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <!-- Sidebar Mobile -->
    <transition name="slide">
      <div v-if="isMenuOpen" class="fixed inset-0 bg-[#2d2d2c] bg-opacity-75 z-50">
        <div class="absolute left-0 top-0 h-full w-full md:w-64 bg-[#2d2d2c] text-white shadow-lg transition-transform transform" :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'">
          <div class="flex justify-between items-center p-4">
            <div class="flex items-center">
              <img
                v-if="logoImage"
                :src="logoImage"
                alt="Logo"
                class="mr-2 h-10"
              />
              <h2 class="text-2xl font-bold">{{ logoName }}</h2>
            </div>
            <button @click="toggleMenu" class="text-2xl">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <ul class="ml-2 max-h-[80vh] overflow-y-auto">
            <li class="mb-4">
              <nuxt-link @click.native="closeMenu" class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="/">
                <i class="fas fa-home mr-2"></i> Home
              </nuxt-link>
            </li>
            <li class="mb-4">
              <nuxt-link @click.native="closeMenu" class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="/all">
                <i class="fas fa-layer-group mr-2"></i> All list
              </nuxt-link>
            </li>
            <li class="mb-4">
              <span @click="toggleTypesMenu" class="cursor-pointer flex items-center text-white hover:bg-[#ff6740] p-2 rounded">
                <i class="fas fa-list mr-2"></i>
                Types
                <i :class="['fas', 'submenu-icon', isTypesMenuOpen ? 'fa-chevron-down' : 'fa-chevron-right']" class="ml-2 transition-transform"></i>
              </span>
              <transition name="expand">
                <ul v-if="isTypesMenuOpen" class="ml-4 transition-all duration-300 overflow-hidden" :style="{ maxHeight: isTypesMenuOpen ? '200px' : '0' }">
                  <li class="mb-2"><nuxt-link @click.native="closeMenu" class="flex text-white items-center hover:bg-[#ff6740] p-2 rounded" to="#"><i class="fas fa-tag mr-2"></i> Doujinshi</nuxt-link></li>
                  <li class="mb-2"><nuxt-link @click.native="closeMenu" class="flex text-white items-center hover:bg-[#ff6740] p-2 rounded" to="#"><i class="fas fa-tag mr-2"></i> Manga</nuxt-link></li>
                  <li class="mb-2"><nuxt-link @click.native="closeMenu" class="flex text-white items-center hover:bg-[#ff6740] p-2 rounded" to="#"><i class="fas fa-tag mr-2"></i> Manhwa</nuxt-link></li>
                </ul>
              </transition>
            </li>
            <li class="mb-4"><nuxt-link @click.native="closeMenu" class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="#"><i class="fas fa-tags mr-2"></i> Genres</nuxt-link></li>
            <li class="mb-4"><nuxt-link @click.native="closeMenu" class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="#"><i class="fas fa-pencil-alt mr-2"></i> Authors</nuxt-link></li>
            <li class="mb-4"><nuxt-link @click.native="closeMenu" class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="#"><i class="fas fa-users mr-2"></i> Groups</nuxt-link></li>
            <li class="mb-4"><nuxt-link @click.native="closeMenu" class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="#"><i class="fas fa-th-list mr-2"></i> Series</nuxt-link></li>
            <li class="mb-4"><nuxt-link @click.native="closeMenu" class="flex items-center text-white hover:bg-[#ff6740] p-2 rounded" to="#"><i class="fas fa-user-friends mr-2"></i> Characters</nuxt-link></li>
          </ul>
        </div>
        <div class="absolute bottom-0 w-full p-4 text-gray-500 text-sm">
          <div class="flex items-center">
            <span class="text-white"><i class="fa fa-copyright text-white" aria-hidden="true"></i> Syahril Haryono</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isMenuOpen: false,
      isTypesMenuOpen: false,
      searchQuery: '', // Variabel untuk menyimpan nilai input pencarian
      logoImage: '', // Variabel untuk menyimpan URL logo
      logoName: '',
    };
  },
  mounted() {
    this.fetchLogo();
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleTypesMenu() {
      this.isTypesMenuOpen = !this.isTypesMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    search() {
      if (this.searchQuery.trim()) {
        // Arahkan ke halaman pencarian dengan slug berdasarkan input
        this.$router.push({ name: 'search-slug', params: { slug: this.searchQuery } });
      }
    },
    async fetchLogo() {
      try {
        const response = await this.$axios.get('/api/web/headers');
        if (response.data.success && response.data.data.length > 0) {
          this.logoImage = response.data.data[0].image;  // Ambil URL image dari API
          this.logoName = response.data.data[0].name;
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    },
  },
};
</script>


<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(-100%);
}

.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
}
.expand-enter {
  max-height: 0;
  opacity: 0;
}
.expand-enter-to {
  max-height: 200px; /* atau nilai yang cukup untuk menampung semua item */
  opacity: 1;
}
.expand-leave {
  max-height: 200px;
  opacity: 1;
}
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

/* Style untuk ikon submenu */
.submenu-icon {
  transition: transform 0.3s ease; /* Transisi halus saat berputar */
}
</style>
