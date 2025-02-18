<template>
  <div class="sidebar-content">
    <section class="series-list">
      <h3>Серии</h3>
      <ul>
        <li v-for="serie in series" :key="serie.id">
          <router-link :to="`/series/${serie.id}`">{{
            serie.title
          }}</router-link>
        </li>
      </ul>
    </section>
    <section class="recent-posts">
      <h3>Последние посты</h3>
      <ul>
        <li v-for="post in recentPosts" :key="post.id">
          <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";

interface Serie {
  id: number;
  title: string;
}
interface Post {
  id: number;
  title: string;
}

const series = ref<Serie[]>([]);
const recentPosts = ref<Post[]>([]);

const fetchSidebarData = async () => {
  try {
    const [seriesResponse, postsResponse] = await Promise.all([
      axios.get("http://localhost:8000/series"),
      axios.get("http://localhost:8000/posts?limit=5"),
    ]);
    series.value = seriesResponse.data;
    recentPosts.value = postsResponse.data;
  } catch (error) {
    console.error("Error fetching sidebar data:", error);
  }
};

onMounted(fetchSidebarData);
</script>

<style scoped>
.sidebar-content {
  padding: 0.5rem;
}
.sidebar-content h3 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
}
.sidebar-content ul {
  list-style: none;
  padding: 0;
}
.sidebar-content li {
  margin-bottom: 0.5rem;
}
</style>
