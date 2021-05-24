<template>
  <section class="flex flex-col items-center wrapper">
      <DynamicHeading :letter="'S'">Skills</DynamicHeading>
      <Separator />
      <h3 class="font-light">Always keen to learn more</h3>

      <ul class="allSkills">
        <li v-for="skill in skills.current" :key="skill.skillName" class="singleSkill">
            <!-- There's no Font Awesome icon for Firebase, had to use img -->
            <img v-if="skill.skillName === 'Firebase'" :class="skill.skillClass" src="../assets/logo_lockup_firebase_vertical.svg" alt="firebase logo">
            <i v-else :class="skill.skillClass" aria-hidden="true"></i>
            <DynamicHeading isSmall :letter="skill.skillName[0]">{{skill.skillName}}</DynamicHeading>
        </li>
      </ul>

      <BackgroundImage :bgSection="'skills'">
        <h3>Currently learning</h3>
        <ul class="allSkills">
          <li v-for="skill in skills.mastering" :key="skill.skillName" class="singleSkill">
          <i :class="skill.skillClass" aria-hidden="true"></i>
          <DynamicHeading isSmall :letter="skill.skillName[0]" :addClass="'white'">{{skill.skillName}}</DynamicHeading>
          </li>
        </ul>
      </BackgroundImage>
  </section>
</template>

<script>
import DynamicHeading from './smallComponents/DynamicHeading';
import Separator from './smallComponents/Separator';
import BackgroundImage from './smallComponents/BackgroundImage';

export default {
  name: 'Skills',
  components: { DynamicHeading, Separator, BackgroundImage },
  props: ['skills'],
}
</script>

<style lang="scss">
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

  .backgroundImg {
    
    ul {
      @apply md:justify-center;

        @media (min-width: 768px) {
          .singleSkill {
            flex-basis: 150px;
          }
        }
    }
  }

</style>