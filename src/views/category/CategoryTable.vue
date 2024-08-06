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
        <a-button
          type="link"
          @click="
            (showCategoryFormModal = true),
              (currentCategory = {}),
              (dispatchMethod = 'createCategory')
          "
        >
          Add Category
        </a-button>
      </div></template
    >
    <a-table
      :columns="tableHeader"
      :data-source="tableData"
      rowKey="id"
      :customRow="customRow"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'title'">
          <div>{{ record.categoryName }}</div>
        </template>
        <template v-else-if="column.key === 'serveces'">
          <div>
            {{ record.services.length }}
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-tooltip :title="'Delete Category'" color="red">
            <DeleteOutlined
              style="font-size: 18px"
              @click="deleteStory(record._id)"
            />
          </a-tooltip>
        </template>
      </template>
    </a-table>
  </a-card>
  <category-and-type-of-work-modal
    :showModal="showCategoryFormModal"
    @modal-canceled="showCategoryFormModal = cancel"
    modalType="Category"
    :currentItem="currentCategory"
    :isCreate="!currentCategory._id"
    :dispatchMethod="dispatchMethod"
    @category-Configured="onCategoryConfigured"
  />
</template>

<script>
import StoryContentView from "@/components/modals/StoryContentView.vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import Swal from "sweetalert2";
import CategoryAndTypeOfWorkModal from "@/components/modals/CategoryAndTypeOfWorkModal.vue";
import { successMessage } from "@/utils/Extentions";
const tableHeader = [
  {
    title: "Name",
    dataIndex: "categoryName",
    key: "title",
  },
  {
    title: "Number of services",
    dataIndex: "services",
    key: "serveces",
  },
  {
    title: "Action",
    dataIndex: "_id",
    key: "action",
  },
];

export default {
  components: { StoryContentView, DeleteOutlined, CategoryAndTypeOfWorkModal },
  data() {
    return {
      tableHeader,
      tableData: [],
      loading: false,
      currentCategory: {},
      showCategoryFormModal: false,
      dispatchMethod: "",
    };
  },
  methods: {
    async deleteStory(id) {
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
          await this.$store.dispatch("deleteCategory", id);
          let error = this.$store.getters.getError;
          if (!error) {
            successMessage("Deleted", "Category", this.loadPageData());
          } else {
            Swal.fire("Somthing Went Wrong", error, "error");
          }
        }
      });
    },
    onCategoryConfigured() {
      successMessage(
        this.currentCategory._id ? "Updated" : "Created",
        "Category",
        this.loadPageData()
      );
    },
    customRow(record) {
      return {
        style: {
          cursor: "pointer",
        },
        onClick: (event) => {
          const tagName = event.target.tagName;
          if (tagName != "svg") {
            this.currentCategory = record;
            this.dispatchMethod = "updateCategory";
            this.showCategoryFormModal = true;
          }
        },
      };
    },
    async loadPageData() {
      this.loading = true;
      await this.$store.dispatch("getAllCategories");
      this.tableData = this.$store.getters.getCategories;
      this.loading = false;
    },
  },
  async created() {
    await this.loadPageData();
  },
};
</script>

<style scoped></style>
