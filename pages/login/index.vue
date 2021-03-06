<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ title }}</h1>
          <p class="text-xs-center">
            <nuxt-link :to="tipLink">{{ tipMessage }}</nuxt-link>
          </p>

          <ErrorMessages :errors="errors" />

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLoginMode">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                minlength="8"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">{{ title }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// only import in client mode
import { login, register } from "@/api/user";
import ErrorMessages from "@/components/errorMessages";

export default {
  name: "loginIndex",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  middleware: ["notAuthenticated"],
  computed: {
    mode() {
      return this.$route.name;
    },
    isLoginMode() {
      return this.mode === "login";
    },
    title() {
      return this.isLoginMode ? "Sign in" : "Sign up";
    },
    tipMessage() {
      return this.isLoginMode ? "Need an account?" : "Have an account?";
    },
    tipLink() {
      return this.isLoginMode ? "/register" : "/login";
    },
  },
  watch: {},
  mounted() {},
  methods: {
    async onSubmit() {
      try {
        const requestMethod = this.isLoginMode ? login : register;
        const {
          errors,
          data: { user: user },
        } = await requestMethod({ user: this.user });
        if (errors) {
          this.handleError(errors);
        } else if (user) {
          this.$store.commit("setUser", user);
          this.$router.push("/");
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    handleError(error) {
      this.errors = error.response.data.errors;
    },
  },
  components: {
    ErrorMessages,
  },
};
</script>

<style scoped>
</style>
