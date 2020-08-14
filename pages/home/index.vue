<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href>Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href>Global Feed</a>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link
                :to="{ name: 'profile-username', params: { username: article.author.username} }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{ name: 'profile-username', params: { username: article.author.username } }"
                >{{ article.author.username}}</nuxt-link>
                <span class="date">{{ article.createdAt }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                active: article.favorited }"
              >
                <i class="ion-heart"></i>
                {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{ name: 'article-slug', params: { slug: article.slug } }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- page numbers -->
          <nav>
            <ul class="pagination">
              <li
                v-for="page in totalPage"
                :key="page"
                class="page-item"
                :class="{ active: currentPage === page}"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                name: 'home',
                query: { page }}"
                >{{ page }}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href class="tag-pill tag-default">programming</a>
              <a href class="tag-pill tag-default">javascript</a>
              <a href class="tag-pill tag-default">emberjs</a>
              <a href class="tag-pill tag-default">angularjs</a>
              <a href class="tag-pill tag-default">react</a>
              <a href class="tag-pill tag-default">mean</a>
              <a href class="tag-pill tag-default">node</a>
              <a href class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";

export default {
  name: "homeIndex",
  data() {
    return {};
  },
  async asyncData({ query }) {
    const limit = 20;
    const queryPage = Number.parseInt(query.page);
    const currentPage = isNaN(queryPage) ? 1 : queryPage;
    const {
      data: { articles, articlesCount },
    } = await getArticles({
      limit,
      offset: (currentPage - 1) * limit,
    });
    return {
      articles,
      articlesCount,
      limit,
      currentPage,
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  watchQuery: ["page"],
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
</style>