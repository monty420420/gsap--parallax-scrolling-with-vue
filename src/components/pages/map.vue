<template>
  <div class="modal-wrapper">
    <button @click="open = true">Open</button>
    <Teleport to="body">
      <div v-if="open" class="modal">
        <p>Modal 내용</p>
        <button @click="open = click">Close</button>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from "vue";
const open = ref(false);
</script>

<style scoped lang = "scss">
.modal-wrapper{
  z-index: 2;
}
.modal {
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  color: white;
  transform: translate(-50%, -50%);
  z-index: 2;
  background-image: url(/assets/image/map-background.jpg);
  background-position: 50% 50%;
  background-size: cover;
  -webkit-transform: scale3d(1none, 1none, 1none);
  transform: scale3d(1none, 1none, 1none);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
</style>