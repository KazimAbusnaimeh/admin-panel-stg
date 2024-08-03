<template>
  <div
    v-if="imagesFilesList?.length && previewImagesList?.length"
    class="holders-container"
  >
    <div v-for="(img, index) in previewImagesList" :key="img">
      <div class="images-holder">
        <img :src="img" style="" />
        <div class="d-flex ai-center jc-space-between" style="padding: 0 10px">
          <p class="image-name">
            {{ imagesFilesList[index].name || `image-${index + 1}` }}
          </p>
          <DeleteOutlined
            v-if="removable"
            type="primary"
            ghost
            @click="handleRemove(index)"
            class="remove-button"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DeleteOutlined } from "@ant-design/icons-vue";
export default {
  props: {
    previewImagesList: Array,
    imagesFilesList: Array,
    removable: {
      type: Boolean,
      default: true,
    },
  },
  components: { DeleteOutlined },
  methods: {
    handleRemove(index) {
      this.$emit("image-remove", index);
    },
  },
};
</script>

<style scoped lang="scss">
.holders-container {
  margin-top: 15px;
  display: flex;
  width: fit-content;
  max-width: 100%;
  gap: 20px;
  overflow-x: auto;
  padding: 20px;
  border: 2px solid var(--secondary-color);
  border-radius: 5px;
  padding: 15px;
}
.images-holder {
  width: 250px;
  height: 260px;
  border-radius: 18px;
  border: 2px solid var(--primary-color);
  overflow: hidden;
  img {
    object-fit: fill;
    width: 250px;
    height: 200px;
    border-bottom: 2px solid var(--primary-color);
  }
  .image-name {
    max-width: 70%;
  }
  .remove-button {
    margin-top: 10px;
    font-size: 16px;
  }
}
</style>
