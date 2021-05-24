<template>
  <section id="projects" class="flex flex-col items-center wrapper">
    <DynamicHeading :letter="'P'">Projects</DynamicHeading>
    <Separator />
    <div class="sortButtons">
      <!-- <button @click.once="removeLine">Remove</button> -->
      <button @click="toggleProjects('featured')" :class="{ initBtn: !actionsMade }">Featured</button>
      <button @click="toggleProjects('js')">JavaScript/jQuery</button>
      <button @click="toggleProjects('react')">React</button>
      <button @click="toggleProjects('html')">HTML/CSS</button>
      <button @click="toggleProjects('all')">All</button>
    </div>
    
    <div class="projectList flex flex-wrap my-5 gap-5">
      <SingleProject v-if="activeProjects==='featured' || activeProjects==='react' || activeProjects==='all'" :bgImage="'exploreSpace.png'" :projectName="'Explore Space'">
          <template #description>
            <p>The team project built on jQuery is now rebuilt on React. With NASA API, 
            this app lets user find media of the selected date, Mars photos taken by a rover and other space data.
            </p>
          </template>

          <template #links>
            <div class="projectLinks">
              <ButtonLink :href="'https://illia16.github.io/spaceApp/'">VIEW LIVE</ButtonLink>
              <ButtonLink :href="'https://github.com/Illia16/spaceApp'">VIEW CODE</ButtonLink>
            </div>
          </template>
      </SingleProject>

      <SingleProject v-if="activeProjects==='featured' || activeProjects==='react' || activeProjects==='all'" :bgImage="'toDoApp.png'" :projectName="'To Do App'">
          <template #description>
            <p>A multilanguage app that allows user to log in via Google-Authentication or continue as anonymous. 
              The user can add/remove items in the list stored in the database.
            </p>
          </template>

          <template #links>
            <div class="projectLinks">
              <ButtonLink :href="'https://illia16.github.io/toDoApp/'">VIEW LIVE</ButtonLink>
              <ButtonLink :href="'https://github.com/Illia16/toDoApp'">VIEW CODE</ButtonLink>
            </div>
          </template>
      </SingleProject>

      <SingleProject v-if="activeProjects==='react' || activeProjects==='all'" :bgImage="'starWarsExplorer.jpg'" :projectName="'Star Wars Explorer'">
        <template #description>
          <p>See the information about Star Wars characters, planets, movies. 
            Built with React, Redux, Material UI as a styling framework.
          </p>
        </template>

        <template #links>
          <div class="projectLinks">
            <ButtonLink :href="'https://illia16.github.io/star-wars-explorer/'">VIEW LIVE</ButtonLink>
            <ButtonLink :href="'https://github.com/Illia16/star-wars-explorer'">VIEW CODE</ButtonLink>
          </div>
        </template>
      </SingleProject>

      <SingleProject v-if="activeProjects==='js' || activeProjects==='all'" :bgImage="'findMovie.png'" :projectName="'Find a movie'">
        <template #description>
          <p>Find a movie based on genre(s) and/or release year from The Movie Database API. 
            With Firebase database, save the movies that you have watched.
          </p>
        </template>

        <template #links>
          <div class="projectLinks">
            <ButtonLink :href="'https://illia16.github.io/find-a-movie/'">VIEW LIVE</ButtonLink>
            <ButtonLink :href="'https://github.com/Illia16/find-a-movie'">VIEW CODE</ButtonLink>
          </div>
        </template>
      </SingleProject>

      <SingleProject v-if="activeProjects==='js' || activeProjects==='all'" :bgImage="'mealGenerator.png'" :projectName="'Meal Generator'">
        <template #description>
          <p>Cook meals, add your own ingridients and meals with any ingridients specified.</p>
        </template>

        <template #links>
          <div class="projectLinks">
            <ButtonLink :href="'https://illia16.github.io/MealGenerator/'">VIEW LIVE</ButtonLink>
            <ButtonLink :href="'https://github.com/Illia16/MealGenerator'">VIEW CODE</ButtonLink>
          </div>
        </template>
      </SingleProject>

      <SingleProject v-if="activeProjects==='html' || activeProjects==='all'" :bgImage="'boatPSD.png'" :projectName="'Boat Ride Adventures'">
        <template #description>
          <p>A multipage website PDS conversion.</p>
        </template>

        <template #links>
          <div class="projectLinks">
            <ButtonLink :href="'https://illia16.github.io/BoatRideAdventuresPSD/'">VIEW LIVE</ButtonLink>
            <ButtonLink :href="'https://github.com/Illia16/BoatRideAdventuresPSD'">VIEW CODE</ButtonLink>
          </div>
        </template>
      </SingleProject>

      <SingleProject v-if="activeProjects==='html' || activeProjects==='all'" :bgImage="'bagsPSD.png'" :projectName="'Galass Handbags'">
        <template #description>
          <p>A single page PDS conversion using only floats.</p>
        </template>

        <template #links>
          <div class="projectLinks">
            <ButtonLink :href="'https://illia16.github.io/galass-handbags-PSD/'">VIEW LIVE</ButtonLink>
            <ButtonLink :href="'https://github.com/Illia16/galass-handbags-PSD'">VIEW CODE</ButtonLink>
          </div>
        </template>
      </SingleProject>
    </div>
    
    <BackgroundImage :bgSection="'projects'">
      <p>There are no secrets to success. It is the result of preparation, hard work, and learning from failure.</p>
    </BackgroundImage>
  </section>
</template>

<script>
import DynamicHeading from './smallComponents/DynamicHeading';
import Separator from './smallComponents/Separator';
import BackgroundImage from './smallComponents/BackgroundImage';
import SingleProject from './smallComponents/SingleProject';
import ButtonLink from './smallComponents/ButtonLink';

export default {
  name: 'Projects',
  props: ['activeProjects', 'actionsMade'],
  components: { DynamicHeading, Separator, BackgroundImage, SingleProject, ButtonLink },
  mounted() {
    // console.log(this.actionsMade);
  },
  methods: {
    toggleProjects(val) {
        this.$emit('setActiveProjects', val)
    },
  }
}
</script>

<style lang="scss" scoped>
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
    .singleProject {
      @apply flex-grow;

      @media (min-width: '768px') {
        flex: 0 0 calc(50% - 20px);
      }
    }
  }
</style>