<template>
  <section id="skills" class="flex flex-col items-center wrapper">
      <DynamicHeading :letter="'S'">Skills</DynamicHeading>
      <Separator />
      <!-- <h3 class="font-light">Always keen to learn more</h3> -->

      <ul class="allSkills">
        <li v-for="skill in skills.current" :key="skill.skillName" class="singleSkill">
            <button v-if="skill.subSkills" class="skillWithSubSkills" @click="store.setModalOpen(true); store.setModalType('skills'); activeModalSkills = skill.subSkills">
              <img :class="skill.skillClass" :src="skill.src" :alt="skill.alt">
            </button>
            <img v-else-if="skill.src" :class="skill.skillClass" :src="skill.src" :alt="skill.alt">
            <i v-else :class="skill.skillClass" aria-hidden="true"></i>
            <DynamicHeading isSmall :letter="skill.skillName[0]">{{skill.skillName}}</DynamicHeading>
        </li>
      </ul>

      <BackgroundImage :bgSection="'skills'">
        <h3>Always learning</h3>
        <ul class="allSkills">
          <li v-for="skill in skills.mastering" :key="skill.skillName" class="singleSkill">
            <img v-if="skill.src" :class="skill.skillClass" :src="skill.src" :alt="skill.alt">
            <!-- <i :class="skill.skillClass" aria-hidden="true"></i> -->
            <DynamicHeading isSmall :letter="skill.skillName[0]" :addClass="'white'">{{skill.skillName}}</DynamicHeading>
          </li>
        </ul>
      </BackgroundImage>

      <teleport to="body">
          <Modal v-if="store.modalOpen && store.modalType === 'skills'">
            <ul class="allSkills">
              <li v-for="subSkill in activeModalSkills" :key="subSkill.skillName" class="singleSkill">
                  <img :class="subSkill.skillClass" :src="subSkill.src" :alt="subSkill.alt">
                  <DynamicHeading isSmall :letter="subSkill.skillName[0]">{{subSkill.skillName}}</DynamicHeading>
              </li>
            </ul>
          </Modal>
      </teleport>
  </section>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useMainStore } from '@/stores/main';

import Modal from './Modal.vue';
import DynamicHeading from './smallComponents/DynamicHeading.vue';
import Separator from './smallComponents/Separator.vue';
import BackgroundImage from './smallComponents/BackgroundImage.vue';

const props = defineProps(['skills']);
const store = useMainStore();
const activeModalSkills = ref(null);

</script>

<style>
  .allSkills {
    @apply flex flex-wrap justify-evenly md:justify-around md:my-5;

    .singleSkill img,
    .singleSkill .skillWithSubSkills img {
      @apply h-10 md:h-12;
    }

    .singleSkill {
        flex-basis: 33%;
        @apply flex flex-col items-center m-3;
      i {
        @apply block text-4xl md:text-5xl;
      }

      .skillWithSubSkills {
        @apply relative;

        &:before {
          @apply content-[''] absolute w-[calc(100%+10px)] h-[calc(100%+10px)] left-[-5px] top-[-5px] border-2 border-sandyBorder transition-all;
        }

        &:hover,
        &:focus {
          &:before {
            @apply border-black;
          }
        }
      }
    }

    @media (min-width: 768px) {
      .singleSkill {
        flex-basis: 150px;
      }
    }

    @media (min-width: 1280px) {
      .singleSkill {
        flex-basis: 100px;
      }
    }
  }

  .backgroundImg {
    
    ul {
      @apply md:justify-center;

        @media (min-width: 768px) {
          .singleSkill {
            flex-basis: 150px;
          }
        }
    }
  }

</style>