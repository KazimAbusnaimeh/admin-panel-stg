<template>
  <main>
    <a-card>
      <h1 style="width: 100%; text-align: center">Register</h1>
      <a-form
        layout="vertical"
        @finish="handleSubmitSuccess"
        @finishFailed="FormError"
        :model="form"
      >
        <a-form-item
          label="Name"
          name="name"
          :rules="[
            { required: true, message: 'Please input your name!' },
            { validator: nameValidateError },
          ]"
        >
          <a-input
            placeholder="Name"
            v-model:value="form.name"
            :input="(form.name = inputName(form.name))"
          />
        </a-form-item>
        <a-form-item
          label="Email"
          name="email"
          :rules="[
            {
              type: 'email',
              required: true,
              message: 'Please input valid email!',
            },
          ]"
        >
          <a-input placeholder="Email" v-model:value="form.email" />
        </a-form-item>
        <a-form-item
          label="Password"
          name="password"
          :rules="[
            { required: true, message: 'Please input your password!' },
            { validator: validatePassword },
          ]"
        >
          <a-input-password
            placeholder="Password"
            type="password"
            v-model:value="form.password"
          />
        </a-form-item>
        <a-form-item
          label="Confirm Password"
          name="password_confirm"
          :rules="[
            { required: true, message: 'Please confirm your password!' },
            { validator: validateConfirmPassword },
          ]"
        >
          <a-input-password
            placeholder="Confirm Password"
            type="password"
            v-model:value="form.password_confirm"
          />
        </a-form-item>
        <a-form-item label="Profile Image">
          <a-upload
            :file-list="userImage"
            :remove="handleRemove"
            :before-upload="beforeUpload"
            accept="image/*"
            :multiple="false"
            :show-upload-list="false"
          >
            <a-button type="default">
              <UploadOutlined style="font-size: 20px" />{{
                userImage.length ? "Change" : "Upload"
              }}
              Image
            </a-button>
          </a-upload>
          <ImageViewer
            @image-remove="handleRemove"
            :previewImagesList="[imagePreview]"
            :imagesFilesList="userImage"
          />
        </a-form-item>
        <a-modal
          v-model:open="showCropModal"
          :maskClosable="false"
          @ok="handleImageCropped"
        >
          <cropper
            :src="cropImage"
            ref="cropper"
            :stencil-props="{ aspectRatio: 1 }"
            @change="onCrop"
          ></cropper
        ></a-modal>
        <div style="text-align: right">
          <a-button
            type="link"
            style="margin-top: -10px !important; padding: 0 !important"
          >
            <router-link to="/log-in">Log In</router-link></a-button
          >
        </div>
        <a-form-item class="ta-center">
          <a-button type="primary" html-type="submit" :loading="submitLoading">
            {{ submitLoading ? "Loading" : "Submit" }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </main>
</template>

<script>
import ImageViewer from "@/components/common/ImageViewer.vue";
import { nameValidateError, inputName } from "../utils/Extentions";
import { UploadOutlined } from "@ant-design/icons-vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default {
  components: { Cropper, UploadOutlined, ImageViewer },
  data() {
    return {
      submitLoading: false,
      form: {
        name: "",
        email: "",
        password: "",
        password_confirm: "",
      },
      userImage: [],
      imagePreview: "",
      cropImage: "",
      showCropModal: false,
    };
  },
  methods: {
    validatePassword(rule, value, callback) {
      if (!value) {
        callback();
      } else if (value.length < 6) {
        callback(new Error("Password must be at least 6 characters long!"));
      } else {
        callback();
      }
    },
    validateConfirmPassword(rule, value, callback) {
      if (!value) {
        callback();
      } else if (value !== this.form.password) {
        callback(new Error("Confirm Password must match the password!"));
      } else {
        callback();
      }
    },
    beforeUpload(file) {
      this.createImagePreview(file, true);
      this.showCropModal = true;
      return false;
    },
    createImagePreview(file, beforeUpload) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (beforeUpload) this.cropImage = e.target.result;
        else this.imagePreview = e.target.result;
      };
      try {
        reader.readAsDataURL(file);
      } catch (err) {
        console.log(err);
      }
    },
    handleRemove(file) {
      this.userImage = [];
      this.imagePreview = "";
    },
    onCrop({ coordinates, canvas }) {
      canvas.toBlob((blob) => {
        const file = new File([blob], "profile-image.jpg", {
          type: "image/jpeg",
        });
        this.userImage = [file];
      }, "image/jpeg");
    },
    handleImageCropped() {
      this.createImagePreview(this.userImage[0], false);
      this.showCropModal = false;
    },
    async handleSubmitSuccess() {
      this.submitLoading = true;
      const formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("email", this.form.email);
      formData.append("password", this.form.password);
      formData.append("password_confirm", this.form.password_confirm);
      if (this.userImage.length > 0) {
        formData.append("image", this.userImage[0]);
      }
      await this.$store.dispatch("signUp", formData);
      let error = this.$store.getters.getError;
      if (error) {
        this.submitLoading = false;
      } else {
        this.submitLoading = false;
      }
    },
    FormError(error) {},
    nameValidateError,
    inputName,
  },
};
</script>

<style scoped lang="scss">
.image-preview-container {
  margin-top: 10px;
  width: 300px;
  .preview-image {
    width: 300px;
    height: 300px;
    object-fit: fill;
  }
  @media (max-width: 600px) {
    .image-preview-container {
      width: 120px;
      .preview-image {
        width: 200px !important;
        height: 200px !important;
      }
    }
  }
}
</style>
