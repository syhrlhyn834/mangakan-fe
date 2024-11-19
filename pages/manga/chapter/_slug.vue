<template>
  <div class="relative min-h-screen flex flex-col">
    <!-- Navbar -->
    <div v-if="!isFullscreen" class="px-2 md:px-8 py-2 bg-gray-800 text-white">
      <div class="flex justify-between items-center">
        <h1 class="text-lg font-semibold truncate mb-4">{{ chapterTitle }}</h1>

        <!-- Menu Button to Open/Close -->
        <button
  @click="toggleMenu"
  class="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md mb-4 hover:bg-[#ff6740]"
>
  <i class="fas fa-bars"></i>
  Menu
</button>

      </div>


      <!-- Menu Section -->
      <div v-if="isMenuOpen" class="menu-container transition-all duration-300">
        <div class="flex flex-wrap gap-2">
          <button
            @click="setMode('single')"
            class="px-4 py-2 rounded-md transition-colors flex items-center gap-2"
            :class="mode === 'single' ? 'bg-[#ff6740] text-white' : 'bg-gray-700 hover:bg-gray-600'"
          >
            <i class="fas fa-image"></i>
            Single Page
          </button>
          <button
            @click="setMode('vertical')"
            class="px-4 py-2 rounded-md transition-colors flex items-center gap-2"
            :class="mode === 'vertical' ? 'bg-[#ff6740] text-white' : 'bg-gray-700 hover:bg-gray-600'"
          >
            <i class="fas fa-columns"></i>
            Scroll Down
          </button>
          <button
            @click="toggleFullscreen"
            class="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 hidden lg:flex items-center gap-2"
          >
            <i class="fas fa-expand"></i>
            Fullscreen
          </button>
        </div>

        <div class="mt-4">
          <!-- Chapter Dropdown with Icon -->
          <label for="chapter-select" class="block text-sm font-medium text-white mb-2">Select Chapter</label>
          <div class="relative">
            <select
              id="chapter-select"
              v-model="selectedChapter"
              @change="loadChapterData"
              class="block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6740] focus:border-transparent pr-10"
            >
              <option v-for="chapter in mangaData.chapters" :key="chapter.id" :value="chapter.id">
                Chapter {{ chapter.chapter_number }}: {{ chapter.title }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <i class="fas fa-chevron-down text-gray-400"></i>
            </div>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <!-- Prev Chapter with Icon -->
          <nuxt-link
            v-if="prevChapterSlug"
            :to="{ name: 'manga-chapter-slug', params: { slug: prevChapterSlug } }"
            class="px-4 py-2 bg-gray-700 text-white rounded-md flex items-center gap-2"
          >
            <i class="fas fa-chevron-left"></i>
            <span>Prev Chapter</span>
          </nuxt-link>

          <!-- Next Chapter with Icon -->
          <nuxt-link
            v-if="nextChapterSlug"
            :to="{ name: 'manga-chapter-slug', params: { slug: nextChapterSlug } }"
            class="px-4 py-2 bg-gray-700 text-white rounded-md flex items-center gap-2 justify-end"
          >
            <span>Next Chapter</span>
            <i class="fas fa-chevron-right"></i>
          </nuxt-link>
        </div>

        <!-- Page Select Dropdown with Icon -->
        <div class="mt-4" v-if="mode === 'single'">
          <label for="page-select" class="block text-sm font-medium text-white mb-2">Select Page</label>
          <div class="relative">
            <select
              id="page-select"
              v-model="currentPage"
              @change="onPageChange"
              class="block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6740] focus:border-transparent pr-10"
            >
              <option v-for="page in pageOptions" :key="page" :value="page">
                Page {{ page }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <i class="fas fa-chevron-down text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PDF Viewer -->
    <div class="flex overflow-hidden bg-gray-900">
      <!-- Single Page Mode -->
      <div
        v-if="mode === 'single'"
        class="relative h-screen w-screen flex items-center justify-center"
        ref="singlePageContainer"
        @click="handleSinglePageClick"
      >
        <canvas
          ref="pdfCanvas"
          class="mx-auto shadow-lg"
          style="width: auto; max-width: 100%; height: auto;"
        ></canvas>
      </div>
    </div>

    <!-- Vertical Scroll Mode -->
    <div v-if="mode === 'vertical'" class="overflow-y-auto h-full w-full" ref="verticalScrollContainer">
      <div v-for="page in renderedPages" :key="page" class="flex justify-center">
        <canvas
          ref="verticalCanvas"
          :data-page="page"
          class="shadow-lg"
          style="width: auto; max-width: 100%; height: auto;"
        ></canvas>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  head() {
  return {
    title: this.chapterTitle,
  };
},
  data() {
    return {
      mode: 'single', // Mode baca: 'single' atau 'vertical'
      chapterTitle: '',
      pdfUrl: '',
      pdf: null,
      currentPage: 1,
      totalPages: 0,
      renderedPages: [],
      isFullscreen: false, // Menyimpan status fullscreen
      mangaData: {},
      selectedChapter: null,
      pageOptions: [], // List of page numbers for the dropdown
      prevChapterSlug: null,
      nextChapterSlug: null,
      isMenuOpen: false, // Menyimpan status menu (apakah terbuka)
    };
  },
  mounted() {
    this.fetchMangaData();
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.onFullscreenChange); // Safari
    document.addEventListener('mozfullscreenchange', this.onFullscreenChange); // Firefox
    document.addEventListener('msfullscreenchange', this.onFullscreenChange); // IE/Edge
    window.addEventListener('resize', this.checkFullscreen);  // Periksa resize untuk mobile
    this.checkFullscreen();
  },
  beforeDestroy() {
    // Hapus event listeners untuk cleanup
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.onFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.onFullscreenChange);
    document.removeEventListener('msfullscreenchange', this.onFullscreenChange);
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    async fetchMangaData() {
      try {
        const slug = this.$route.params.slug;
        const response = await this.$axios.get(`/api/web/chapters/${slug}`);
        if (response.data.success) {
          this.mangaData = response.data.data.manga;
          this.selectedChapter = response.data.data.id; // Select the current chapter
          this.updateChapterNavigation();
          this.loadChapterData();
        }
      } catch (error) {
        console.error('Error fetching chapter data:', error);
      }
    },
    updateChapterNavigation() {
      const currentIndex = this.mangaData.chapters.findIndex(ch => ch.id === this.selectedChapter);

      // Update prev and next chapter slugs for navigation
      this.prevChapterSlug = currentIndex > 0 ? this.mangaData.chapters[currentIndex - 1].slug : null;
      this.nextChapterSlug = currentIndex < this.mangaData.chapters.length - 1 ? this.mangaData.chapters[currentIndex + 1].slug : null;
    },
    async loadChapterData() {
      const chapter = this.mangaData.chapters.find(ch => ch.id === this.selectedChapter);
      if (chapter) {
        this.chapterTitle = chapter.title;
        this.pdfUrl = chapter.content;
        this.currentPage = 1; // Reset to the first page of the chapter
        this.loadPdf();
        this.$router.push({ name: 'manga-chapter-slug', params: { slug: chapter.slug } }); // Update URL
      }
    },
    async loadPdf() {
      const pdfjsLib = window['pdfjs-dist/build/pdf'];
      this.pdf = await pdfjsLib.getDocument(this.pdfUrl).promise;
      this.totalPages = this.pdf.numPages;

      // Update pageOptions for the page dropdown
      this.pageOptions = Array.from({ length: this.totalPages }, (_, i) => i + 1);

      if (this.mode === 'single') {
        this.renderSinglePage(this.currentPage);
      } else {
        this.renderVerticalPages();
      }
    },
    async renderSinglePage(pageNumber) {
      const page = await this.pdf.getPage(pageNumber);
      const canvas = this.$refs.pdfCanvas;
      const context = canvas.getContext('2d');
      const viewport = page.getViewport({ scale: 1 });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      page.render({ canvasContext: context, viewport }).promise;
    },
    async renderVerticalPages() {
      this.renderedPages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.$nextTick(() => {
        this.renderedPages.forEach(async (pageNumber) => {
          const page = await this.pdf.getPage(pageNumber);
          const canvas = this.$refs.verticalCanvas.find(
            (c) => c.dataset.page == pageNumber
          );
          const context = canvas.getContext('2d');
          const viewport = page.getViewport({ scale: 1 });
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          page.render({ canvasContext: context, viewport }).promise;
        });
      });
    },
    setMode(newMode) {
      this.mode = newMode;
      if (newMode === 'single') {
        this.currentPage = 1;
        this.renderSinglePage(this.currentPage);
      } else {
        this.renderVerticalPages();
      }
    },
    handleSinglePageClick(event) {
      const rect = this.$refs.pdfCanvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;

      // Jika klik di sisi kiri canvas
      if (clickX < rect.width / 2) {
        this.prevPage();
      } else {
        this.nextPage();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.renderSinglePage(this.currentPage);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.renderSinglePage(this.currentPage);
      }
    },
    prevChapter() {
      const currentIndex = this.mangaData.chapters.findIndex(ch => ch.id === this.selectedChapter);
      if (currentIndex > 0) {
        this.selectedChapter = this.mangaData.chapters[currentIndex - 1].id;
        this.loadChapterData();
      }
    },
    nextChapter() {
      const currentIndex = this.mangaData.chapters.findIndex(ch => ch.id === this.selectedChapter);
      if (currentIndex < this.mangaData.chapters.length - 1) {
        this.selectedChapter = this.mangaData.chapters[currentIndex + 1].id;
        this.loadChapterData();
      }
    },
    onPageChange() {
      this.renderSinglePage(this.currentPage);
    },
    toggleFullscreen() {
      if (!this.isFullscreen) {
        this.enterFullscreen();
      } else {
        this.exitFullscreen();
      }
    },
    enterFullscreen() {
      const container = this.mode === 'single'
        ? this.$refs.singlePageContainer
        : this.$refs.verticalScrollContainer;

      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.mozRequestFullScreen) { // Firefox
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) { // Chrome, Safari, Opera
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) { // IE/Edge
        container.msRequestFullscreen();
      }
      this.isFullscreen = true;
    },
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
      this.isFullscreen = false;
    },
    onFullscreenChange() {
      if (!document.fullscreenElement &&
          !document.webkitFullscreenElement &&
          !document.mozFullScreenElement &&
          !document.msFullscreenElement) {
        this.isFullscreen = false;
      } else {
        this.isFullscreen = true;
      }
    },
    checkFullscreen() {
      if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        this.isFullscreen = true;
      } else {
        this.isFullscreen = false;
      }
    },
  },
};
</script>



<style>
/* Custom scrollbar tetap dipakai */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #777;
}


</style>
