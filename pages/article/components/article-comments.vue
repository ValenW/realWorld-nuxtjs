<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form" @submit.prevent="postComment">
        <div class="card-block">
          <textarea
            class="form-control"
            placeholder="Write a comment..."
            rows="3"
            v-model="newComment"
          ></textarea>
        </div>
        <div class="card-footer">
          <img :src="user.image" class="comment-author-img" />
          <button class="btn btn-sm btn-primary" :disabled="posting">Post Comment</button>
        </div>
      </form>

      <div class="card" v-for="comment in sortedComments" :key="comment.id">
        <div class="card-block">
          <p class="card-text">{{ comment.body }}</p>
        </div>
        <div class="card-footer">
          <nuxt-link
            class="comment-author"
            :to="{
              name: 'profile',
              params: {
                username: comment.author.username
              }
            }"
          >
            <img :src="comment.author.image" class="comment-author-img" />
          </nuxt-link>&nbsp;
          <nuxt-link
            class="comment-author"
            :to="{
              name: 'profile',
              params: {
                username: comment.author.username
              }
            }"
          >{{ comment.author.username }}</nuxt-link>
          <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY')}}</span>
          <span class="mod-options" v-if="comment.author.username === user.username">
            <i class="ion-trash-a" @click="deleteComment(comment.id)"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComments, deleteComment } from "@/api/article";
import { mapState } from "vuex";

export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      newComment: "",
      posting: false,
      deleting: false,
    };
  },
  computed: {
    ...mapState(["user"]),
    sortedComments() {
      return this.comments.sort((a, b) => new Date(a.createdAt) > new Date(b.createdAt));
    },
  },
  async mounted() {
    const {
      data: { comments },
    } = await getComments(this.article.slug);
    this.comments = comments;
  },
  components: {},
  watch: {},
  methods: {
    async postComment() {
      if (this.posting) {
        return;
      }
      this.posting = true;
      const {
        data: { comment },
      } = await addComments(this.article.slug, { comment: { body: this.newComment } });
      this.comments.push(comment);
      this.newComment = "";
      this.posting = false;
    },
    async deleteComment(id) {
      if (this.deleting) {
        return;
      }
      this.deleting = true;
      await deleteComment(this.article.slug, id);
      const index = this.comments.findIndex((c) => c.id === id);
      this.comments.splice(index, 1);
      this.deleting = false;
    },
  },
};
</script>

<style scoped>
</style>