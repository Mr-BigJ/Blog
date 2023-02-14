<template>
  <div id="app">
    <router-view >
    </router-view>
  </div>
</template>

<script>
import login from './pages/login.vue'
export default {
  
  name: 'App',
  components: {
    login
    
  },
  mounted(){
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;


}
</style>
