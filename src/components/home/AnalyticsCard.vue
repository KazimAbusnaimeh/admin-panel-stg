<template>
  <div class="analytics-container">
    <div v-if="loading">
      <a-skeleton active></a-skeleton>
      <a-skeleton active></a-skeleton>
      <a-skeleton active></a-skeleton>
    </div>
    <div style="" class="content-container" v-else>
      <HistoryOutlined
        style="font-size: 28px; width: 100%; text-align: center"
        v-if="title == 'Stories'"
      />
      <AppstoreOutlined
        style="font-size: 28px; width: 100%; text-align: center"
        v-if="title == 'Categories'"
      />
      <h2 style="text-align: center">{{ title }} :</h2>
      <h1 style="text-align: center">{{ itemsNumber }}</h1>
    </div>
  </div>
</template>

<script>
import { HistoryOutlined } from "@ant-design/icons-vue";
import { AppstoreOutlined } from "@ant-design/icons-vue";
export default {
  props: ["title", "dispatchMethod", "getterMethod"],
  components: { HistoryOutlined, AppstoreOutlined },
  data() {
    return {
      loading: false,
      itemsNumber: 0,
    };
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch(this.dispatchMethod);
    this.itemsNumber = this.$store.getters[this.getterMethod]?.length;
    this.loading = false;
  },
};
</script>

<style scoped>
.analytics-container {
  width: 200px;
  height: 200px;
  border-radius: 15px;
  border: 2px solid var(--primary-color);
  overflow: hidden;
}
.content-container {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
