<template>
  <div>
    <a-layout
      ><a-layout-header class="header" style="display: flex">
        <a-menu theme="dark" mode="horizontal">
          <a-menu-item key="1" :class="selectedTab('/register')">
            <router-link to="/register">Register </router-link>
          </a-menu-item>
          <a-menu-item key="2" :class="selectedTab('/about')">
            <router-link to="/about">About </router-link></a-menu-item
          >
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
  created() {
    console.log("kazim", this.path);
  },
};
</script>

<style scoped></style>
