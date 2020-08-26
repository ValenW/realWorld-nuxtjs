<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile-username',
        params: { username: article.author.username }
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: 'profile-username',
          params: { username: article.author.username }
        }"
      >{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY')}}</span>
    </div>
    <template v-if="user && user.username === article.author.username">
      <nuxt-link
        class="btn btn-sm btn-outline-secondary"
        :to="{ name: 'editor-slug', params: { slug: article.slug }}"
      >
        <i class="ion-edit"></i>
        &nbsp;
        Edit Article
      </nuxt-link>&nbsp;&nbsp;
      <button
        class="btn btn-outline-danger btn-sm"
        :class="{ active: deleting }"
        :disabled="deleting"
        @click="deleteArticle"
      >
        <i class="ion-trash-a"></i>
        &nbsp;
        Delete Article
      </button>
    </template>
    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following }"
        :disabled="followingAuthor"
        @click="toggleFollow"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        {{ article.author.following ? 'Unfollow' : 'Follow' }} {{ article.author.username }}
        <span
          class="counter"
        ></span>
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: article.favorited }"
        :disabled="favoring"
        @click="toggleFavorite"
      >
        <i class="ion-heart"></i>
        &nbsp;
        {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Post
        <span
          class="counter"
        >({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { follow, unFollow } from "@/api/user";
import { addFavorite, deleteFavorite, deleteArticle } from "@/api/article";
import { mapState } from "vuex";

export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      followingAuthor: false,
      favoring: false,
      deleting: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  components: {},
  watch: {},
  methods: {
    async toggleFollow() {
      this.followingAuthor = true;

      const request = this.article.author.following ? unFollow : follow;
      try {
        const {
          data: { profile },
        } = await request(this.article.author.username);
        this.$emit("updateAuthor", profile);
      } catch (error) {
        if (error.response.status === 401) {
          this.$router.push({ name: "login" });
        }
      }

      this.followingAuthor = false;
    },
    async toggleFavorite() {
      this.favoring = true;

      const request = this.article.favorited ? deleteFavorite : addFavorite;
      try {
        const {
          data: { article },
        } = await request(this.article.slug);
        this.$emit("toggleFavorite", article.favorited);
      } catch (error) {
        if (error.response.status === 401) {
          this.$router.push({ name: "login" });
        }
      }

      this.favoring = false;
    },
    async deleteArticle() {
      const data = await deleteArticle(this.article.slug);
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
</style>