<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="profile.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="profile.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="profile.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="profile.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="profile.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                @click.prevent="update"
                class="btn btn-lg btn-primary pull-xs-right"
              >Update Settings</button>
            </fieldset>
          </form>

          <hr />
          <button class="btn btn-outline-danger" @click="logout">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { updateProfile } from "@/api/user";

export default {
  name: "Setting",
  async asyncData({ store }) {
    const emptyProfile = {
      email: "",
      bio: "",
      image: "",
      username: "",
      password: "",
    };
    return { profile: store && store.state.user ? { emptyProfile, ...store.state.user } : emptyProfile };
  },
  data() {
    return {};
  },
  middleware: ["authenticated"],
  components: {},
  watch: {},
  mounted() {},
  methods: {
    async update() {
      try {
        const {
          data: { user },
        } = await updateProfile({
          user: this.profile,
        });
        this.$store.commit("setUser", user);
        this.$router.push({ name: "profile-username", params: { username: user.username } });
      } catch (error) {
        console.dir(error);
      }
    },
    async logout() {
      this.$store.commit("removeUser");
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
</style>
