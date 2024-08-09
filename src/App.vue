<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      v-if="user"
    >
      <div class="logo sidebar-logo">logo</div>
      <a-menu theme="dark" :selectedKeys="[path]" class="menu">
        <a-menu-item
          v-for="route in routes"
          :key="route.path"
          style="align-items: center; display: flex; justify-content: left"
        >
          <div style="display: flex; align-items: center">
            <icon :type="route.icon" fontSize="28px" />
            <span>
              <router-link :to="route.path" style="text-transform: capitalize">
                {{ route.name }}
              </router-link></span
            >
          </div>
        </a-menu-item>
        <a-menu-item @click="handleLogout"
          ><div style="display: flex; align-items: center; gap: 10px">
            <icon type="logout" fontSize="28px" />
            <span>Log Out</span>
          </div></a-menu-item
        >
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <div style="color: white; cursor: pointer">
          <div
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          >
            <icon type="menuUnfold" fontSize="22px" />
          </div>
          <div v-else class="trigger" @click="() => (collapsed = !collapsed)">
            <icon type="menuFold" fontSize="22px" />
          </div>
        </div>
      </a-layout-header>
      <a-layout-content>
        <div class="content-layout">
          <RouterView />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Icon from "./components/common/Icon.vue";
import { routes } from "./router";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      user: this.$store.getters.getUser,
      path: this.$route.path,
      routes: routes.filter((item) => item?.showInHeader),
      collapsed: false,
      selectedKeys: [1],
    };
  },
  methods: {
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
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .sidebar-logo {
  color: white;
  text-align: center;
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
.header {
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #001529;
  padding: 0 16px;
}

.header-content {
  max-width: 100% !important;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 50px;
  @media (max-width: 600px) {
    display: inline-flex !important;
    padding: 0 !important;
  }
}

.menu {
  flex: 1;
  @media (max-width: 600px) {
    max-width: 75%;
  }
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
