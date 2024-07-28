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
</style>
