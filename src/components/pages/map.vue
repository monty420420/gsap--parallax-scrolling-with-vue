<template>
  <div class="modal-wrapper">
    <button @click="isModal = true">Open</button>
    <Teleport to="#app">
      <div v-if="isModal" class="modal">
        <p>Modal 내용</p>
        <button @click="isModal = false">Close</button>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
const isModal = ref(false);

onMounted(() => {
  watchEffect(() => {
    if (isModal.value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });
});
</script>

<style scoped lang = "scss">
.modal-wrapper {
  z-index: 2;
}
.modal {
  position: fixed;
  z-index: 3;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  background-image: url(/assets/image/map-background.jpg);
  background-position: 50% 50%;
  background-size: cover;
}
</style>