<template>
  <div>
      <div class="border h-10 top-0 left-0 right-0"></div>
      <div class="border w-10 right-0 top-0 bottom-0"></div>
      <div class="border h-10 bottom-0 left-0 right-0 px-10 flex justify-center md:justify-end">
        <ToTop />
      </div>
      <div class="border w-10 left-0 top-0 bottom-0"></div>
  </div>
</template>

<script setup>
import ToTop from './ToTop.vue';
</script>

<style scoped>
    .border {
      @apply fixed bg-sandyBorder z-50;

      .socialMedia {
        @apply hidden md:flex items-center;

        li {
          @apply px-2 text-black;

          a {
            @apply inline-block;
            transition: all .3s;

            &:hover,
            &:focus {
                transform: scale(1.5);
                -webkit-transform: scale(1.5);
            }
          }
        }
      }

    }
</style>