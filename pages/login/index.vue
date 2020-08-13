<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ title }}</h1>
          <p class="text-xs-center">
            <nuxt-link :to="tipLink">{{ tipMessage }}</nuxt-link>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLoginMode">
              <input class="form-control form-control-lg" type="text" placeholder="Your Name" />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
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
import { login } from "@/api/user";

export default {
  name: "loginIndex",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
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
      return this.isLoginMode ? "/signup" : "login";
    },
  },
  watch: {},
  mounted() {},
  methods: {
    async onSubmit() {
      try {
        const {
          errors,
          data: { user: user },
        } = await login({ user: this.user });
        if (errors) {
          this.handleError(errors);
        } else if (user) {
          // TODO: store the login status
          console.log(user);
          this.$router.push("/");
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    handleError(error) {
      // TODO: handle errors
      console.error(error);
    },
  },
};
</script>

<style scoped>
</style>
