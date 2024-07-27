<template>
  <div>
    <a-layout>
      <a-layout-header class="header">
        <a-menu theme="dark" mode="horizontal" :selectedKeys="[path]">
          <a-menu-item
            v-for="route in routes"
            :key="route.path"
            :class="selectedTab(route.path)"
          >
            <router-link :to="route.path" style="text-transform: capitalize">
              {{ route.name }}
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content class="content-layout">
        <RouterView />
      </a-layout-content>
    </a-layout>
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
      return this.$route.path === path ? "ant-menu-item-selected" : "";
    },
  },
  watch: {
    "$route.path"(newPath) {
      this.path = newPath;
    },
  },
};
</script>

<style scoped>
.content-layout {
  padding: 0 50px;
}
@media (max-width: 600px) {
  .content-layout {
    padding: 0 10px;
  }
}
</style>
