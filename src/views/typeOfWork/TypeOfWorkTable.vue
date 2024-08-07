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
            (showTypeOfWorkFormModal = true),
              (currentTypeOfWork = {}),
              (dispatchMethod = 'createTypeOfWork')
          "
        >
          Add Type Of Work
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
        <template v-if="column.key === 'typeImage'">
          <div class="table-img-container">
            <img :src="tableData[0].typeImage" alt=" image" class="type-img" />
          </div>
        </template>
        <template v-if="column.key === 'title'">
          <div>{{ record.typeName }}</div>
        </template>
        <template v-else-if="column.key === 'storyContent'">
          <div>
            {{ record.services.length }}
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <div style="display: flex">
            <a-button @click="editTypeOfWork(record)" type="edit">
              <FormOutlined />Edit
            </a-button>
            <a-button @click="deleteCategory(record._id)" type="delete">
              <DeleteOutlined />Delete
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </a-card>
  <category-and-type-of-work-modal
    :showModal="showTypeOfWorkFormModal"
    @modal-canceled="showTypeOfWorkFormModal = cancel"
    modalType="Type Of Work"
    :currentItem="currentTypeOfWork"
    :isCreate="!currentTypeOfWork._id"
    :dispatchMethod="dispatchMethod"
    @category-Configured="onTypeOfWorkConfigured"
  />
</template>

<script>
import StoryContentView from "@/components/modals/StoryContentView.vue";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons-vue";
import Swal from "sweetalert2";
import CategoryAndTypeOfWorkModal from "@/components/modals/CategoryAndTypeOfWorkModal.vue";
import { successMessage } from "@/utils/Extentions";
const tableHeader = [
  {
    title: "Number of Story images",
    dataIndex: "typeImage",
    key: "typeImage",
  },
  {
    title: "Name",
    dataIndex: "typeName",
    key: "title",
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
    DeleteOutlined,
    FormOutlined,
    CategoryAndTypeOfWorkModal,
  },
  data() {
    return {
      tableHeader,
      tableData: [],
      loading: false,
      currentTypeOfWork: {},
      showTypeOfWorkFormModal: false,
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
          await this.$store.dispatch("deleteTypeOfWork", id);
          let error = this.$store.getters.getError;
          if (!error) {
            successMessage("Deleted", "Type Of Work", this.loadPageData());
          } else {
            Swal.fire("Somthing Went Wrong", error, "error");
          }
        }
      });
    },
    onTypeOfWorkConfigured() {
      successMessage(
        this.currentTypeOfWork._id ? "Updated" : "Created",
        "TypeOfWork",
        this.loadPageData()
      );
    },
    editTypeOfWork(record) {
      this.currentTypeOfWork = record;
      this.dispatchMethod = "updateTypeOfWork";
      this.showTypeOfWorkFormModal = true;
    },
    customRow(record) {
      return {
        style: {},
        onClick: (event) => {
          const tagName = event.target.tagName;
        },
      };
    },
    async loadPageData() {
      this.loading = true;
      await this.$store.dispatch("getAllTypesOfWork");
      this.tableData = this.$store.getters.getTypesOfWork;
      this.loading = false;
    },
  },
  async created() {
    await this.loadPageData();
  },
};
</script>

<style scoped>
.type-img {
  object-fit: fill;
  width: 100px;
  height: 100px;
}
</style>
