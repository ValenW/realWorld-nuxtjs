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
    >
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post
      <span class="counter">(29)</span>
    </button>
  </div>
</template>

<script>
import { follow, unFollow } from "@/api/user";

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
  },
};
</script>

<style scoped>
</style>