<template>
  <div id="app" class="relative">
    <Border />
    <Header @clickNav="toggleNav" :navOpen="navOpen" />
    <About />
    <Skills :skills="skills"/>
  </div>
</template>

<script>
import Border from './components/Border'
import Header from './components/Header'
import About from './components/About'
import Skills from './components/Skills'

export default {
  name: 'App',
  components: {
    Border,
    Header,
    About,
    Skills,
  },
  data() {
    return {
      navOpen: false,
      skills: {
        current: [
          { 
            skillName: 'JavaScript',
            skillClass: 'fab fa-js text-skills-js',
          },
          { 
            skillName: 'JQuery',
            skillClass: 'devicon-jquery-plain text-skills-jquery',
          },
          {
            skillName: 'React',
            skillClass: 'fab fa-react text-skills-react',
          },
          {
            skillName: 'Git/Github',
            skillClass: 'devicon-git-plain text-skills-git',
          },
          {
            skillName: 'HTML5',
            skillClass: 'fab fa-html5 text-skills-html',
          },
          {
            skillName: 'CSS3',
            skillClass: 'fab fa-css3-alt text-skills-css',
          },
          {
            skillName: 'SASS',
            skillClass: 'fab fa-sass text-skills-sass',
          },
          {
            skillName: 'Firebase',
            skillClass: 'h-10 md:h-24',
          },
          {
            skillName: 'Responsive design',
            skillClass: 'fas fa-mobile-alt text-skills-respDesign',
          },
          {
            skillName: 'Accessibility',
            skillClass: 'fas fa-universal-access text-skills-a11y',
          },
          {
            skillName: 'Paired programming',
            skillClass: 'far fa-handshake text-skills-pairedProgramming',
          },
          {
            skillName: 'Vue.js',
            skillClass: 'fab fa-vuejs text-skills-vuejs',
          },
        ],
        mastering: [
          {
            skillName: 'Node.js',
            skillClass: 'fab fa-node-js text-skills-nodejs',
          },
          {
            skillName: 'AWS',
            skillClass: 'fab fa-aws text-skills-aws',
          },
          {
            skillName: 'TypeScript',
            skillClass: 'devicon-typescript-plain colored',
          },
          {
            skillName: 'Redux',
            skillClass: 'devicon-redux-original colored',
          },
        ],
      }
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

</style>
