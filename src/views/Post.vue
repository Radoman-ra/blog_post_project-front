<template>
  <div class="post-container" v-if="post">
    <h2>{{ post.title }}</h2>
    <p class="post-meta">
      {{ new Date(post.published_at).toLocaleDateString() }}
      <template v-if="seriesDetail">
        | Series: <strong>{{ seriesDetail.title }}</strong>
        <span v-if="post.order_in_series && seriesDetail.posts">
          — Post {{ post.order_in_series }} of {{ seriesDetail.posts.length }}
        </span>
      </template>
    </p>
    <img
      v-if="post.image_url"
      :src="getImageUrl(post.image_url)"
      alt="Post image"
      class="post-image"
    />
    <div v-html="renderedContent" class="post-content"></div>
  </div>
  <div v-else class="loading">
    <p>Loading a post...</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
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
  series_id?: number;
}

interface SeriesDetail {
  id: number;
  title: string;
  posts: Post[];
}

const route = useRoute();
const post = ref<Post | null>(null);
const seriesDetail = ref<SeriesDetail | null>(null);
const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

const getImageUrl = (path: string): string => {
  if (path.startsWith("static/")) {
    const filename = path.split("/").pop();
    return `http://localhost:8000/api/image/${filename}`;
  }
  return path;
};

const fetchPost = async (id: string | string[] | undefined) => {
  if (!id) return;
  try {
    const response = await axios.get(`http://localhost:8000/posts/${id}`);
    post.value = response.data;
    if (post.value && post.value.series_id) {
      fetchSeriesDetail(post.value.series_id);
    } else {
      seriesDetail.value = null;
    }
  } catch (error) {
    console.error("Error fetching post detail:", error);
  }
};

const fetchSeriesDetail = async (seriesId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/series/${seriesId}`
    );
    seriesDetail.value = response.data;
  } catch (error) {
    console.error("Error fetching series detail:", error);
    seriesDetail.value = null;
  }
};

onMounted(() => {
  fetchPost(route.params.id);
});

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      fetchPost(newId);
    }
  }
);

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
  margin-bottom: 1rem;
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
.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}
</style>
