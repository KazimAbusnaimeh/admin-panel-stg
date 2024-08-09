<template>
  <div v-if="loading">
    <a-skeleton active></a-skeleton>
    <a-skeleton active></a-skeleton>
    <a-skeleton active></a-skeleton>
    <a-skeleton active></a-skeleton>
    <a-skeleton active></a-skeleton>
  </div>
  <a-card v-else>
    <template #title>
      <h1>Stories Table</h1>
    </template>
    <div class="d-flex ai-center jc-space-between" style="margin-bottom: 20px">
      <a-button type="primary" ghost>
        <router-link to="/story-form">Add Story</router-link></a-button
      >
      <a-input-search
        v-model:value="searchInput"
        placeholder="Search Story"
        style="max-width: 30%"
        enter-button
        @search="onSearch"
      />
    </div>
    <a-table
      :columns="columnsWithDynamicWidth"
      :data-source="tableData"
      rowKey="id"
      :customRow="customRow"
      :pagination="{ pageSize: 3 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'coverImage'">
          <div class="table-img-container">
            <img :src="record.coverImage" alt="cover image" />
          </div>
        </template>
        <template v-else-if="column.key === 'title'">
          <div>{{ record.title }}</div>
        </template>
        <template v-else-if="column.key === 'storyContent'">
          <div style="display: flex">
            <div
              style="display: inline-block"
              class="table-img-container"
              v-for="image in record.storyContent"
              :key="image"
            >
              <img :src="image" alt="cover image" />
            </div>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <div style="display: flex">
            <a-button
              @click="(currentStory = record), (showStory = true)"
              type="link"
              style="padding-left: 0"
            >
              <icon type="camera" style="margin-right: -3px" />Images
            </a-button>
            <a-button
              @click="this.$router.push(`/story-form?storyId=${record._id}`)"
              type="edit"
            >
              <icon type="form" />Edit
            </a-button>
            <a-button @click="deleteStory(record._id)" type="delete">
              <icon type="delete" /> Delete
            </a-button>
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
import { successMessage, getColumnsWithDynamicWidth } from "@/utils/Extentions";
import Swal from "sweetalert2";
import Icon from "@/components/common/Icon.vue";
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
    title: "Story images",
    dataIndex: "storyContent",
    key: "storyContent",
  },
  {
    title: "Action",
    dataIndex: "_id",
    key: "action",
  },
];
export default {
  components: {
    StoryContentView,
    Icon,
  },
  data() {
    return {
      tableHeader,
      tableData: [],
      loading: false,
      currentStory: {},
      showStory: false,
    };
  },
  computed: {
    columnsWithDynamicWidth() {
      return getColumnsWithDynamicWidth(this.tableHeader);
    },
  },
  methods: {
    deleteStory(id) {
      Swal.fire({
        icon: "warning",
        title: "Are You Sure",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: "#1677ff",
        confirmButtonText: "Yes, Delete it",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.$store.dispatch("deleteStory", id);
          let error = this.$store.getters.getError;
          if (!error) {
            successMessage("Deleted", "Story", await this.loadPageData());
          } else {
            Swal.fire("Somthing Went Wrong", error, "error");
          }
        }
      });
    },
    customRow(record) {
      return {
        style: {},
        onClick: (event) => {
          const tagName = event.target.tagName.toLowerCase();
        },
      };
    },
    async loadPageData() {
      this.loading = true;
      await this.$store.dispatch("getAllStories");
      this.tableData = this.$store.getters.getStories;
      this.loading = false;
    },
  },
  async created() {
    await this.loadPageData();
  },
};
</script>

<style scoped></style>
