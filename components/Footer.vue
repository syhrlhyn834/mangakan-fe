<template>
<div>
<div class="absolute bottom-0 w-full p-4 text-gray-500 text-sm">
  <div class="flex items-center">
    <span class="text-white" v-for="(footer, index) in footers" :key="`footer-copyright-${footer.id}-${index}`"><i class="fa fa-copyright text-white" aria-hidden="true"></i> {{ footer.copyright }}</span>
  </div>
</div>
</div>
</template>

<script>
export default {
  data() {
    return {
  footers: []
    };
  },
  async fetch() {
    try {
      const [footersResponse] = await Promise.all([
        this.$axios.get('/api/web/footers')
      ]);
      this.footers = footersResponse.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
};
</script>

<style>

</style>
