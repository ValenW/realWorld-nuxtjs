<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username}}</h4>
            <p>{{ profile.bio }}</p>
            <button
              v-if="user && profile.username === user.username"
              class="btn btn-sm btn-outline-secondary action-btn"
              :class="{ active: profile.following }"
              :disabled="followingAuthor"
              @click="toggleFollow"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              {{ profile.following ? 'Unfollow' : 'Follow' }} {{ profile.username }}
              <span
                class="counter"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href>My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href>Favorited Articles</a>
              </li>
            </ul>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href>
                <img src="http://i.imgur.com/Qr71crq.jpg" />
              </a>
              <div class="info">
                <a href class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href>
                <img src="http://i.imgur.com/N4VcUeJ.jpg" />
              </a>
              <div class="info">
                <a href class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href class="preview-link">
              <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { follow, unFollow, getProfile } from "@/api/user";
import { mapState } from "vuex";

export default {
  name: "Profile",
  async asyncData({ params, store }) {
    const username = params.username || store.state.user.username;
    const {
      data: { profile },
    } = await getProfile(username);
    return {
      profile,
    };
  },
  data() {
    return {
      followingAuthor: false,
    };
  },
  middleware: ["authenticated"],
  components: {},
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  mounted() {},
  methods: {
    async toggleFollow() {
      this.followingAuthor = true;

      const request = this.profile.following ? unFollow : follow;
      try {
        const {
          data: { profile },
        } = await request(this.profile.username);
      } catch (error) {
        if (error.response.status === 401) {
          this.$router.push({ name: "login" });
        }
      }

      Object.assign(this.profile, profile);
      this.followingAuthor = false;
    },
  },
};
</script>

<style scoped>
</style>