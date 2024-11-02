<template>
<div>
  <div class="bg-[#191b1d] text-white">
<div v-for="(footer, index) in footers" :key="`footer-copyright-${footer.id}-${index}`">{{ footer.copyright }}

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
