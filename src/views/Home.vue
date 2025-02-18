<template>
  <div>
    <h2>Last Posts</h2>
    <InfinitePosts />
  </div>
</template>

<script lang="ts" setup>
import InfinitePosts from "../components/InfinitePosts.vue";
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}
</style>
