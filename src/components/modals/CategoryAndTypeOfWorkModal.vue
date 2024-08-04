<template>
  <a-modal
    v-model:open="localShowModal"
    @cancel="handleCancel"
    :closable="false"
    :title="`${isCreate ? 'Create' : 'Update'} ${modalType}`"
    :maskClosable="!submitLoading"
  >
    <a-form
      ref="form"
      layout="vertical"
      @finish="handleSubmitSuccess"
      @finishFailed="FormError"
      :model="form"
      style="margin-top: 10px"
    >
      <a-form-item
        name="categoryName"
        :label="modalType + ' Name'"
        :rules="[
          {
            required: true,
            message: 'Please input category name!',
          },
        ]"
      >
        <a-input
          :placeholder="modalType + ' Name'"
          v-model:value="form.categoryName"
      /></a-form-item>
    </a-form>
    <template #footer>
      <a-button @click="handleCancel">Cancel</a-button>
      <a-button
        type="primary"
        html-type="submit"
        :loading="submitLoading"
        @click="submitForm"
      >
        {{ submitLoading ? "Loading" : "Submit" }}
      </a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  props: [
    "showModal",
    "modalType",
    "currentItem",
    "dispatchMethod",
    "isCreate",
  ],
  data() {
    return {
      localShowModal: false,
      form: { categoryName: "" },
      submitLoading: false,
    };
  },
  watch: {
    showModal(val) {
      this.form.categoryName = this.currentItem?.categoryName;
      this.submitLoading = false;
      this.localShowModal = val;
    },
  },
  methods: {
    handleCancel() {
      if (!this.submitLoading) this.$emit("modal-canceled");
    },
    submitForm() {
      this.$refs.form.validate().then(async () => {
        this.submitLoading = true;
        await this.$store.dispatch(this.dispatchMethod, {
          ...this.form,
          _id: this.currentItem._id,
        });
        let error = this.$store.getters.getError;
        if (error) {
          this.submitLoading = false;
        } else {
          this.submitLoading = false;
          this.handleCancel();
          this.$emit("category-Configured");
        }
      });
    },
  },
};
</script>

<style scoped></style>
