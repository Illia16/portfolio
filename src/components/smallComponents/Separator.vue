<template>
    <div class="my-3 h-3">
      <div class="dot"></div>
    </div>
</template>

<script>
export default {
  name: 'Separator',
}
</script>

<style scoped>
.dot {
  @apply relative w-1 h-1 my-0 mx-auto rounded-sm bg-black;

  &::before,
  &::after {
    content: "";
    height: 1px;
    top: 1.5px;
    @apply absolute inline-block w-8 bg-black right-3;
  }

  &::after {
    @apply left-3;
  }
}
</style>