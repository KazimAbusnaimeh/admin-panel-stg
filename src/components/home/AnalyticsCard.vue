<template>
  <div class="analytics-container">
    <div class="content-container" v-if="loading">
      <LoadingOutlined class="loading-icon" />
    </div>
    <div style="" class="content-container" v-else>
      <div class="content-icon" v-if="title == 'Stories'">
        <Icon type="camera" />
      </div>
      <div class="content-icon" v-if="title == 'Categories'">
        <Icon type="appstore" />
      </div>
      <div class="content-icon" v-if="title == 'Type Of Work'">
        <Icon type="apartment" />
      </div>
      <h2 style="text-align: center">{{ title }} :</h2>
      <h1 style="text-align: center">{{ itemsNumber }}</h1>
    </div>
  </div>
</template>

<script>
import Icon from "../common/Icon.vue";

export default {
  props: ["title", "dispatchMethod", "getterMethod"],
  components: { Icon },
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
.loading-icon {
  font-size: 60px;
  @media (max-width: 576px) {
    font-size: 35px;
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
