<template>
  <div>
    <Button class="open-map" @click="isModal = true">
      <img ref="firstImage" src="/assets/image/scull.png" alt="" />
      <img ref="secondImage" src="/assets/image/scull.png" alt="" />
    </Button>
    <Teleport to="#app">
      <div v-if="isModal" class="modal">
        <img class="modal-background" src="/assets/image/map.png" alt="" />
        <Button class="close-map" @click="isModal = false">
          <img ref="firstImage" src="/assets/image/close.png" alt="" />
          <img ref="secondImage" src="/assets/image/close.png" alt="" />
        </Button>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import Button from "/mun/practice/gsap-practice/src/components/element/Button.vue";
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
.open-map {
  position: fixed;
  left: 0%;
  top: auto;
  right: 0%;
  bottom: 3%;
  margin-bottom: 40px;
  margin-left: 15%;
  img {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.modal {
  z-index: 3;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  background-image: url(/assets/image/map-background.jpg);
  background-position: 50% 50%;
  background-size: cover;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .close-map {
    position: absolute;
    top: 12%;
    right: 10%;
    img {
      width: 16px;
      height: 16px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>