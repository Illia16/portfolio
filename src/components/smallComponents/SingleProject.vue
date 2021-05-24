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

<script>

import BackgroundImage from '../smallComponents/BackgroundImage';
import Separator from '../smallComponents/Separator';
import DynamicHeading from '../smallComponents/DynamicHeading';


export default {
  name: 'SingleProject',
  props: ['bgImage' , 'projectName'],
  components: { BackgroundImage, Separator, DynamicHeading },
}
</script>

<style lang="scss">
  .singleProject {
    transition: all .3s;
    @apply relative;
  }

  .singleProject:hover .projectInfo, 
  .singleProject:focus-within .projectInfo {
    @apply opacity-100;
  }

  .projectInfo {
    transition: all .3s ease-in;
    @apply md:absolute inset-0 z-20 md:opacity-0 bg-white text-center flex flex-col justify-center items-center;

    .projectLinks {
      @apply flex flex-wrap justify-center;
    }
  }
</style>