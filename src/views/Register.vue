<template>
  <main>
    <a-card style="margin-top: 40px">
      <h1 style="width: 100%; text-align: center">Register</h1>
      <a-form
        layout="vertical"
        @finish="handleSuubmitSuccess"
        @finishFailed="FormError"
        :model="form"
      >
        <a-form-item
          label="Name"
          name="name"
          :rules="[
            { required: true, message: 'Please input your name!' },
            {
              validator: nameValidateError,
            },
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
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              validator: (rule, value, promise) => {
                if (value.length > 0 && value.length < 6) {
                  promise(
                    new Error('Password must be at least 6 characters long!')
                  );
                } else {
                  promise();
                }
              },
            },
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
            { required: true, message: 'Please Confirm your password!' },
            {
              validator: (rule, value, callback) => {
                if (value.length > 0 && form.password.length <= 0)
                  callback(new Error('Enter password first!'));
                else if (value.length > 0 && value != form.password) {
                  callback(
                    new Error('Confirm Password must match the password!')
                  );
                } else {
                  callback();
                }
              },
            },
          ]"
        >
          <a-input-password
            placeholder="Confirm Password"
            type="password"
            v-model:value="form.password_confirm"
          />
        </a-form-item>
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
export default {
  data() {
    return {
      submitLoading: false,
      form: {
        name: "",
        email: "",
        password: "",
        password_confirm: "",
      },
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
    async handleSuubmitSuccess() {
      this.submitLoading = true;
      await this.$store.dispatch("signUp", this.form);
      let error = this.$store.getters.getError;
      if (error) {
        this.submitLoading = false;
      } else this.submitLoading = false;
    },
    FormError(error) {},
    nameValidateError,
    inputName,
  },
};
</script>
