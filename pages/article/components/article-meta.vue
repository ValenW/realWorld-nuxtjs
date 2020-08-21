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
      <span class="date">{{ article.createdAt | date('MMM DD, YYY')}}</span>
    </div>
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
  </div>
</template>

<script>
import { follow, unFollow } from "@/api/user";
import { addFavorite, deleteFavorite } from "@/api/article";

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
    };
  },
  components: {},
  watch: {},
  methods: {
    async toggleFollow() {
      this.followingAuthor = true;

      const request = this.article.author.following ? unFollow : follow;
      const {
        data: { profile },
      } = await request(this.article.author.username);
      this.$emit("updateAuthor", profile);

      this.followingAuthor = false;
    },
    async toggleFavorite() {
      this.favoring = true;

      const request = this.article.favorited ? deleteFavorite : addFavorite;
      const {
        data: { article },
      } = await request(this.article.slug);
      this.$emit("toggleFavorite", article.favorited);

      this.favoring = false;
    },
  },
};
</script>

<style scoped>
</style>