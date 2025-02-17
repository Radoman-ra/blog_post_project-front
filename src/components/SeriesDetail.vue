<template>
  <div>
    <h2>{{ series.title }}</h2>
    <img v-if="series.image_url" :src="series.image_url" alt="Series image" />
    <p>{{ series.description }}</p>
    <h3>Posts in this series</h3>
    <ul>
      <li v-for="post in series.posts" :key="post.id">
        <router-link :to="`/posts/${post.id}`">
          {{ post.order_in_series }}. {{ post.title }} -
          {{ new Date(post.published_at).toLocaleDateString() }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  published_at: string;
  order_in_series: number;
}

interface Series {
  id: number;
  title: string;
  description: string;
  image_url: string;
  posts: Post[];
}

const route = useRoute();
const series = ref<Series>({
  id: 0,
  title: "",
  description: "",
  image_url: "",
  posts: [],
});

onMounted(async () => {
  const seriesId = route.params.id;
  try {
    const response = await axios.get(
      `http://localhost:8000/series/${seriesId}`
    );
    series.value = response.data;
  } catch (error) {
    console.error("Error fetching series details", error);
  }
});
</script>
