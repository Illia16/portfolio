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
  </section>
</template>

<script>
import SectionHeading from './smallComponents/SectionHeading';
import Separator from './smallComponents/Separator';

export default {
  name: 'Skills',
  components: { SectionHeading, Separator },
  props: ['skills'],
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