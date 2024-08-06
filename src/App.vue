<template>
  <div>
    <a-layout>
      <a-layout-header>
        <div class="header-content" v-if="user">
          <a-menu
            theme="dark"
            mode="horizontal"
            :selectedKeys="[path]"
            class="menu"
          >
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
          <a-button @click="handleLogout" class="logout-button"
            >Logout</a-button
          >
        </div>
      </a-layout-header>
      <a-layout-content>
        <div class="content-layout">
          <RouterView />
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import { routes } from "./router";
export default {
  data() {
    return {
      user: this.$store.getters.getUser,
      path: this.$route.path,
      routes: routes.filter((item) => item?.showInHeader),
    };
  },
  methods: {
    selectedTab(path) {
      return this.$route.path === path ? "ant-menu-item-selected" : "";
    },
    handleLogout() {
      this.$store.dispatch("LogOut");
    },
  },
  watch: {
    "$route.path"(newPath) {
      this.user = this.$store.getters.getUser;
      this.path = newPath;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #001529;
  padding: 0 16px;
}

.header-content {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 50px;
  @media (max-width: 600px) {
    padding: 0 0px;
  }
}

.menu {
  flex: 1;
}

.logout-button {
  margin-left: auto;
}

.content-layout {
  padding: 0 50px;
  @media (max-width: 600px) {
    padding: 0 10px;
  }
}
</style>
