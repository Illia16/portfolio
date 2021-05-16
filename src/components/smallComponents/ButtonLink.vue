<template>
    <div>
      <a :href="href" target="_blank" class="relative px-7 py-2 leading-4 z-10 bg-none"><slot /></a>
    </div>
</template>

<script>
export default {
  name: 'ButtonLink',
  props: ['href'],

}
</script>

<style lang="scss" scoped>

a {
  border: 1px solid rgba(0,0,0,0.2);
  transition: all .3s ease-in;
  display: inline-block;
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