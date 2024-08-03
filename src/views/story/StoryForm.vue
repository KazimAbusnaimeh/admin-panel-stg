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
      <h1>{{ storyId ? "Edit" : "Create" }} Story</h1>
    </template>
    <a-form
      ref="form"
      layout="vertical"
      @finish="handleSubmitSuccess"
      @finishFailed="FormError"
      :model="form"
    >
      <a-form-item
        name="title"
        label="Title"
        :rules="[
          {
            required: true,
            message: 'Please input story title!',
          },
        ]"
      >
        <a-input placeholder="Title" v-model:value="form.title"
      /></a-form-item>

      <a-form-item
        name="coverImage"
        label="Cover Image"
        :required="true"
        :rules="[
          {
            required: true,
            message: 'Please upload story cover image!',
          },
        ]"
      >
        <a-upload
          :file-list="form.coverImage"
          :before-upload="beforeUploadCoverImage"
          accept="image/*"
          :multiple="false"
          :show-upload-list="false"
        >
          <a-button type="primary" ghost @click="imageType = 'cover'">
            <UploadOutlined style="font-size: 20px" />{{
              form.coverImage.length ? "Change" : "Upload"
            }}
            Image
          </a-button>
        </a-upload>
        <ImageViewer
          @image-remove="handleRemoveCoverImage"
          :previewImagesList="previewCoverImage"
          :imagesFilesList="form.coverImage"
          :removable="false"
        />
      </a-form-item>
      <a-form-item
        name="contentImages"
        label="Content Images"
        :required="true"
        :rules="[
          {
            required: true,
            message: 'Please upload story cover image!',
          },
        ]"
      >
        <a-upload
          :file-list="form.contentImages"
          :remove="handleRemoveContentImage"
          :before-upload="beforeUploadCoverImage"
          accept="image/*"
          :multiple="false"
          :show-upload-list="false"
        >
          <a-button type="primary" ghost @click="imageType = 'content'">
            <UploadOutlined style="font-size: 20px" />{{
              !isContentImageUpdated && storyId
                ? "Replace Images"
                : "Upload Image"
            }}
          </a-button>
        </a-upload>
        <ImageViewer
          @image-remove="handleRemoveContentImage"
          :previewImagesList="previewContentImages"
          :imagesFilesList="form.contentImages"
          :removable="!isContentImageUpdated && !storyId"
        />
      </a-form-item>
      <a-modal
        v-model:open="showCropModal"
        :maskClosable="false"
        @ok="handleImageCropped"
        title="Crop Image"
      >
        <cropper :src="cropImage" ref="cropper" @change="onCrop"></cropper
      ></a-modal>

      <a-form-item class="ta-center">
        <a-button type="primary" html-type="submit" :loading="submitLoading">
          {{ submitLoading ? "Loading" : "Submit" }}
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import ImageViewer from "../../components/common/ImageViewer.vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import Swal from "sweetalert2";
export default {
  components: { UploadOutlined, Cropper, ImageViewer },
  data() {
    return {
      storyId: this.$route.query?.storyId,
      form: {
        title: "",
        coverImage: [],
        contentImages: [],
      },
      submitLoading: false,
      isImageCroped: false,
      isContentImageUpdated: false,
      showCropModal: false,
      cropImage: "",
      previewCoverImage: [],
      previewContentImages: [],
      currentContentimageIndex: 0,
      imageType: "",
      loading: false,
    };
  },
  methods: {
    beforeUploadCoverImage(file) {
      this.createImagePreview(file, true);
      this.isImageCroped = false;
      this.showCropModal = true;
      return false;
    },
    createImagePreview(file, beforeCrop) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (beforeCrop) this.cropImage = e.target.result;
        else {
          if (this.imageType == "cover")
            this.previewCoverImage = [e.target.result];
          if (this.imageType == "content") {
            this.previewContentImages.push(e.target.result);
            this.currentContentimageIndex++;
            if (!this.isContentImageUpdated && this.storyId) {
              this.form.contentImages = this.form.contentImages.slice(-1);
              this.previewContentImages = this.previewContentImages.slice(-1);
              this.currentContentimageIndex = 1;
              this.isContentImageUpdated = true;
            }
          }
        }
      };
      try {
        reader.readAsDataURL(file);
      } catch (err) {
        console.log(err);
      }
    },
    handleRemoveCoverImage(index) {
      this.form.coverImage = [];
      this.previewCoverImage = [];
    },
    handleRemoveContentImage(index) {
      this.form.contentImages.splice(index, 1);
      this.previewContentImages.splice(index, 1);
      this.currentContentimageIndex--;
    },
    onCrop({ coordinates, canvas }) {
      canvas.toBlob((blob) => {
        const file = new File(
          [blob],
          `${
            this.imageType === "cover"
              ? "cover-image.jpg"
              : `content-img-${Math.floor(Math.random() * 1000)}.jpg`
          }`,
          {
            type: "image/jpeg",
          }
        );
        if (this.imageType == "cover") this.form.coverImage = [file];
        if (this.imageType == "content")
          this.form.contentImages[this.currentContentimageIndex] = file;
      }, "image/jpeg");
    },
    handleImageCropped() {
      if (this.imageType === "cover") {
        this.createImagePreview(this.form.coverImage[0], false);
        this.$nextTick(() => {
          this.$refs.form.validateFields("coverImage");
        });
      }
      if (this.imageType === "content") {
        this.createImagePreview(
          this.form.contentImages[this.currentContentimageIndex],
          false
        );
        this.$nextTick(() => {
          this.$refs.form.validateFields("contentImages");
        });
      }
      this.showCropModal = false;
      this.isImageCroped = true;
    },
    async handleSubmitSuccess() {
      this.submitLoading = true;

      const formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("coverImage", this.form.coverImage[0]);

      if (!this.storyId || this.isContentImageUpdated)
        this.form.contentImages.forEach((image, index) => {
          formData.append("contentImages", image);
        });
      else formData.append("contentImages", null);

      formData.append("id", this.storyId);

      if (this.storyId) await this.$store.dispatch("updateStory", formData);
      else await this.$store.dispatch("createStory", formData);
      let error = this.$store.getters.getError;
      if (error) {
        this.submitLoading = false;
      } else {
        Swal.fire({
          title: `Successfully ${this.storyId ? "Updated" : "Created"}!`,
          text: `Story has been ${this.storyId ? "updated" : "created"}.`,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          this.$router.go(-1);
          this.submitLoading = false;
        });
      }
    },
    FormError() {},
  },
  async created() {
    if (this.storyId) {
      this.loading = true;
      await this.$store.dispatch("getStoryById", this.storyId);
      let story = this.$store.getters.getStory;
      this.form.title = story.title;
      this.form.coverImage = [story.coverImage];
      this.form.contentImages = [...story.storyContent];
      this.previewCoverImage = [story.coverImage];
      this.previewContentImages = [...story.storyContent];
      this.currentContentimageIndex = story.storyContent.length;
      this.loading = false;
    }
  },
};
</script>

<style></style>
