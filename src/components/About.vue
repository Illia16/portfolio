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
        <p>I am a skilled <strong class="text-blue">Full-Stack Developer</strong> with expertise in building scalable, responsive, and accessible web applications, and integrating AI solutions. Proficient in front-end technologies like HTML, CSS, JavaScript, and frameworks such as React, Vue, and Svelte, I create user-centric, reusable code that supports modern standards. My back-end experience includes extensive use of AWS services for deploying robust solutions, along with AI tools such as ChatGPT and OpenAI APIs to enhance automation, data insights, and user experience. With an engineering background and over three years in tech, I bring strong problem-solving skills, creative thinking, and a collaborative, goal-oriented approach to every project.
        </p>
        <p class="pt-4">
          Beyond coding, I enjoy outdoor activities, traveling, reading, and gaming.
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