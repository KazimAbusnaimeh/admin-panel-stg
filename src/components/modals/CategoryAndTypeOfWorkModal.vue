<template>
  <a-modal
    v-model:open="localShowModal"
    @cancel="handleCancel"
    :closable="false"
    :title="`${isCreate ? 'Create' : 'Update'} ${modalType}`"
    :maskClosable="!submitLoading"
  >
    <a-form
      v-if="!isCropping"
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
      <a-form-item
        v-if="modalType == 'Type Of Work'"
        name="typeImage"
        label="Type Image"
        :required="true"
        :rules="[
          {
            required: true,
            message: 'Please upload story type image!',
          },
        ]"
      >
        <a-upload
          :file-list="form.typeImage"
          :before-upload="beforeUpload"
          accept="image/*"
          :multiple="false"
          :show-upload-list="false"
        >
          <a-button type="primary" ghost @click="imageType = 'cover'">
            <span class="upload-icon"><Icon type="upload" /></span>
            {{ form.typeImage.length ? "Change" : "Upload" }}
            Image
          </a-button>
        </a-upload>
        <ImageViewer
          @image-remove="handleRemove"
          :previewImagesList="[previewTypeImage]"
          :imagesFilesList="form.typeImage"
          :removable="false"
        />
      </a-form-item>
    </a-form>
    <cropper v-else :src="cropImage" ref="cropper" @change="onCrop" />
    <template #footer>
      <a-button @click="handleCancel">Cancel</a-button>
      <a-button
        type="primary"
        html-type="submit"
        :loading="submitLoading"
        @click="isCropping ? handleImageCropped() : submitForm()"
      >
        {{ submitLoading ? "Loading" : "Submit" }}
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import Icon from "../common/Icon.vue";
import ImageViewer from "@/components/common/ImageViewer.vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default {
  props: [
    "showModal",
    "modalType",
    "currentItem",
    "dispatchMethod",
    "isCreate",
  ],
  components: { Cropper, Icon, ImageViewer },
  data() {
    return {
      localShowModal: false,
      form: { categoryName: "", typeImage: [] },
      submitLoading: false,
      previewTypeImage: "",
      cropImage: "",
      isCropping: false,
    };
  },
  watch: {
    showModal(val) {
      this.form.categoryName =
        this.currentItem?.categoryName || this.currentItem?.typeName;
      this.form.typeImage = this.currentItem?.typeImage
        ? [this.currentItem?.typeImage]
        : [];
      this.submitLoading = false;
      this.localShowModal = val;
    },
  },
  methods: {
    beforeUpload(file) {
      this.createImagePreview(file, true);
      this.isCropping = true;
      return false;
    },
    createImagePreview(file, beforeUpload) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (beforeUpload) this.cropImage = e.target.result;
        else this.previewTypeImage = e.target.result;
      };
      try {
        reader.readAsDataURL(file);
      } catch (err) {
        console.log(err);
      }
    },
    handleRemove(file) {
      this.form.typeImage = [];
      this.previewTypeImage = "";
    },
    onCrop({ coordinates, canvas }) {
      canvas.toBlob((blob) => {
        const file = new File([blob], "profile-image.jpg", {
          type: "image/jpeg",
        });
        this.form.typeImage = [file];
      }, "image/jpeg");
    },
    handleImageCropped() {
      this.createImagePreview(this.form.typeImage[0], false);
      this.isCropping = false;
    },
    handleCancel() {
      if (!this.submitLoading) this.$emit("modal-canceled");
    },
    submitForm() {
      this.$refs.form.validate().then(async () => {
        this.submitLoading = true;
        let payload = {};
        if (this.modalType == "Category")
          payload = {
            ...this.form,
            _id: this.currentItem._id,
          };
        if (this.modalType == "Type Of Work")
          payload = this.createFormDate({
            ...this.form,
            _id: this.currentItem._id,
          });
        await this.$store.dispatch(this.dispatchMethod, payload);
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
    createFormDate(object) {
      const formData = new FormData();
      if (object.categoryName)
        formData.append("typeName", this.form.categoryName);
      if (object.typeImage.length)
        formData.append("typeImage", this.form.typeImage[0]);
      if (object._id) formData.append("_id", this.form._id);
      return formData;
    },
  },
};
</script>

<style scoped></style>
