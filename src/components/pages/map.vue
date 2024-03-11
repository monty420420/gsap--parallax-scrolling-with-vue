<template>
  <div>
    <div class="open-wrap">
      <Button
        class="open-map"
        @click="isModal = true"
        @mouseenter="hover(true)"
        @mouseleave="hover(false)"
      >
        <img ref="firstImage" src="/assets/image/scull.png" alt="" />
        <img ref="secondImage" src="/assets/image/scull.png" alt="" />
      </Button>
    </div>
    <Teleport to="#app">
      <div v-if="isModal" class="modal">
        <img class="modal-background" src="/assets/image/map.png" alt="" />
        <div class="first-dot red-dot"></div>
        <div class="second-dot red-dot"></div>
        <div class="final-dot red-dot"></div>
        <Button class="close-map" @click="isModal = false">
          <img ref="firstImage" src="/assets/image/close.png" alt="" />
          <img ref="secondImage" src="/assets/image/close.png" alt="" />
        </Button>
      </div>
    </Teleport>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import Button from "/mun/practice/gsap-practice/src/components/element/Button.vue";
import gsap from "gsap";

export default {
  components: {
    Button,
  },
  setup() {
    const isModal = ref(false);
    const isHover = ref(false);

    onMounted(() => {
      watch(isModal, (value) => {
        if (value) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      });
    });

    const hover = (value) => {
      isHover.value = value;
      if (value) {
        gsap.to(".open-map img", { duration: 0.1, y: "-120%" });
      } else {
        gsap.to(".open-map img", { duration: 0.1, y: "0%" });
      }
    };

    return {
      isModal,
      hover,
    };
  },
};
</script>
<style scoped lang="scss">
.open-wrap {
  position: fixed;
  left: 0%;
  top: auto;
  right: 0%;
  bottom: 3%;
  margin-bottom: 40px;
  margin-left: 15%;
  width: 36px;
  height: 36px;
  border: 1px solid black;
  border-radius: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  .open-map {
    width: 28px;
    height: 28px;
    overflow: hidden;
    img {
      padding-top: 5px;
      width: 16px;
      height: 16px;
      transition: transform 0.5s ease-in-out;
    }
    img:nth-child(2){
      padding-top: 2px;
    }
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
  .modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .red-dot{
    width: 15px;
    height: 15px;
    border-radius: 100px;
    background: #6c0e11;
    position: fixed;
  }
  .first-dot{
    top: 48%;
    left: 48%;
  }
  .second-dot{
    top: 20%;
    left: 20%;
  }
  .final-dot{
    top: 22%;
    left: 78%;
  }
  .close-map {
    position: absolute;
    top: 12%;
    right: 10%;
    img {
      position: absolute;
      width: 16px;
      height: 16px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>