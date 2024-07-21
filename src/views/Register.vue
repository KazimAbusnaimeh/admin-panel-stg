<template>
  <main>
    <a-form layout="vertical" @submit.prevent="handleSubmit">
      <a-form-item label="Name" :required="true">
        <a-input
          placeholder="Name"
          v-model:value="form.name"
          :class="{ 'has-error': showError('name') }"
        />
        <div class="error-message" v-if="showError('name')">
          {{ errorMessage("name") }}
        </div>
      </a-form-item>
      <a-form-item label="Email" :required="true">
        <a-input
          placeholder="Email"
          v-model:value="form.email"
          :class="{ 'has-error': showError('email') }"
        />
        <div class="error-message" v-if="showError('email')">
          {{ errorMessage("email") }}
        </div>
      </a-form-item>
      <a-form-item label="Password" :required="true">
        <a-input-password
          placeholder="Password"
          type="password"
          v-model:value="form.password"
          :class="{ 'has-error': showError('password') }"
        />
        <div class="error-message" v-if="showError('password')">
          {{ errorMessage("password") }}
        </div>
      </a-form-item>
      <a-form-item label="Confirm Password" :required="true">
        <a-input-password
          placeholder="Confirm Password"
          type="password"
          v-model:value="form.password_confirm"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="submitLoading">
          {{ submitLoading ? "Loading" : "Submit" }}
        </a-button>
      </a-form-item>
    </a-form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      submitLoading: false,
      submitted: false,
      backendError: [],
      form: {
        name: "",
        email: "",
        password: "",
        password_confirm: "",
      },
    };
  },
  methods: {
    showError(type) {
      return (
        (this.submitted && !this.form[type]) ||
        this.backendError.find((error) => error.path == type)
      );
    },
    errorMessage(type) {
      return this.backendError.find((error) => error.path == type)
        ? this.backendError.find((error) => error.path == type).msg
        : "Please Enter Your name";
    },
    async handleSubmit() {
      this.submitLoading = true;
      this.submitted = true;
      if (Object.values(this.form).every((value) => value !== "")) {
        await this.$store.dispatch("signUp", this.form);
        let error = this.$store.getters.getError;
        if (error) {
          this.backendError = error;
        } else this.submitted = false;
      }
      this.submitLoading = false;
    },
  },
};
</script>
