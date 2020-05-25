<template>
  <div id="app">
    <NavTabs/>
    <main>
        <div class="content">
            <router-view></router-view>
        </div>
    </main>
  </div>
</template>

<script>
import NavTabs from './components/NavTabs.vue'

export default {
  name: 'App',
  components: {
    NavTabs,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
