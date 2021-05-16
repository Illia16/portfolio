<template>
  <section class="flex flex-col items-center wrapper">
    <div>
      <h2>About</h2>
      <Separator />
    </div>

    <div class="flex flex-wrap">
      <div class="flex-auto m-7">
        <img src="../assets/myPhoto.jpg" alt="my photo" class="myPhoto">
      </div>
      <div class="flex-auto max-w-lg">
        <p>I am a <strong class="text-blue">Front-End Web Developer</strong> experienced in building accessible, 
          responsive websites with reusable code using HTML, CSS, JavaScript and its frameworks such as React. 
          With 3 years of prior experience in engineering, 
          I bring strong understanding of JavaScript concepts and problem-solving skills 
          focused on a team desired outcome. 
          I am a solid relationship builder and an imaginative, out-of-the-box 
          hinker who is eager to put these talents for my job in the web industry.
        </p>
        <p class="pt-4">
          Outside of web development, I love spending time outdoors, travelling, reading books and gaming.
        </p>
      </div>
    </div>

    <div class="text-center">
      <a href="#">RESUME</a>
    </div>
  </section>
</template>

<script>
import Separator from './smallComponents/Separator';

export default {
  name: 'About',
  components: { Separator },
}
</script>

<style lang="scss" scoped>
  h2 {
    &::after {
      content: 'A';
    }
  }

  .myPhoto {
    max-width: 200px;
    border-radius: 50%;
  }
</style>