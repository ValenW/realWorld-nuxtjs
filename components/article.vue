<template>
  <div class="article-preview">
    <div class="article-meta">
      <nuxt-link :to="{ name: 'profile-username', params: { username: article.author.username} }">
        <img :src="article.author.image" />
      </nuxt-link>
      <div class="info">
        <nuxt-link
          class="author"
          :to="{ name: 'profile-username', params: { username: article.author.username } }"
        >{{ article.author.username}}</nuxt-link>
        <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
      </div>
      <button
        class="btn btn-outline-primary btn-sm pull-xs-right"
        :class="{ active: article.favorited }"
        :disabled="!!favoring"
        @click="onFavorite(article)"
      >
        <i class="ion-heart"></i>
        {{ article.favoritesCount }}
      </button>
    </div>
    <nuxt-link class="preview-link" :to="{ name: 'article-slug', params: { slug: article.slug } }">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </nuxt-link>
  </div>
</template>

<script>
import { addFavorite, deleteFavorite } from "@/api/article";

export default {
  name: "Article",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      favoring: false,
    };
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {
    async onFavorite(article) {
      this.favoring = true;
      if (article.favorited) {
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      this.favoring = false;
    },
  },
};
</script>

<style scoped>
</style>