<template>
  <div class="post-card">
    <router-link :to="`/posts/${post.id}`">
      <img
        :src="getImageUrl(post.image_url)"
        alt="Post image"
        class="post-image"
      />
      <h3>{{ post.title }}</h3>
    </router-link>
    <p class="post-date">
      {{ new Date(post.published_at).toLocaleDateString() }}
    </p>
  </div>
</template>

<script lang="ts" setup>
interface Post {
  id: number;
  title: string;
  image_url: string;
  published_at: string;
}

const props = defineProps<{ post: Post }>();

const getImageUrl = (path: string): string => {
  if (path.startsWith("static/")) {
    const filename = path.split("/").pop();
    return `http://localhost:8000/api/image/${filename}`;
  }
  return path;
};
</script>

<style scoped>
.post-card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.2s ease;
}
.post-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.post-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}
.post-date {
  font-size: 0.9rem;
  color: #666;
}
</style>
