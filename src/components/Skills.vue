<template>
  <section class="flex flex-col items-center wrapper">
      <SectionHeading :letter="'S'">Skills</SectionHeading>
      <Separator />
      <h3 class="font-light">Always keen to learn more</h3>

      <ul class="allSkills">
        <li v-for="skill in skills" :key="skill.skillName" class="singleSkill">
            <img v-if="skill.skillName === 'Firebase'" :class="skill.skillClass" src="../assets/logo_lockup_firebase_vertical.svg" alt="firebase logo">
            <i v-else :class="skill.skillClass" aria-hidden="true"></i>
            <SectionHeading isSmall :letter="skill.skillName[0]">{{skill.skillName}}</SectionHeading>
        </li>
      </ul>

      <div class="allSkills">
        <div class="singleSkill">
            <i class="fab fa-js text-skills-js" aria-hidden="true"></i>
            <SectionHeading isSmall :letter="'J'">JavaScript</SectionHeading>
        </div>

        <div class="singleSkill">
            <i class="devicon-jquery-plain text-skills-jquery" aria-hidden="true"></i>
            <SectionHeading isSmall :letter="'J'">JQuery</SectionHeading>
        </div>

        <div class="singleSkill">
            <i class="fab fa-react text-skills-react" aria-hidden="true"></i>
            <SectionHeading isSmall :letter="'R'">React</SectionHeading>
        </div>

        <div class="singleSkill">
            <i class="devicon-git-plain text-skills-git" aria-hidden="true"></i>
            <SectionHeading isSmall :letter="'G'">Git/Github</SectionHeading>
        </div>

        <div class="singleSkill">
            <i class="fab fa-html5 text-skills-html" aria-hidden="true"></i>
            <SectionHeading isSmall :letter="'H'">HTML5</SectionHeading>
        </div> 

        <div class="singleSkill">
            <i class="fab fa-css3-alt text-skills-css" aria-hidden="true"></i>
            <SectionHeading isSmall :letter="'C'">CSS3</SectionHeading>
        </div>

        <div class="singleSkill">
            <i class="fab fa-sass text-skills-sass" aria-hidden="true"></i>
            <SectionHeading isSmall :letter="'S'">SASS</SectionHeading>
        </div>

        <div class="singleSkill">
            <img class='h-10 md:h-24' src="../assets/logo_lockup_firebase_vertical.svg" alt="firebase logo">
            <SectionHeading isSmall :letter="'F'">Firebase</SectionHeading>
        </div>

        <div class="singleSkill">
            <i class="fas fa-mobile-alt text-skills-respDesign" aria-hidden="true"></i>
            <SectionHeading isSmall :letter="'R'">Responsive design</SectionHeading>
        </div>

        <div class="singleSkill">
            <i class="fas fa-universal-access text-skills-a11y" aria-hidden="true"></i>
            <SectionHeading isSmall :letter="'A'">Accessibility</SectionHeading>
        </div>

        <div class="singleSkill">
            <i class="far fa-handshake text-skills-pairedProgramming" aria-hidden="true"></i>
            <SectionHeading isSmall :letter="'P'">Paired programming</SectionHeading>
        </div>

        <div class="singleSkill">
            <i class="fab fa-vuejs text-skills-vuejs" aria-hidden="true"></i>
            <SectionHeading isSmall :letter="'V'">Vue.js</SectionHeading>
        </div>
      </div>
  </section>
</template>

<script>
import SectionHeading from './smallComponents/SectionHeading';
import Separator from './smallComponents/Separator';

export default {
  name: 'Skills',
  components: { SectionHeading, Separator },
  props: ['skills'],
  mounted() {
      console.log(this.$props);
  },
}
</script>

<style lang="scss" scoped>
.allSkills {
  @apply flex flex-wrap justify-evenly md:justify-around md:my-5;

  .singleSkill {
      flex-basis: 33%;
      @apply inline-block flex flex-col items-center m-3;
    i {
      @apply block text-4xl md:text-8xl;
    }
  }

  @media (min-width: 768px) {
    .singleSkill {
      flex-basis: 150px;
    }
  }

  @media (min-width: 1280px) {
    .singleSkill {
      flex-basis: 250px;
    }
  }
}
</style>