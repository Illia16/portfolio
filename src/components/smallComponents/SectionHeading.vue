<template>
  <div>
    <h2 v-if="!isSmall">
      <slot />
      <span>{{letter}}</span>
    </h2>
    <h4 v-if="isSmall">
      <slot />
      <span>{{letter}}</span>
    </h4>
  </div>
</template>

<script>
export default {
  name: 'SectionHeading',
  props: {
    letter: {},
    isSmall: {
      default: false,
      type: Boolean,
    }
  },
}
</script>

<style lang="scss" scoped>
h2 {
    @apply font-montserrat text-5xl text-center font-bold relative inline-block;

    span {
      @apply opacity-10 font-bold text-7xl absolute left-1/4 right-1/4 -top-3;
    }
}

h4 {
  @apply relative text-xs md:text-xl my-2 md:my-5 mx-auto font-bold inline-block text-center;

  span {
    @apply opacity-10 font-bold text-4xl absolute left-0 right-0 -top-3/4 md:-top-1/4 text-center;
  }
}
</style>