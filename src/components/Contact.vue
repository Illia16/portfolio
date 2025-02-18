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

    <!-- <h3 class="font-light">Get in touch with me</h3> -->

    <form v-if="!isFormSubmitted" @submit.prevent="submitForm" id="form" class="contactForm py-5">
      <div class="formInner">
          <div class="formEl">
              <label for="subject">SUBJECT</label>
              <input type="text" name="subject" id="subject" placeholder="Subject" v-model="subject">
              <span class="field-error">Please, fill out this field</span>
          </div>

          <div class="formEl">
              <label for="email">EMAIL</label>
              <input type="email" name="email" id="email" placeholder="Email" v-model="email">
              <span class="field-error">Please, fill out this field</span>
          </div>

          <div class="formEl">
              <label for="message">MESSAGE</label>
              <textarea name="message" id="message" rows="7" placeholder="Message" maxlength="700" v-model="message"></textarea>
              <span class="field-error">Please, fill out this field</span>
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

          <div v-if="formError" class="formEl error">
            <p class="field-error">{{ formError }}</p>
          </div>

          <div class="formEl">
            <button class="btn-main" :disabled="isLoading">SEND</button>
          </div>
      </div>
    </form>
    <div v-else class="form-submitted">
      <h2>Thanks!</h2>
      <button @click="resetForm" class="btn-main">Send another</button>
    </div>
  </section>
</template>

<script setup>
import DynamicHeading from './smallComponents/DynamicHeading.vue';
import Separator from './smallComponents/Separator.vue';
import { ref } from 'vue'


const API_URL = import.meta.env.VITE_API_URL;
const isLoading = ref(false);
const isFormSubmitted = ref(false);
// Form fields
const email = ref('');
const message = ref('');
const subject = ref('');
// Error field
const formError = ref('');
// Form file
const file = ref(null);
const isLargeFile = ref(false);
const largeFilename = ref('');
const largeFilenameSize = ref('');

const handleFile = (e) => {
    if (!e.target.files) return;
    file.value = e.target.files[0];

    if (file.value.size > 5242880) {
        isLargeFile.value = file.value.size > 5242880;
        largeFilename.value = file.value.name;
        largeFilenameSize.value = file.value.size;
    }
};

const handleFormErrors = () => {  
  document.querySelectorAll('.formEl').forEach(el => el.classList.remove('error'));
  const fields = {
    email: 'input[name="email"]',
    subject: 'input[name="subject"]',
    message: 'textarea'
  };

  let hasError = false;
  for (const [name, selector] of Object.entries(fields)) {
    const field = document.querySelector(`.formEl ${selector}`);
    if (!field?.value) {
      field?.parentElement.classList.add('error');
      hasError = true;
    }
  }

  return hasError;
}

const preparePayload = (fileAsUrl = false) => {
  if (handleFormErrors()) return;
  const payload = new FormData();
  
    payload.append('email', email.value);
    payload.append('subject', subject.value);
    payload.append('message', message.value);
    if (file.value && !isLargeFile.value) payload.append('file', file.value);
    if (isLargeFile.value) {
        payload.append('largeFilename', largeFilename.value);
        payload.append('largeFilenameSize', largeFilenameSize.value);
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
      isLoading.value = true;
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

      if (res.success) {
        isFormSubmitted.value = true;
      } else {
        formError.value = res.message;
      }

      isLoading.value = false;
    } catch (err) {
        isLoading.value = false;
        console.log('err', err);
    }
}

const resetForm = () => {
  isFormSubmitted.value = false;
  email.value = '';
  message.value = '';
  subject.value = '';
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
    @apply w-full my-3 text-center relative;

    &:not(.formEl--file) {
      input,
      textarea {
        @apply w-full py-1 px-3 border-none text-black;
        border-bottom: 1px solid #d9d9d9;
      }
    }

    &.formEl--file {
      @apply flex flex-col items-start;

      input {
        @apply w-full md:w-auto;
      }
    }

    .field-error {
        @apply hidden text-red-500 text-start text-xs absolute;
    }

    &.error {
        .field-error {
            @apply block;
        }
    }

    button {
      &:disabled {
        @apply opacity-50;
      }
    }
  }

  .formEl:nth-child(1),
  .formEl:nth-child(2) {
    @apply md:flex-1 md:basis-[calc(50%-40px)];
  }

  .form-submitted {
    @apply min-h-[25vh] w-full flex flex-col items-center justify-center space-y-8;

    h2 {
      @apply text-4xl font-bold;
    }
  }
</style>