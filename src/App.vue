<template>
  <div>
    <a-layout
      ><a-layout-header class="header">
        <a-menu theme="dark" mode="horizontal">
          <a-menu-item
            v-for="route in routes"
            :key="route.path"
            :class="selectedTab(route.path)"
          >
            <router-link :to="route.path" style="text-transform: capitalize"
              >{{ route.name }}
            </router-link>
          </a-menu-item>
        </a-menu> </a-layout-header
      ><a-layout-content style="padding: 0 50px">
        <RouterView /> </a-layout-content
    ></a-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: this.$route.path,
      routes: this.$router.getRoutes(),
    };
  },
  methods: {
    selectedTab(path) {
      if (this.$route.path == path) return "ant-menu-item-selected";
      else return "";
    },
  },
  watch: {
    "$route.path"(newPath) {
      this.path = newPath;
    },
  },
};
</script>

<style scoped></style>
