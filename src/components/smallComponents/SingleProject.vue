<template>
  <div class="singleProject">
    <BackgroundImage isSmall :bgImage="bgImage" />
    <div class="projectInfo">
      <DynamicHeading isSmall>{{projectName}}</DynamicHeading>
      <Separator />
      <slot name="description" />
      <slot name="links" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import BackgroundImage from '../smallComponents/BackgroundImage.vue';
import Separator from '../smallComponents/Separator.vue';
import DynamicHeading from '../smallComponents/DynamicHeading.vue';

const props = defineProps(['bgImage', 'projectName']);
</script>

<style>
  .singleProject {
    transition: all .3s;
    @apply relative h-[275px] overflow-hidden;
    /* border border-sandyBorder */
  }

  .singleProject:hover .projectInfo, 
  .singleProject:focus-within .projectInfo {
    @apply opacity-100;
  }

  .projectInfo {
    transition: all .3s ease-in;
    @apply md:absolute inset-0 z-10 md:opacity-0 bg-white text-center flex flex-col justify-center items-center;

    .projectLinks {
      @apply flex flex-wrap justify-center;
    }
  }
</style>