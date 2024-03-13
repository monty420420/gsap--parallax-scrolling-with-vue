<template>
  <div>
    <div class="open-wrap">
      <Button
        class="open-map"
        @click="isModal = true"
        @mouseenter="buttonHover(true, 'open-map')"
        @mouseleave="buttonHover(false, 'open-map')"
      >
        <img src="/assets/image/scull.png" alt="" />
        <img src="/assets/image/scull.png" alt="" />
      </Button>
    </div>
    <Teleport to="#app">
      <div v-if="isModal" class="map-modal">
        <img class="modal-background" src="/assets/image/map.png" alt="" />
        <ul class="red-point">
          <li>
            <span class="blind">red point</span>
          </li>
          <li>
            <span class="blind">red point</span>
          </li>
          <li>
            <span class="blind">red point</span>
          </li>
        </ul>
        <Button
          class="close-map"
          @click="isModal = false"
          @mouseenter="buttonHover(true, 'close-map')"
          @mouseleave="buttonHover(false, 'close-map')"
        >
          <img src="/assets/image/close.png" alt="" />
          <img src="/assets/image/close.png" alt="" />
        </Button>
      </div>
    </Teleport>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import Button from "/mun/practice/gsap-practice/src/components/element/Button.vue";
import { buttonHover } from "../common/buttonHover";

export default {
  components: {
    Button,
  },
  setup() {
    const isModal = ref(false);

    onMounted(() => {
      watch(isModal, (value) => {
        if (value) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      });
    });

    return {
      isModal,
      buttonHover,
    };
  },
};
</script>

<style scoped lang="scss">
.open-wrap {
  position: fixed;
  left: 10%;
  top: auto;
  bottom: 3%;
  margin-bottom: 40px;
  width: 28px;
  height: 28px;
  border: 1px solid black;
  border-radius: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  .open-map {
    overflow: hidden;
    img {
      padding-top: 5px;
      width: 16px;
      height: 16px;
    }
    img:nth-child(2) {
      padding-top: 2px;
    }
  }
}
.map-modal {
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
  .red-point {
    li {
      width: 15px;
      height: 15px;
      border-radius: 100px;
      background: #6c0e11;
      position: fixed;
      cursor: pointer;
    }
    li:hover {
      animation: redSpread 2s infinite ease-out;
    }
    li:nth-of-type(1) {
      top: 48%;
      left: 48%;
    }
    li:nth-of-type(2) {
      top: 20%;
      left: 20%;
    }
    li:nth-of-type(3) {
      top: 22%;
      left: 78%;
    }
  }
  .close-map {
    position: fixed;
    overflow: hidden;
    top: 12%;
    right: 10%;
    img {
      padding-top: 5px;
      width: 16px;
      height: 16px;
    }
    img:nth-child(2) {
      padding-top: 2px;
    }
  }
}

//붉은점 키프레임 애니메이션
@keyframes redSpread {
  0% {
    box-shadow: 0px 0px 0px 0px rgba(100, 0, 0, 1);
  }
  100% {
    box-shadow: 0px 0px 0px 70px rgba(88, 0, 0, 0);
  }
}
</style>

