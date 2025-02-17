<template>
  <div>
    <h3>Series</h3>
    <ul>
      <li v-for="serie in series" :key="serie.id">
        <router-link :to="`/series/${serie.id}`">{{ serie.title }}</router-link>
      </li>
    </ul>
    <h3>Recent Posts</h3>
    <ul>
      <li v-for="post in recentPosts" :key="post.id">
        <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface Series {
  id: number;
  title: string;
}
interface Post {
  id: number;
  title: string;
}

const series = ref<Series[]>([]);
const recentPosts = ref<Post[]>([]);

onMounted(async () => {
  try {
    const seriesResponse = await axios.get("http://localhost:8000/series");
    series.value = seriesResponse.data;

    const postsResponse = await axios.get(
      "http://localhost:8000/posts?limit=5"
    );
    recentPosts.value = postsResponse.data;
  } catch (error) {
    console.error("Error fetching sidebar data", error);
  }
});
</script>
