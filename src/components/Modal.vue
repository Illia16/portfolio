<template>
    <div id="modal">
        <button class="modal-close-btn" @click="closeModal">
            <span class="sr-only">Close modal</span>
        </button>
        <div class="modal-shadow"></div>
        <div ref="modalRef" class="modal-content">
            <slot />
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted, onBeforeUnmount, defineEmits } from 'vue'
import { useMainStore } from '@/stores/main'

const store = useMainStore()
const emit = defineEmits(["closeCallback"])
const modalRef = ref(null);

const closeModal = () => {
    store.setModalOpen(false)
    store.setModalType('')
    emit("closeCallback")
}

onMounted(() => {    
    document.body.classList.add('lock-scroll')
    document.addEventListener('mousedown', clickOutside);
})

onBeforeUnmount(() => {
    document.body.classList.remove('lock-scroll')
    document.removeEventListener('mousedown', clickOutside);
})

const clickOutside = (e) => {    
    if (!modalRef.value.contains(e.target)) store.setModalOpen(false)
}
</script>

<style scoped>
    .modal-close-btn {
        @apply fixed top-[calc(10%-1rem+1px)] right-[calc(10%-1rem+1px)] z-20 w-8 h-8 bg-[#fffaf6] border-solid border-2 border-black;

        &:before {
            content: "X";
            @apply text-black text-xl;
        }
    }
    .modal-shadow {
        @apply fixed bg-slate-300 opacity-75 inset-0 z-[5];
    }
    .modal-content {
        @apply fixed z-10 bg-[#fffaf6] border-solid border-2 border-black top-[10%] p-3 overflow-y-scroll max-h-[80vh] w-[80%] right-[10%];
    }

    .lock-scroll {
        @apply overflow-hidden;
    }
</style>

