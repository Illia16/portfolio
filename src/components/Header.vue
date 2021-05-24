<template>
  <div>
     <header class="wrapper">
         <div class="w-full flex justify-between headerTop" id="headerTop">
             <div class="logoInitials">
                 <img src="../../src/assets/logoWhite.png" alt="logo initials I.N." class="h-10">
             </div>
 
             <button @click="toggleNav" aria-label="open navigation menu" id="openNav" class="relative z-30 showNavBtn" title="Navigation menu">
                 <span class="top-0 left-0 right-0"></span>
                 <span class="top-1/2 left-0 right-0"></span>
                 <span class="bottom-0 left-0 right-0"></span>
             </button>
         </div>

        <div id="headerBottom" aria-label="Hello there!" class="text-center m-auto">
            <h1>Illia Nikitin</h1>
            <h2>A Front-End Web Developer</h2>
        </div>


        <nav id="nav" v-if="navOpen" class="z-20">
            <div class="w-1/12">
                <img src="../../src/assets/logoWhite.png" alt="logo initials I.N.">
            </div>

            <ul class="flex flex-wrap justify-center items-center">
                <li><a href="header" class="scrollTo" data-bigletter="H">HOME</a></li>
                <li><a href="#about" class="scrollTo" data-bigletter="A">ABOUT</a></li>
                <li><a href="#skill" class="scrollTo" data-bigletter="S">SKILLS</a></li>
                <li><a href="#project" class="scrollTo" data-bigletter="P">PROJECTS</a></li>
                <li><a href="#contact" class="scrollTo" data-bigletter="C">CONTACT</a></li>
            </ul>

            <ul class="socialMedia">
                <li><a href="https://github.com/Illia16" aria-label="my github" title="My GitHub profile"><i class="fab fa-github" aria-hidden="true"></i></a></li>
                
                <li><a href="https://twitter.com/Illia__N" aria-label="my twitter" title="My Twitter profile"><i class="fab fa-twitter" aria-hidden="true"></i></a></li>
                
                <li><a href="https://www.linkedin.com/in/illia-nikitin-a4a637122/" aria-label="my linkedin" title="My LinkedIn profile"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a></li>

                <li><a href="https://medium.com/@illia2143" aria-label="my medium" title="My Medium profile"><i class="fab fa-medium-m" aria-hidden="true"></i></a></li>

                <li><a href="mailto:illia2143@gmail.com" aria-label="my email" title="Email me"><i class="fas fa-envelope" aria-hidden="true"></i></a></li>

                <li><a href="https://calendly.com/illianikitin/30-minutes-meeting" aria-label="schedule a meeting with me" title="Book a meeting with me"><i class="fas fa-calendar-day" aria-hidden="true"></i></a></li>
            </ul>
        </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['navOpen'],
  mounted() {
      console.log(this);
      console.log(this.$parent);
  },
  methods: {
    toggleNav() {
        this.$emit('clickNav', !this.toggleNav)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    nav {
        background: rgba(10, 10, 10, 0.95);
        @apply fixed inset-0 flex flex-col justify-between items-center p-20;

        &:focus,
        &:hover {
            transition: all 0.3s;
        }

        ul {
            [data-bigletter] {
                @apply relative;
            }

            a:hover::before,
            a:focus::before {
                opacity: 0.3;
            }

            [data-bigletter]:before {
                content: attr(data-bigletter);
                top: -40%;
                left: 0;
                right: 0;
                opacity: 0;
                width: 100%;
                transition: all .3s ease-in;
                @apply absolute font-bold text-5xl;
            }
            


            a {
                @apply m-2 py-1 px-3 text-center text-white;
            }
        }

        .socialMedia {
            @apply flex flex-wrap justify-center items-center;

            a:hover,
            a:focus {
                transform: scale(1.25);
                -webkit-transform: scale(1.25);
            }
        }
    }
</style>
