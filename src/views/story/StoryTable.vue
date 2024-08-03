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
      <div class="d-flex ai-center jc-space-between">
        <h1>Stories Table</h1>
        <a-button type="link">
          <router-link to="/story-form">Create Story</router-link></a-button
        >
      </div></template
    >
    <a-table
      :columns="tableHeader"
      :data-source="tableData"
      rowKey="id"
      :customRow="customRow"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'coverImage'">
          <div class="img-container">
            <img :src="record.coverImage" alt="cover image" class="cover-img" />
          </div>
        </template>
        <template v-else-if="column.key === 'title'">
          <div>{{ record.title }}</div>
        </template>
        <template v-else-if="column.key === 'storyContent'">
          <div>
            {{ record.storyContent.length }}
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-tooltip :title="'Delete ' + ' Story'" color="red">
            <DeleteOutlined
              style="font-size: 18px"
              @click="deleteStory(record._id)"
          /></a-tooltip>
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
import { DeleteOutlined } from "@ant-design/icons-vue";
import Swal from "sweetalert2";
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
  {
    title: "Action",
    dataIndex: "_id",
    key: "action",
  },
];

export default {
  components: { StoryContentView, DeleteOutlined },
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
    deleteStory(id) {
      Swal.fire({
        icon: "warning",
        title: "Are You Sure",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: "#1677ff",
        confirmButtonText: "Yes, Delete it",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("deleteStory", id);
          let error = this.$store.getters.getError;
          if (!error) {
            Swal.fire({
              title: "Successfully Deleted!",
              text: "Story has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            }).then(async () => {
              await this.loadPageData();
            });
          } else {
            Swal.fire("Somthing Went Wrong", error, "error");
          }
        }
      });
    },
    customRow(record) {
      return {
        style: {
          cursor: "pointer",
        },
        onClick: (event) => {
          const tagName = event.target.tagName;
          if (tagName != "svg") {
            this.currentStory = record;
            this.showStory = true;
          }
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

<style scoped>
.img-container {
  border-radius: 15px;
  width: fit-content;
  overflow: hidden;
  border: 2px solid var(--primary-color);
  width: 100px;
  height: 100px;
}
.cover-img {
  object-fit: fill;
  width: 100px;
  height: 100px;
}
</style>
