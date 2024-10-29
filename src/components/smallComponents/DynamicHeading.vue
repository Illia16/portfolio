<template>
  <div>
    <h2 v-if="!isSmall">
      <slot />
      <span>{{letter}}</span>
    </h2>
    <h4 v-if="isSmall" :class="addClass">
      <slot />
      <span>{{letter}}</span>
    </h4>
  </div>
</template>

<script>
export default {
  name: 'DynamicHeading',
  props: {
    letter: {
      default: '',
      type: String,
    },
    isSmall: {
      default: false,
      type: Boolean,
    },
    addClass: {
      default: '',
      type: String,
    }
  },
}
</script>

<style scoped>
h2 {
    @apply font-montserrat text-5xl text-center font-bold relative inline-block;

    span {
      @apply opacity-10 font-bold text-7xl absolute left-1/4 right-1/4 -top-3;
    }
}

h4 {
  @apply relative text-xs md:text-xs min-h-16 flex items-center font-bold text-center;

  span {
    @apply opacity-10 font-bold text-4xl leading-none absolute top-[calc(100%/2-36px/2)] left-[calc(100%/2-25px/2)];
  }
}

h4.white {
  @apply text-white font-bold;
  text-shadow: 2px 2px #0d0d02;

  span {
    opacity: 0.4;
  }
}
</style>