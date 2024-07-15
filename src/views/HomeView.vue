<template>
  <main><h1>Service App STG</h1></main>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("getAllServices");
  },
};
</script>
