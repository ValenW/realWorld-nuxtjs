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
                <nuxt-link
                  v-if="user"
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: { tab: 'your_feed' }
                  }"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: { tab: 'global_feed' }
                  }"
                >Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'tag' }"
                  :to="{
                    name: 'home',
                    query: { tab: 'tag', tag }
                  }"
                ># {{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>

          <Article v-for="article in articles" :key="article.slug" :article="article" />

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
                query: { page, tag: $route.query.tag, tab }}"
                >{{ page }}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                v-for="tag in tags"
                :key="tag"
                :to="{ name: 'home', query: { tag, tab: 'tag' }}"
                class="tag-pill tag-default"
              >{{ tag }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getYourFeedArticles } from "@/api/article";
import { getTags } from "@/api/tag";
import Article from "@/components/article";
import { mapState } from "vuex";

export default {
  name: "homeIndex",
  data() {
    return {};
  },
  async asyncData({ query }) {
    const limit = 20;
    const queryPage = Number.parseInt(query.page);
    const currentPage = isNaN(queryPage) ? 1 : queryPage;
    const tab = query.tab || "global_feed";
    const articleLoader =
      tab === "your_feed" ? getYourFeedArticles : getArticles;

    let articles, articlesCount, tags;
    try {
      [
        {
          data: { articles, articlesCount },
        },
        {
          data: { tags },
        },
      ] = await Promise.all([
        articleLoader({
          limit,
          offset: (currentPage - 1) * limit,
          tag: query.tag,
        }),
        getTags(),
      ]);
    } catch (error) {
      articles = [];
      articlesCount = 0;
      tags = [];
    }

    return {
      articles,
      tags,
      articlesCount,
      limit,
      currentPage,
      tab,
      tag: query.tag,
    };
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  watchQuery: ["page", "tag", "tab"],
  watch: {},
  mounted() {},
  methods: {},
  components: {
    Article,
  },
};
</script>

<style scoped>
</style>