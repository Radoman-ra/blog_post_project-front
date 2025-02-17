<template>
  <div id="app">
    <header>
      <h1>copy-of-wanago.io</h1>
    </header>
    <div class="container">
      <aside class="sidebar">
        <Sidebar />
      </aside>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
</script>

<style>
.container {
  display: flex;
}
.sidebar {
  width: 250px;
  padding: 1rem;
  border-right: 1px solid #ccc;
}
.content {
  flex: 1;
  padding: 1rem;
}
</style>
