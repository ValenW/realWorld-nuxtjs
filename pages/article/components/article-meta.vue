<template>
  <div class="article-meta">
    <a href>
      <img src="http://i.imgur.com/Qr71crq.jpg" />
    </a>
    <div class="info">
      <a href class="author">Eric Simons</a>
      <span class="date">January 20th</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow Eric Simons
      <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary">
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post
      <span class="counter">(29)</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ArticleMeta",
  data() {
    return {};
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
</style>