<template>
  <div id="app">
    <Header @clickNav="toggleNav" :navOpen="navOpen" />
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      navOpen: false,

    }
  },
  methods: {
    toggleNav: function() {
      this.navOpen = !this.navOpen;
    },
  }
}
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;

//   img {
//     @apply bg-red-600;
// }
// }
</style>
