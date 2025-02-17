<template>
  <div>
    <h2>All Posts</h2>
    <div v-for="post in posts" :key="post.id" class="post">
      <router-link :to="`/posts/${post.id}`">
        <h3>{{ post.title }}</h3>
      </router-link>
      <p>{{ new Date(post.published_at).toLocaleDateString() }}</p>
    </div>
    <button v-if="!loading" @click="loadMore">Load More</button>
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  published_at: string;
}

const posts = ref<Post[]>([]);
const offset = ref(0);
const limit = 10;
const loading = ref(false);

const loadMore = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `http://localhost:8000/posts?offset=${offset.value}&limit=${limit}`
    );
    posts.value.push(...response.data);
    offset.value += limit;
  } catch (error) {
    console.error("Error loading more posts", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadMore();
});
</script>
