<template>
  <div>
     <header class="wrapper">
        <div id="headerBottom" aria-label="Hello there!" class="headerBottom">
            <h1>Illia Nikitin</h1>
            <h2>A Front-End Web Developer</h2>
        </div>

        <div class="headerTop" id="headerTop">
            <div class="logoInitials">
                <img src="../../src/assets/logoWhite.png" alt="logo initials I.N.">
            </div>

            <button aria-label="open navigation menu" id="openNav" class="showNav" title="Navigation menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>

        <nav id="nav">
            <div class="logoInitials">
                <img src="../../src/assets/logoWhite.png" alt="logo initials I.N.">
            </div>

            <ul>
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
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// h3 {
//   margin: 40px 0 0;
// }
// ul {
//   list-style-type: none;
//   padding: 0;
// }
// li {
//   display: inline-block;
//   margin: 0 10px;
// }
// a {
//   color: #42b983;
// }
</style>
