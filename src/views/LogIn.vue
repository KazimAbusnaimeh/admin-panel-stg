<template>
  <a-card style="margin-top: 40px">
    <h1 style="text-align: center">Log In</h1>
    <a-form
      layout="vertical"
      :model="form"
      @finish="handleSubmitSuccess"
      @finishFailed="FormError"
    >
      <a-form-item
        label="Email"
        name="email"
        :rules="[
          {
            type: 'email',
            required: true,
            message: 'Please input valid email',
          },
        ]"
      >
        <a-input placeholder="email" v-model:value="form.email" />
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
            validator: (rule, value, callback) => {
              if (value.length > 0 && value.length < 6) {
                callback(
                  new Error('Password must be at least 6 characters long!')
                );
              } else {
                callback();
              }
            },
          },
        ]"
      >
        <a-input-password
          placeholder="password"
          v-model:value="form.password"
        />
      </a-form-item>
      <a-form-item style="text-align: center">
        <a-button type="primary" html-type="submit" :loading="submitLoading">
          {{ submitLoading ? "Loading" : "Submit" }}
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script>
export default {
  data() {
    return { submitLoading: false, form: { email: "", password: "" } };
  },
  methods: {
    async handleSubmitSuccess() {
      this.submitLoading = true;
      await this.$store.dispatch("logIn", this.form);
      this.submitLoading = false;
    },
    async FormError() {},
  },
};
</script>
<style></style>
