<template>
  <section id="projects" class="flex flex-col items-center wrapper">
    <DynamicHeading :letter="'P'">Projects</DynamicHeading>
    <Separator />
    <div class="sortButtons">
      <button @click="toggleProjects('featured')" :class="{ initBtn: !actionsMade }">Featured</button>
      <button @click="toggleProjects('js')">JavaScript/jQuery</button>
      <button @click="toggleProjects('react')">React</button>
      <button @click="toggleProjects('html')">HTML/CSS</button>
      <button @click="toggleProjects('all')">All</button>
    </div>

    <transition-group name="fade" tag="div" :class="'projectList'">
      <template v-for="project in projects">
        <SingleProject v-if="project.category.includes(activeProjects)" :bgImage="project.bgImage" :projectName="project.name" :key="project.key">
            <template #description>
              <p>{{project.info}}</p>
            </template>

            <template #links>
              <div class="projectLinks">
                <ButtonLink :href="project.liveLink">VIEW LIVE</ButtonLink>
                <ButtonLink :href="project.codeLink">VIEW CODE</ButtonLink>
              </div>
            </template>
        </SingleProject>
      </template>
    </transition-group>
    
    <BackgroundImage :bgSection="'projects'">
      <p>There are no secrets to success. It is the result of preparation, hard work, and learning from failure.</p>
    </BackgroundImage>
  </section>
</template>

<script>
import DynamicHeading from './smallComponents/DynamicHeading.vue';
import Separator from './smallComponents/Separator.vue';
import BackgroundImage from './smallComponents/BackgroundImage.vue';
import SingleProject from './smallComponents/SingleProject.vue';
import ButtonLink from './smallComponents/ButtonLink.vue';

export default {
  name: 'Projects',
  props: ['activeProjects', 'actionsMade', 'projects'],
  components: { DynamicHeading, Separator, BackgroundImage, SingleProject, ButtonLink },
  methods: {
    toggleProjects(val) {
        this.$emit('setActiveProjects', val)
    },
  }
}
</script>

<style scoped>
  .sortButtons {
    @apply flex flex-wrap justify-center;

    button {
      @apply border-none m-1 py-1 px-3;

      &.initBtn::after {
        width: 100%;
      }

      &:hover,
      &:focus {
        &:after {
          width: 100%;
        }
      }

      &::after {
        content: "";
        height: 1px;
        margin: 3px auto;
        transition: width .3s ease-in-out;
        @apply block bg-black w-0;
      }
    }
  }

  .projectList {
    @apply flex flex-wrap my-5 gap-5;

    .singleProject {
      @apply flex-grow;

      @media (min-width: 768px) {
        flex: 0 0 calc(50% - 20px);
      }
    }
  }
</style>