<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <ArticleMeta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.htmlBody"></div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article" />
      </div>

      <ArticleComments :article="article" />
    </div>
  </div>
</template>

<script>
import { getArticle } from "@/api/article";
import ArticleMeta from "./components/article-meta";
import ArticleComments from "./components/article-comments";
import MarkdownIt from "markdown-it";

export default {
  name: "Article",
  async asyncData({ params }) {
    const md = new MarkdownIt();
    const {
      data: { article },
    } = await getArticle(params.slug);
    article.htmlBody = md.render(article.body);

    return {
      article,
    };
  },
  data() {
    return {};
  },
  components: {
    ArticleMeta,
    ArticleComments,
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [{ hid: "description", name: "description", content: this.article.description }],
    };
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
</style>
