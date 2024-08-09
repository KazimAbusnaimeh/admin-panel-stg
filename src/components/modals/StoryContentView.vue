<template>
  <a-modal
    v-model:open="localShowModal"
    @cancel="handleCancel"
    title="Story"
    :width="isSmallScreen ? '90%' : '60%'"
    style="top: 20px"
    :bodyStyle="{
      height: isSmallScreen ? '60vh' : '80vh',
    }"
  >
    <div class="modal-content-container">
      <div class="arrow" v-if="!isSmallScreen" @click="slideLeft">
        <Icon type="leftArrow" />
      </div>
      <div class="story-content-wrapper" ref="imageContainer">
        <div class="story-content" v-for="img in story.storyContent" :key="img">
          <img
            :src="img"
            alt="img"
            class="story-content-img"
            :draggable="false"
            @click="handleImageClick"
          />
        </div>
      </div>
      <div>
        <div class="arrow" v-if="!isSmallScreen" @click="slideRight">
          <Icon type="rightArrow" />
        </div>
      </div>
    </div>
    <template #footer>
      <div
        style="
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
        "
      >
        <div
          style="
            display: flex;
            width: 100%;
            justify-content: center;
            gap: 10px;
            margin-top: 1%;
            margin-left: 50px;
          "
        >
          <span
            v-for="(img, index) in story.storyContent"
            :key="img"
            :class="[
              'dot',
              {
                'selected-dot': currentImg === index,
                'unselected-dot': currentImg !== index,
              },
            ]"
          ></span>
        </div>
        <a-button style="margin-left: auto" type="primary">
          <router-link :to="`/story-form?storyId=${story._id}`"
            >Edit</router-link
          ></a-button
        >
      </div>
    </template>
  </a-modal>
</template>

<script>
import Icon from "../common/Icon.vue";
export default {
  props: ["showModal", "story"],
  components: {
    Icon,
  },
  data() {
    return {
      localShowModal: false,
      isSmallScreen: window.innerWidth < 600,
      arrowDisabled: false,
      currentImg: 0,
    };
  },
  watch: {
    showModal(val) {
      this.localShowModal = val;
    },
  },

  methods: {
    slideRight() {
      const container = this.$refs.imageContainer;
      if (!this.arrowDisabled) {
        container.scrollBy({
          left: container.clientWidth,
          behavior: "smooth",
        });
        if (this.currentImg < this.story.storyContent.length - 1)
          this.currentImg++;
      }
      this.arrowDisabled = true;
      setTimeout(() => {
        this.arrowDisabled = false;
      }, 500);
    },

    slideLeft() {
      const container = this.$refs.imageContainer;
      if (!this.arrowDisabled) {
        container.scrollBy({
          left: -container.clientWidth,
          behavior: "smooth",
        });
        if (this.currentImg > 0) this.currentImg--;
      }
      this.arrowDisabled = true;
      setTimeout(() => {
        this.arrowDisabled = false;
      }, 500);
    },
    handleImageClick(event) {
      const imgElement = event.target;
      const imgWidth = imgElement.clientWidth;
      const clickX = event.offsetX;
      let rightSideClicked = clickX > imgWidth / 2;
      if (rightSideClicked) {
        this.slideRight();
      } else {
        this.slideLeft();
      }
    },
    handleCancel() {
      const container = this.$refs.imageContainer;
      setTimeout(() => {
        container.scrollTo({
          left: 0,
          behavior: "auto",
        });
        this.currentImg = 0;
      }, 100);
      this.$emit("modale-canceled");
    },
  },
  created() {},
};
</script>

<style scoped>
* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.modal-content-container {
  display: flex;
  align-items: center;
  width: calc(100% + 48px);
  height: 100%;
  margin-left: -24px;
  margin-right: -24px;
  @media (max-width: 600px) {
    width: 100%;
    margin: 0;
  }
}
.arrow {
  font-size: 50px;
  cursor: pointer;
  color: var(--primary-color);
}
.story-content-wrapper {
  display: flex;
  overflow-x: auto;
  width: 100%;
  height: 100%;
  scrollbar-width: none;
  border-radius: 15px;
  border: 3px solid var(--primary-color);
  touch-action: none;
}
.story-content-wrapper::-webkit-scrollbar {
  display: none;
}
.story-content {
  flex: 0 0 auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.story-content-img {
  cursor: pointer;
  object-fit: fill;
  width: 100%;
  height: 100%;
}
.dot {
  background-color: var(--primary-color);
  width: 10px;
  height: 10px;
  border-radius: 10px;
  opacity: 0.5;
  transition: width 0.3s, height 0.3s, opacity 0.3s;
}
.selected-dot {
  opacity: 1;
  width: 14px;
  height: 10px;
}
.unselected-dot {
  opacity: 0.5;
  width: 10px;
  height: 10px;
}
</style>
