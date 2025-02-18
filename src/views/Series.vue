<template>
  <div class="series-container">
    <div class="series-header">
      <img
        v-if="serie.image_url"
        :src="getImageUrl(serie.image_url)"
        alt="Series image"
        class="series-image"
      />
      <div class="series-info">
        <h2>{{ serie.title }}</h2>
        <p>{{ serie.description }}</p>
      </div>
    </div>
    <div class="series-posts">
      <h3>Posts in the series</h3>
      <ul>
        <li v-for="post in serie.posts" :key="post.id">
          <router-link :to="`/posts/${post.id}`">
            {{ post.order_in_series }}. {{ post.title }} -
            {{ new Date(post.published_at).toLocaleDateString() }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  published_at: string;
  order_in_series: number;
}

interface SeriesDetail {
  id: number;
  title: string;
  description: string;
  image_url: string;
  posts: Post[];
}

const route = useRoute();
const serie = ref<SeriesDetail>({
  id: 0,
  title: "",
  description: "",
  image_url: "",
  posts: [],
});

const getImageUrl = (path: string): string => {
  if (path.startsWith("static/")) {
    const filename = path.split("/").pop();
    return `http://localhost:8000/api/image/${filename}`;
  }
  return path;
};

const fetchSeries = async (id: string | string[] | undefined) => {
  if (!id) return;
  try {
    const response = await axios.get(`http://localhost:8000/series/${id}`);
    serie.value = response.data;
  } catch (error) {
    console.error("Error fetching series detail:", error);
  }
};

onMounted(() => {
  fetchSeries(route.params.id);
});

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      fetchSeries(newId);
    }
  }
);
</script>

<style scoped>
.series-container {
  padding: 1rem;
}
.series-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.series-image {
  width: 200px;
  height: auto;
  border-radius: 4px;
  object-fit: cover;
}
.series-info h2 {
  margin: 0;
  font-size: 1.8rem;
}
.series-info p {
  margin-top: 0.5rem;
  color: #555;
}
.series-posts ul {
  list-style: none;
  padding: 0;
}
.series-posts li {
  margin-bottom: 0.5rem;
}
</style>
