<template>
  <ul class="error-messages">
    <template v-for="(errs, field) in errors">
      <li v-for="err in errs" :key="`${field}-${err}`">{{ `${field} ${err}` }}</li>
    </template>
  </ul>
</template>

<script>
export default {
  name: "errorMessages",
  props: {
    errors: {
      type: Object,
      required: true,
    },
  },
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