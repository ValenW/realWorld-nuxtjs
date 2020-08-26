<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ErrorMessages :errors="errors" />
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="newTag"
                  @keypress.enter.prevent="tagEnter"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list">
                  <span class="tag-default tag-pill" v-for="tag in article.tagList" :key="tag">
                    <i class="ion-close-round" @click="() => removeTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                @click="publish"
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
              >Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, createArticle, updateArticle, deleteArticle } from "@/api/article";
import ErrorMessages from "@/components/errorMessages";

export default {
  name: "Editor",
  data() {
    return {
      newTag: "",
      errors: {},
    };
  },
  async asyncData({ params }) {
    const article = {
      title: "",
      description: "",
      body: "",
      tagList: [],
    };
    const slug = params.slug;

    if (slug) {
      const {
        data: { article: oldArticle },
      } = await getArticle(slug);
      article.title = oldArticle.title;
      article.description = oldArticle.description;
      article.body = oldArticle.body;
      article.tagList = oldArticle.tagList;
    }
    return {
      article,
      slug,
    };
  },
  middleware: ["authenticated"],
  computed: {},
  components: {},
  watch: {},
  mounted() {},
  methods: {
    tagEnter(event) {
      const tag = this.newTag.trim();
      if (tag && !this.article.tagList.some((t) => t === tag)) {
        this.article.tagList.push(tag);
      }
      this.newTag = "";
    },
    removeTag(tag) {
      const index = this.article.tagList.findIndex((t) => t === tag);
      this.article.tagList.splice(index, 1);
    },
    async publish() {
      try {
        const {
          data: { article },
        } = await (this.slug
          ? updateArticle(this.slug, { article: this.article })
          : createArticle({ article: this.article }));
        console.log(article);
        this.$router.push({ name: "article-slug", params: { slug: article.slug } });
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
  },
  components: {
    ErrorMessages,
  },
};
</script>

<style scoped>
</style>
