<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username}}</h4>
            <p>{{ profile.bio }}</p>
            <nuxt-link
              v-if="user && profile.username === user.username"
              class="btn btn-sm btn-outline-secondary action-btn"
              :to="{ name: 'settings' }"
            >
              <i class="ion-gear-a"></i>
              Edit Profile Settings
            </nuxt-link>
            <button
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
              :class="{ active: profile.following }"
              :disabled="followingAuthor"
              @click="toggleFollow"
            >
              <i class="ion-plus-round"></i>
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
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'my_article' }"
                  exact
                  :to="{
                    ...$route,
                    query: { tab: 'my_article' }
                  }"
                >My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'favorite_article' }"
                  exact
                  :to="{
                    ...$route,
                    query: { tab: 'favorite_article' }
                  }"
                >Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <template v-if="articles && articles.length > 0">
            <Article v-for="article in articles" :key="article.slug" :article="article" />
          </template>
          <div class="article-preview" v-else>No articles are here... yet.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { follow, unFollow, getProfile } from "@/api/user";
import { getArticles } from "@/api/article";
import Article from "@/components/article";
import { mapState } from "vuex";

export default {
  name: "Profile",
  async asyncData({ params, store, query }) {
    const username = params.username || store.state.user.username;
    const tab = (query && query.tab) || "my_article";
    const articleParams = {
      author: tab === "my_article" ? params.username : undefined,
      favorited: tab === "favorite_article" ? params.username : undefined,
    };

    const [
      {
        data: { profile },
      },
      {
        data: { articles, articlesCount },
      },
    ] = await Promise.all([getProfile(username), getArticles(articleParams)]);

    return {
      profile,
      tab,
      articles,
    };
  },
  data() {
    return {
      followingAuthor: false,
      tab: "my_article",
    };
  },
  middleware: ["authenticated"],
  components: { Article },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  watchQuery: ["tab"],
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
