<template>
  <section id="contact" class="flex flex-col items-center wrapper">
    <DynamicHeading :letter="'C'">Contact</DynamicHeading>
    <Separator />
    <ul class="socialMedia" id="bottomSocialMedia">
      <li>
          <a href="https://github.com/Illia16" aria-label="my github" title="My GitHub profile" class="github">
            <i class="fab fa-github" aria-hidden="true"></i>
          </a>
          <span>GitHub</span>
      </li>
      
      <li>
          <a href="https://twitter.com/Illia__N" aria-label="my twitter" title="My Twitter profile" class="twitter">
            <i class="fab fa-twitter text-twitter" aria-hidden="true"></i>
          </a>
          <span>Twitter</span>
      </li>
      
      <li>
          <a href="https://www.linkedin.com/in/illia-nikitin-a4a637122/" aria-label="my linkedin" title="My LinkedIn profile" class="linkedin">
            <i class="fab fa-linkedin-in text-linkedin" aria-hidden="true"></i>
          </a>
          <span>LinkedIn</span>
      </li>

      <li>
          <a href="https://calendly.com/illianikitin/30-minutes-meeting" aria-label="schedule a meeting with me" title="Book a meeting with me" class="calendly">
            <i class="fas fa-calendar-day text-calendly" aria-hidden="true"></i>
          </a>
          <span>Calendly</span>
      </li>
    </ul>

    <h3 class="font-light">Get in touch with me</h3>

    <form @submit.prevent="sendEmail" id="form" class="contactForm py-5">
      <div class="formInner">
          <div class="formEl">
              <label for="name">NAME</label>
              <input type="text" name="name" id="name" placeholder="Name" required>
          </div>

          <div class="formEl">
              <label for="email">EMAIL</label>
              <input type="email" name="email" id="email" placeholder="Email" required>
          </div>

          <div class="formEl">
              <label for="message">MESSAGE</label>
              <textarea name="message" id="message" rows="7" placeholder="Message" maxlength="700" required></textarea>
          </div>

          <div class="formEl">
              <ButtonLink :href="null">SEND</ButtonLink>
          </div>
      </div>
    </form>
  </section>
</template>

<script>
import DynamicHeading from './smallComponents/DynamicHeading';
import Separator from './smallComponents/Separator';

import ButtonLink from './smallComponents/ButtonLink';
import emailjs from 'emailjs-com';

export default {
  name: 'Contact',
  components: { DynamicHeading, Separator, ButtonLink },
  methods: {
    sendEmail: function(e) {
      emailjs.sendForm(
        process.env.VUE_APP_FORM_SERVICE_ID, 
        process.env.VUE_APP_FORM_TEMPLATE_ID, 
        e.target,
        process.env.VUE_APP_FORM_USER_ID,
      )
      .then( (res) => {
        console.log('SENT!', res);
      }).catch( (er) => {
        console.log('ERROR!', er);
      })
    }
  },

}
</script>

<style lang="scss" scoped>
  .socialMedia {
    :focus,
    :hover {
        transition: all 0.3s;
    }

    @apply flex flex-wrap justify-center gap-5 my-10 text-center;

    li {
      @apply flex flex-col;
      
      a {
        @apply text-black opacity-100 text-4xl;

        :hover,
        :focus {
          transform: scale(1.25);
          -webkit-transform: scale(1.25);
        }
      }
    }
  }

  .formInner {
    max-width: 550px;
    @apply flex flex-wrap items-center my-0 mx-auto;
  }

  .formEl {
    @apply w-full m-3 text-center relative;

    input,
    textarea {
      @apply w-full py-1 px-3 border-none text-black;
      border-bottom: 1px solid #d9d9d9;
    }
  }

  .formEl:nth-child(1),
  .formEl:nth-child(2) {
    flex: 1 0 calc(50% - 40px);
  }
</style>