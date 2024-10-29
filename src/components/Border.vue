<template>
  <div>
      <div class="border h-10 top-0 left-0 right-0"></div>
      <div class="border w-10 right-0 top-0 bottom-0"></div>
      <div class="border h-10 bottom-0 left-0 right-0 px-10 flex justify-center md:justify-end">
          <div class="toTopLink">
            <a href="#">TO TOP</a>
          </div>
      </div>
      <div class="border w-10 left-0 top-0 bottom-0"></div>
  </div>
</template>

<script>
export default {
  name: 'Border',
}
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

    .toTopLink {
      @apply inline-block border-none m-1 text-center py-1 px-3;

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
</style>