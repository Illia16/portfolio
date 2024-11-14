<template>
  <div id="app" class="relative">
    <Border />
    <Header @clickNav="toggleNav" :navOpen="navOpen" />
    <About />
    <Skills :skills="skills"/>
    <Projects @setActiveProjects="toggleProjects" :activeProjects="activeProjects" :actionsMade="actionsMade" :projects="projects"/>
    <Contact />
  </div>
</template>

<script>
import Border from './components/Border'
import Header from './components/Header'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

export default {
  name: 'App',
  components: {
    Border,
    Header,
    About,
    Skills,
    Projects,
    Contact,
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
      },
      projects: {
        exploreSpace: {
          key: 'exploreSpace',
          name: 'Explore Space',
          info: 'The team project built on jQuery is now rebuilt on React. With NASA API, this app lets user find media of the selected date, Mars photos taken by a rover and other space data.',
          bgImage: 'exploreSpace.png',
          category: ['featured', 'react', 'all'],
          liveLink: 'https://illia16.github.io/spaceApp/',
          codeLink: 'https://github.com/Illia16/spaceApp',
        },
        toDoApp: {
          key: 'toDoApp',
          name: 'To Do App',
          info: 'A multilanguage app that allows user to log in via Google-Authentication or continue as anonymous. The user can add/remove items in the list stored in the database.',
          bgImage: 'toDoApp.png',
          category: ['featured', 'react', 'all'],
          liveLink: 'https://illia16.github.io/toDoApp/',
          codeLink: 'https://github.com/Illia16/toDoApp',
        },
        starWarsExplorer: {
          key: 'starWarsExplorer',
          name: 'Star Wars Explorer',
          info: 'See the information about Star Wars characters, planets, movies. Built with React, Redux, Material UI as a styling framework.',
          bgImage: 'starWarsExplorer.jpg',
          category: ['react', 'all'],
          liveLink: 'https://illia16.github.io/star-wars-explorer/',
          codeLink: 'https://github.com/Illia16/star-wars-explorer',
        },
        findMovie: {
          key: 'findMovie',
          name: 'Find a movie',
          info: 'Find a movie based on genre(s) and/or release year from The Movie Database API. With Firebase database, save the movies that you have watched.',
          bgImage: 'findMovie.png',
          category: ['js', 'all'],
          liveLink: 'https://illia16.github.io/find-a-movie/',
          codeLink: 'https://github.com/Illia16/find-a-movie',
        },
        mealGenerator: {
          key: 'mealGenerator',
          name: 'Meal Generator',
          info: 'Virtually cook meals, add your own ingridients and meals with any ingridients specified.',
          bgImage: 'mealGenerator.png',
          category: ['js', 'all'],
          liveLink: 'https://illia16.github.io/MealGenerator/',
          codeLink: 'https://github.com/Illia16/MealGenerator',
        },
        boatPSD: {
          key: 'boatPSD',
          name: 'Boat Ride Adventures',
          info: 'A multipage website PDS conversion.',
          bgImage: 'boatPSD.png',
          category: ['html', 'all'],
          liveLink: 'https://illia16.github.io/BoatRideAdventuresPSD/',
          codeLink: 'https://illia16.github.io/BoatRideAdventuresPSD/',
        },
        bagsPSD: {
          key: 'bagsPSD',
          name: 'Galass Handbags',
          info: 'A single page PDS conversion using only floats.',
          bgImage: 'bagsPSD.png',
          category: ['html', 'all'],
          liveLink: 'https://illia16.github.io/galass-handbags-PSD/',
          codeLink: 'https://github.com/Illia16/galass-handbags-PSD',
        },
      },
      activeProjects: 'featured',
      actionsMade: 0,
    }
  },
  methods: {
    toggleNav: function() {
      this.actionsMade += 1;
      this.navOpen = !this.navOpen;
    },
    toggleProjects: function(val) {
      this.actionsMade += 1;
      this.activeProjects = val;
    },
  },
  computed: {
    disableScroll() {
      return this.navOpen;
    }
  },
  watch: {
    disableScroll(navOpen) {
      const focusDisableOnOtherElement = document.querySelectorAll('#about a, #projects a, #projects button, #contact a, #contact input, #contact button, textarea');
      let documentScroll = document.documentElement.style;

      if (navOpen) {
        documentScroll.overflow = "hidden";
        for (const element of focusDisableOnOtherElement) {
          element.tabIndex = '-1';
        }
      } else {
        documentScroll.overflow = "auto";
        for (const element of focusDisableOnOtherElement) {
          element.tabIndex = '0';
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
