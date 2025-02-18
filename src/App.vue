<template>
  <div class="app-container">
    <header class="header">
      <router-link to="/" class="header-link">
        <h1>copy-of-wanago.io Blog</h1>
      </router-link>
    </header>
    <div class="main-layout">
      <aside class="sidebar">
        <Sidebar />
      </aside>
      <main class="content">
        <router-view />
      </main>
    </div>
    <footer class="footer">
      <p>&copy; 2025 copy-of-wanago.io</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from "./components/Sidebar.vue";
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}

.header-link {
  text-decoration: none;
  color: inherit;
}

.main-layout {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 250px;
  padding: 1rem;
  background: #f4f4f4;
  border-right: 1px solid #ccc;
}

.content {
  flex: 1;
  padding: 1rem;
}

.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 0.5rem;
}
</style>
