<template>
  <div class="post-container">
    <h2>{{ post.title }}</h2>
    <p class="post-meta">
      {{ new Date(post.published_at).toLocaleDateString() }}
      <span v-if="post.order_in_series">
        | Порядковый номер в серии: {{ post.order_in_series }}</span
      >
    </p>
    <img
      v-if="post.image_url"
      :src="post.image_url"
      alt="Post image"
      class="post-image"
    />
    <div v-html="renderedContent" class="post-content"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import MarkdownIt from "markdown-it";

interface Post {
  id: number;
  title: string;
  content: string;
  published_at: string;
  image_url: string | null;
  order_in_series?: number;
}

const route = useRoute();
const post = ref<Post | null>(null);
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

onMounted(async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/posts/${route.params.id}`
    );
    post.value = response.data;
  } catch (error) {
    console.error("Error fetching post detail:", error);
  }
});

const renderedContent = computed(() => {
  return post.value ? md.render(post.value.content) : "";
});
</script>

<style scoped>
.post-container {
  padding: 1rem;
}
.post-meta {
  font-size: 0.9rem;
  color: #666;
}
.post-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  margin: 1rem 0;
  border-radius: 4px;
}
.post-content {
  line-height: 1.6;
}
</style>
