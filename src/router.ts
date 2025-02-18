import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./views/Home.vue";
import Series from "./views/Series.vue";
import Post from "./views/Post.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Home", component: Home },
  { path: "/series/:id", name: "Series", component: Series, props: true },
  { path: "/posts/:id", name: "Post", component: Post, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
