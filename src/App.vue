<template>
  <div id="app" class="relative">
    <Border />
    <Header @clickNav="toggleNav" :navOpen="navOpen" />
    <About />
  </div>
</template>

<script>
import Border from './components/Border'
import Header from './components/Header'
import About from './components/About'

export default {
  name: 'App',
  components: {
    Border,
    Header,
    About,
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
