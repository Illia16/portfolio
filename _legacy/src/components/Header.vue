<template>
  <div>
     <header class="wrapper">
         <div class="w-full flex justify-between headerTop" id="headerTop">
             <div class="logoInitials">
                 <img src="../../src/assets/logoWhite.png" alt="logo initials I.N." class="h-10">
             </div>
             
            <button @click="toggleNav" aria-label="open navigation menu" :class="[navOpen ? 'openedNav' : '', 'showNavBtn']" title="Navigation menu">
                <span class="top-0"></span>
                <span class="top-1/2"></span>
                <span class="bottom-0"></span>
            </button>
         </div>

        <div id="headerBottom" aria-label="Hello there!" class="text-center m-auto">
            <h1>Illia Nikitin</h1>
            <h2>A Front-End Web Developer</h2>
        </div>

        <transition name="fade">
            <nav id="nav" v-if="navOpen" class="z-20">
                <div class="w-3/12 md:w-1/12">
                    <img src="../../src/assets/logoWhite.png" alt="logo initials I.N.">
                </div>

                <ul class="flex flex-col md:flex-row justify-center items-center sections">
                    <li><a href="#" @click="toggleNav">HOME</a></li>
                    <li><a href="#about" @click="toggleNav">ABOUT</a></li>
                    <li><a href="#skills" @click="toggleNav">SKILLS</a></li>
                    <li><a href="#projects" @click="toggleNav">PROJECTS</a></li>
                    <li><a href="#contact" @click="toggleNav">CONTACT</a></li>
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
        </transition>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['navOpen'],
  methods: {
    toggleNav() {
        this.$emit('clickNav', !this.toggleNav)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    :focus,
    :hover {
        transition: all 0.3s;
    }

    .showNavBtn {
        @apply relative z-30;
        span {
            transition: all .1s;
            @apply left-0 right-0;
        }
        &:hover span:nth-child(1),
        &:focus span:nth-child(1){
            @apply top-1/4;
        }

        &:hover span:nth-child(3),
        &:focus span:nth-child(3){
            @apply top-3/4;
        }

        &.openedNav {
            &:hover span:nth-child(1),
            &:focus span:nth-child(1) {
                transform: rotate(45deg);
            }

            &:hover span:nth-child(3),
            &:focus span:nth-child(3) {
                transform: rotate(-45deg);
            }
            span:nth-child(1) {
                top: 18px;
                transform: rotate(135deg);
            }

            span:nth-child(2) {
                opacity: 0;
                top: -30px;
            }

            span:nth-child(3) {
                top: 18px;
                transform: rotate(-135deg);
            }
        }

    }

    nav {
        background: rgba(10, 10, 10, 0.95);
        @apply fixed inset-0 flex flex-col justify-between items-center p-20;

        ul {
            a {
                @apply inline-block relative my-2 mx-2 py-1 px-3 text-center text-white;
            }
            
            &.sections {
                a:hover::after,
                a:focus::after {
                    opacity: 0.3;
                }

                li:nth-child(1) a::after{ content: "H"};
                li:nth-child(2) a::after{ content: "A"};
                li:nth-child(3) a::after{ content: "S"};
                li:nth-child(4) a::after{ content: "P"};
                li:nth-child(5) a::after{ content: "C"};

                li a:after {
                    transition: all .3s ease-in;
                    @apply absolute font-bold text-5xl left-0 right-0 opacity-0 w-full -top-1/4;
                }
            }
        }

        .socialMedia {
            @apply flex flex-wrap justify-center items-center;

            a:hover,
            a:focus {
                transform: scale(1.5);
                -webkit-transform: scale(1.5);
            }
        }
    }
</style>
