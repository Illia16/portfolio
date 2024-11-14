import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const modalType = ref('');
  const modalOpen = ref(false);

  const setModalType = (v) => {
      modalType.value = v;
  }
  const setModalOpen = (v) => {
      modalOpen.value = v;
  }

  return { modalOpen, modalType, setModalOpen, setModalType }
})
