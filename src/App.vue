<template>
  <div id="app">
    <h1>Scholar Record Classifier</h1>
    <div class="main-container">
      <sidebar></sidebar>
      <classifier></classifier>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import Classifier from './components/Classifier.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
    Classifier
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
.main-container {
  display: flex;
  flex-direction: row;
}
</style>
