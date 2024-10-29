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
          <a href="https://www.linkedin.com/in/illia-nikitin-a4a637122/" aria-label="my linkedin" title="My LinkedIn profile" class="linkedin">
            <i class="fab fa-linkedin-in text-linkedin" aria-hidden="true"></i>
          </a>
          <span>LinkedIn</span>
      </li>
    </ul>

    <h3 class="font-light">Get in touch with me</h3>

    <form @submit.prevent="submitForm" id="form" class="contactForm py-5">
      <div class="formInner">
          <div class="formEl">
              <label for="subject">SUBJECT</label>
              <input type="text" name="subject" id="subject" placeholder="Subject" v-model="subject">
          </div>

          <div class="formEl">
              <label for="email">EMAIL</label>
              <input type="email" name="email" id="email" placeholder="Email"  v-model="email">
          </div>

          <div class="formEl">
              <label for="message">MESSAGE</label>
              <textarea name="message" id="message" rows="7" placeholder="Message" maxlength="700" v-model="message"></textarea>
          </div>

          <div class="formEl formEl--file">
              <label htmlFor="attachment">
                  Choose file (Optional)
              </label>
              <input
                  @change="handleFile"
                  type="file"
                  name="attachment"
                  id="attachment"
              />
          </div>

          <div class="formEl">
              <ButtonLink :href="null">SEND</ButtonLink>
          </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import DynamicHeading from './smallComponents/DynamicHeading.vue';
import Separator from './smallComponents/Separator.vue';
import ButtonLink from './smallComponents/ButtonLink.vue';
import { ref,onMounted } from 'vue'


const API_URL = import.meta.env.VITE_API_URL;
// Form fields
const email = ref('');
const subject = ref('');
const message = ref('');
// Form file
const file = ref(null);
const isLargeFile = ref(false);
const largeFilename = ref('');

const handleFile = (e) => {
    if (!e.target.files) return;
    file.value = e.target.files[0];

    if (file.value.size > 5242880) {
        isLargeFile.value = file.value.size > 5242880;
        largeFilename.value = file.value.name;
    }
};

const preparePayload = (fileAsUrl = false) => {
    const payload = new FormData();    
    if (!email.value || !subject.value || !message.value) return;
  
    payload.append('email', email.value);
    payload.append('subject', subject.value);
    payload.append('message', message.value);
    if (file.value && !isLargeFile.value) payload.append('file', file.value);
    if (isLargeFile.value) {
        payload.append('largeFilename', largeFilename.value);
    }
    if (fileAsUrl) {
        payload.append('fileAsUrl', true);
    }
    return payload;
}

const uploadLargeFile = async (res) => {
    const presignedData = res.data;
    const formData = new FormData();
    Object.entries(presignedData.fields).forEach(([key, value]) => {
        formData.append(key, value);
    });
    formData.append('file', file.value);

    try {
        await fetch(presignedData.url, {
            method: 'POST',
            body: formData,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

const submitForm = async (e) => {
    e.preventDefault();
    const payload = preparePayload();
    if (!payload) return;
    
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            body: payload,
        }).then(res=> res.json());
        if (res.data) {
            // If there is data, handle large file upload
            await uploadLargeFile(res);
            const newPayload = preparePayload(true);

            // Send another POST request to send email with attachment as URL
            await fetch(API_URL, {
                method: 'POST',
                body: newPayload,
            });
        }
    } catch (err) {
        console.log('err', err);
    }
}
</script>

<style scoped>
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

    &:not(.formEl--file) {
      input,
      textarea {
        @apply w-full py-1 px-3 border-none text-black;
        border-bottom: 1px solid #d9d9d9;
      }
    }

    &.formEl--file {
      @apply flex flex-col items-start;
    } 
  }

  .formEl:nth-child(1),
  .formEl:nth-child(2) {
    flex: 1 0 calc(50% - 40px);
  }
</style>