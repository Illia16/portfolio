<template>
  <section id="about" class="flex flex-col items-center wrapper">
    <div>
      <DynamicHeading :letter="'A'">About</DynamicHeading>
      <Separator />
    </div>

    <div class="flex flex-wrap">
      <div class="flex-auto m-7">
        <img src="../assets/myPhoto.jpg" alt="my photo" class="m-auto myPhoto">
      </div>

      <div class="m-auto myStory">
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

    <ButtonLink href="/resume_Illia_Nikitin.pdf">RESUME</ButtonLink>
  </section>
</template>

<script>
import Separator from './smallComponents/Separator.vue';
import ButtonLink from './smallComponents/ButtonLink.vue';
import DynamicHeading from './smallComponents/DynamicHeading.vue';

export default {
  name: 'About',
  components: { Separator, ButtonLink, DynamicHeading },
}
</script>

<style scoped>
  .myPhoto {
    max-width: 250px;
    border-radius: 50%;
  }

  .myStory {
    flex: 1 1 70%;
    padding: 2.5rem;
  }
</style>