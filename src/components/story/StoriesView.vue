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
        @click="showStoryModal(story)"
      >
        <img
          v-if="story.coverImage"
          :src="story.coverImage"
          :draggable="false"
          alt="img"
          class="story-cover-img"
        />
      </div>
      <story-content-view
        :showModal="showStory"
        :story="selectedStory"
        @modale-canceled="showStory = false"
      />
    </div>
  </div>
</template>

<script>
import StoryContentView from "../modals/StoryContentView.vue";

export default {
  components: {
    StoryContentView,
  },
  data() {
    return {
      stories: [],
      loading: false,
      showStory: false,
      selectedStory: {},
    };
  },
  methods: {
    showStoryModal(story) {
      this.selectedStory = story;
      this.showStory = true;
    },
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch("getAllStories");
    this.stories = this.$store.getters.getStories;
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
