<template>
  <div v-if="isPdf" class="w-full h-full bg-white">
    <!-- PDF Viewer using vue-pdf -->
    <pdf :src="chapter.content" v-if="chapter.content" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPdf: false,
      chapter: {
        content: "http://127.0.0.1:8000/storage/chapters_content/B98wWjtuGDd8XOExFiIYxi1KgOVHmdUZriczd8lg.pdf",
      },
    };
  },
  mounted() {
    // Ensure the content URL is set properly and it’s a valid PDF file.
    if (this.chapter.content && this.chapter.content.endsWith('.pdf')) {
      this.isPdf = true;
    }
  },
};
</script>
