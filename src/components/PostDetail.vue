<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <img v-if="post.image_url" :src="post.image_url" alt="Post image" />
    <p>Published: {{ new Date(post.published_at).toLocaleDateString() }}</p>
    <p v-if="post.order_in_series">
      Order in Series: {{ post.order_in_series }}
    </p>
    <div v-html="renderedContent"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import MarkdownIt from "markdown-it";

interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string;
  published_at: string;
  order_in_series?: number;
}

const route = useRoute();
const post = ref<Post | null>(null);
const md = new MarkdownIt();

onMounted(async () => {
  const postId = route.params.id;
  try {
    const response = await axios.get(`http://localhost:8000/posts/${postId}`);
    post.value = response.data;
  } catch (error) {
    console.error("Error fetching post details", error);
  }
});

const renderedContent = computed(() => {
  return post.value ? md.render(post.value.content) : "";
});
</script>
