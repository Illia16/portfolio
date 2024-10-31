<template>
    <div class="toTopLink" v-if="showToTop">
      <a href="#" @click=scrollToTop>TO TOP</a>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const showToTop = ref(false);

const scrollToTop = (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleScroll = () => {
  showToTop.value = window.scrollY > 100;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>


<style scoped>
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