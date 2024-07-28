<template>
  <main>
    <a-card style="margin-top: 40px">
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
              <UploadOutlined style="font-size: 20px" />Upload file
            </a-button>
          </a-upload>
          <div v-if="userImage.length" style="margin-top: 10px">
            <div style="width: 400px; height: 400px">
              <img
                :src="imagePreview"
                style="object-fit: fill; width: 100%; height: 100%"
              />
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              <p>{{ userImage[0].name }}</p>
              <a-button
                @click="handleRemove(userImage[0])"
                style="margin-top: 10px"
                >Remove file</a-button
              >
            </div>
          </div>
        </a-form-item>
        <div style="text-align: right">
          <a-button
            type="link"
            style="margin-top: -10px !important; padding: 0 !important"
          >
            <router-link to="/log-in">Log In</router-link></a-button
          >
        </div>
        <a-form-item style="margin-top: 10px; width: 100%; text-align: center">
          <a-button type="primary" html-type="submit" :loading="submitLoading">
            {{ submitLoading ? "Loading" : "Submit" }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </main>
</template>

<script>
import { nameValidateError, inputName } from "../utils/Extentions";
import { UploadOutlined } from "@ant-design/icons-vue";

export default {
  components: { UploadOutlined },
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
      this.userImage = [file];
      this.createImagePreview(file);
      return false;
    },
    createImagePreview(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    handleRemove(file) {
      this.userImage = [];
      this.imagePreview = "";
    },
    async handleSubmitSuccess() {
      this.submitLoading = true;
      await this.$store.dispatch("signUp", {
        ...this.form,
        userImage: this.userImage,
      });
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

<style scoped></style>
