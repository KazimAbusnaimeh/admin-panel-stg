<template>
  <div>
    <div v-if="loading">
      <a-skeleton></a-skeleton>
      <a-skeleton></a-skeleton>
      <a-skeleton></a-skeleton>
      <a-skeleton></a-skeleton>
    </div>
    <div class="stories-container" v-else>
      <div
        class="story-wrapper"
        v-for="story in stories"
        :key="story"
        @click="showStoryModal(story.storyContent)"
      >
        <img
          v-if="story.coverImage"
          :src="story.coverImage"
          :draggable="false"
          alt="img"
          class="story-cover-img"
        />
      </div>
    </div>
    <a-modal
      v-model:open="showStory"
      @cancel="handleCancel"
      title="Story"
      :width="isSmallScreen ? '90%' : '60%'"
      style="top: 20px"
      :bodyStyle="{
        height: isSmallScreen ? '60vh' : '80vh',
      }"
    >
      <div class="modal-content-container">
        <CaretLeftOutlined
          class="arrow"
          @click="slideLeft"
          v-if="!isSmallScreen"
        />
        <div class="story-content-wrapper" ref="imageContainer">
          <div class="story-content" v-for="img in contentImage" :key="img">
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
          <CaretRightOutlined
            class="arrow"
            @click="slideRight"
            v-if="!isSmallScreen"
          />
        </div>
      </div>
      <template #footer>
        <div
          style="
            display: flex;
            width: 100%;
            justify-content: center;
            gap: 10px;
            margin-top: 1%;
          "
        >
          <span
            v-for="(img, index) in contentImage"
            :key="img"
            :class="[
              'dot',
              {
                'selected-dot': currentImg === index,
                'unselected-dot': currentImg !== index,
              },
            ]"
          ></span></div
      ></template>
    </a-modal>
  </div>
</template>

<script>
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    CaretRightOutlined,
    CaretLeftOutlined,
  },
  data() {
    return {
      stories: [],
      loading: false,
      showStory: false,
      contentImage: [],
      isSmallScreen: window.innerWidth < 600,
      arrowDisabled: false,
      currentImg: 0,
    };
  },
  methods: {
    slideRight() {
      const container = this.$refs.imageContainer;
      if (!this.arrowDisabled) {
        container.scrollBy({
          left: container.clientWidth,
          behavior: "smooth",
        });
        if (this.currentImg < this.contentImage.length - 1) this.currentImg++;
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
    showStoryModal(imgList) {
      this.contentImage = imgList;
      this.showStory = true;
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
    },
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch("getAllStories");
    this.stories = this.$store.getters.getStories.data;
    this.loading = false;
  },
};
</script>

<style scoped>
* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.stories-container {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  width: 100%;
}
.story-wrapper {
  cursor: pointer;
}
.story-cover-img {
  object-fit: fill;
  width: 300px;
  height: 300px;
  border-radius: 30px;
  border: 3px solid var(--primary-color);
}
@media (max-width: 600px) {
  .story-cover-img {
    width: 100px;
    height: 100px;
    border-width: 2px;
  }
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
