<template>
  <div class="imgContainer">
    <div v-if="!isSmall" :class="['w-full backgroundImg bg-'+bgSection]">
      <slot />
    </div>

    <div v-if="isSmall">
      <img :src="imgUrl(bgImage)" :alt="[trimFormat(bgImage) + ' ' + 'project logo']">
    </div>
  </div>
</template>

<script>

export default {
  name: 'BackgroundImage',
  props: {
    bgSection: {
      default: '',
      type: String,
    },
    bgImage: {
      default: '',
      type: String,
    },
    isSmall: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    imgUrl(img) {
      return require('../../assets/'+img)
    },
    trimFormat(alt) {
      return alt.substring(0, alt.length-4);
    }
  }
}
</script>

<style lang="scss">
  .bg-skills,
  .bg-projects {
    min-height: 50vh;
  }

  .imgContainer {
    width: 100%;
  }

  .backgroundImg {
    @apply bg-no-repeat bg-cover bg-fixed bg-center m-auto flex flex-col justify-center;
    h3, p {
      text-shadow: 2px 2px #0d0d0d;
      max-width: 70%;
      margin: 0 auto;
      @apply text-white md:text-3xl text-center font-bold my-6;
    }
  }
</style>