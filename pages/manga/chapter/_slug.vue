<template>
  <div class="relative h-screen w-screen flex flex-col">
    <!-- Navbar -->
    <div v-if="!isFullscreen" class="px-4 py-2 bg-gray-800 text-white">
      <h1 class="text-lg font-semibold truncate mb-4">{{ chapterTitle }}</h1>
      <div class="flex space-x-2">
        <button
          @click="setMode('single')"
          class="px-3 py-1 rounded-md transition-colors"
          :class="mode === 'single' ? 'bg-[#ff6740] text-white' : 'bg-gray-700 hover:bg-gray-600'"
        >
          Single Page
        </button>
        <button
          @click="setMode('vertical')"
          class="px-3 py-1 rounded-md transition-colors"
          :class="mode === 'vertical' ? 'bg-[#ff6740] text-white' : 'bg-gray-700 hover:bg-gray-600'"
        >
          Scroll Down
        </button>
        <button
          @click="toggleFullscreen"
          class="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600"
        >
          Fullscreen
        </button>
      </div>
    </div>

   <!-- PDF Viewer -->
<div class="flex-grow overflow-hidden bg-gray-900">
  <!-- Single Page Mode -->
  <div
    v-if="mode === 'single'"
    class="relative h-full w-full flex items-center justify-center"
    ref="singlePageContainer"
    @click="handleSinglePageClick"
  >
    <canvas
      ref="pdfCanvas"
      class="h-full mx-auto shadow-lg"
      style="max-width: 100%;"
    ></canvas>
  </div>

  <!-- Vertical Scroll Mode -->
  <div v-if="mode === 'vertical'" class="overflow-y-auto h-full w-full" ref="verticalScrollContainer">
    <div
      v-for="page in renderedPages"
      :key="page"
      class="flex justify-center"
    >
      <canvas
        ref="verticalCanvas"
        :data-page="page"
        class="shadow-lg"
        style="width: auto; max-width: 100%; height: auto;"
      ></canvas>
    </div>
  </div>
</div>
  </div>
</template>
<script>
export default {
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
    };
  },
  mounted() {
  this.fetchChapterData();
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
    async fetchChapterData() {
      try {
        const slug = this.$route.params.slug;
        const response = await this.$axios.get(`/api/web/chapters/${slug}`);
        if (response.data.success) {
          this.chapterTitle = response.data.data.title;
          this.pdfUrl = response.data.data.content;
          this.loadPdf();
        }
      } catch (error) {
        console.error('Error fetching chapter data:', error);
      }
    },
    async loadPdf() {
      const pdfjsLib = window['pdfjs-dist/build/pdf'];
      this.pdf = await pdfjsLib.getDocument(this.pdfUrl).promise;
      this.totalPages = this.pdf.numPages;
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
  // Pastikan status fullscreen diperbarui dengan benar
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
      // Memastikan status fullscreen saat aplikasi dimuat
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
