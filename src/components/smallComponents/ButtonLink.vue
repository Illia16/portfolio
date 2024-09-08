<template>
    <div>
      <a v-if="href" :href="href" target="_blank"><slot /></a>
      <button v-if="!href"><slot /></button>
    </div>
</template>

<script>
export default {
  name: 'ButtonLink',
  props: ['href'],

}
</script>

<style scoped>

a, button {
  @apply relative inline-block m-3 px-7 py-2 leading-4 z-10 bg-none;
  border: 1px solid rgba(0,0,0,0.2);
  transition: all .3s ease-in;
  text-decoration: none;

  &::after {
    content: "";
    @apply w-full absolute bottom-0 right-0 bg-black h-0;
    transition: height .2s ease;
    z-index: -1;
  }

  &:hover,
  &:focus {
    border: 1px solid transparent;
    color: white;

    &::after {
      height: 100%;
    }
  }
}

</style>