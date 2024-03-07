<template>
  <div class="modal-wrapper">
    <Button class="open-map" @click="isModal = true">Open</Button>
    <Teleport to="#app">
      <div v-if="isModal" class="modal">
        <div class="map"></div>
        <button class="close-map" @click="isModal = false">Close</button>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import Button from '/mun/practice/gsap-practice/src/components/element/Button.vue';
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
  position: fixed;
  left: 0%;
  top: auto;
  right: 0%;
  bottom: 0%;
  margin-bottom: 40px;
  margin-left: 15%;
  .open-map {
    width: 50px;
    height: 50px;
  }
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
  .map {
    position: absolute;
    background-image: url(/assets/image/map.png);
    width: 80%;
    height: 80%;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .close-map {
    position: absolute;
  }
}
</style>