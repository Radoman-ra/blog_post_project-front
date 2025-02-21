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
  max-width: 1200px;
  margin: 2rem auto;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 90vh;
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
  padding: 0.75rem;
  font-size: 0.9rem;
}
</style>
