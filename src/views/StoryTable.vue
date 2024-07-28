<template>
  <div v-if="loading">
    <a-skeleton></a-skeleton>
    <a-skeleton></a-skeleton>
    <a-skeleton></a-skeleton>
    <a-skeleton></a-skeleton>
  </div>
  <a-card v-else>
    <h1>Stories Table</h1>
    <a-table
      :columns="tableHeader"
      :data-source="tableData"
      rowKey="id"
      :customRow="customRow"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'coverImage'">
          <img
            :src="record.coverImage"
            alt="cover image"
            style="max-width: 50px; object-fit: fill"
          />
        </template>
        <template v-else-if="column.key === 'title'">
          <div>{{ record.title }}</div>
        </template>
        <template v-else-if="column.key === 'storyContent'">
          <div>
            {{ record.storyContent.length }}
          </div>
        </template>
      </template>
    </a-table>
    <story-content-view
      :story="currentStory"
      :showModal="showStory"
      @modale-canceled="showStory = false"
    />
  </a-card>
</template>

<script>
import StoryContentView from "@/components/modals/StoryContentView.vue";
const tableHeader = [
  {
    title: "Cover Image",
    dataIndex: "coverImage",
    key: "coverImage",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Number of Story images",
    dataIndex: "storyContent",
    key: "storyContent",
  },
];

export default {
  components: { StoryContentView },
  data() {
    return {
      tableHeader,
      tableData: [],
      loading: false,
      currentStory: {},
      showStory: false,
    };
  },
  methods: {
    customRow(record) {
      return {
        style: {
          cursor: "pointer",
        },
        onClick: (event) => {
          this.currentStory = record;
          this.showStory = true;
        },
      };
    },
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch("getAllStories");
    this.tableData = this.$store.getters.getStories;
    this.loading = false;
  },
};
</script>

<style scoped></style>
