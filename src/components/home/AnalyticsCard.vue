<template>
  <div class="analytics-container">
    <div v-if="loading">
      <a-skeleton active></a-skeleton>
      <a-skeleton active></a-skeleton>
      <a-skeleton active></a-skeleton>
    </div>
    <div style="" class="content-container" v-else>
      <HistoryOutlined class="content-icon" v-if="title == 'Stories'" />
      <AppstoreOutlined class="content-icon" v-if="title == 'Categories'" />
      <ApartmentOutlined class="content-icon" v-if="title == 'Type Of Work'" />
      <h2 style="text-align: center">{{ title }} :</h2>
      <h1 style="text-align: center">{{ itemsNumber }}</h1>
    </div>
  </div>
</template>

<script>
import { HistoryOutlined } from "@ant-design/icons-vue";
import { AppstoreOutlined } from "@ant-design/icons-vue";
import { ApartmentOutlined } from "@ant-design/icons-vue";
export default {
  props: ["title", "dispatchMethod", "getterMethod"],
  components: { HistoryOutlined, AppstoreOutlined, ApartmentOutlined },
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

<style lang="scss" scoped>
.analytics-container {
  width: 200px;
  height: 200px;
  border-radius: 15px;
  border: 2px solid var(--primary-color);
  overflow: hidden;
  @media (max-width: 576px) {
    width: 100px;
    height: 100px;
    margin-top: 20px;
    h2 {
      font-size: 13px;
    }
    h1 {
      font-size: 14px;
    }
  }
}
.content-icon {
  font-size: 28px;
  width: 100%;
  text-align: center;
  @media (max-width: 576px) {
    font-size: 18px;
  }
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
