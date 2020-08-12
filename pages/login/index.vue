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

          <form>
            <fieldset class="form-group" v-if="!isLoginMode">
              <input class="form-control form-control-lg" type="text" placeholder="Your Name" />
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Email" />
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Password" />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">{{ title }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginIndex",
  data() {
    return {};
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
  methods: {},
};
</script>

<style scoped>
</style>
