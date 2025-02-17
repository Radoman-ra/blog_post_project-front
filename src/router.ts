import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./components/Home.vue";
import SeriesDetail from "./components/SeriesDetail.vue";
import PostDetail from "./components/PostDetail.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/series/:id",
    name: "SeriesDetail",
    component: SeriesDetail,
    props: true,
  },
  {
    path: "/posts/:id",
    name: "PostDetail",
    component: PostDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
