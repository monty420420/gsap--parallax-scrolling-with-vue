<template>
  <div>
    <div class="map-wrap">
      <Button
        class="open-map"
        @click="(isModal = true)"
        @mouseenter="buttonHover(true, 'open-map' , 0.3, '-120%')"
        @mouseleave="buttonHover(false, 'open-map' , 0.3 , '0%')"
      >
        <img src="/assets/image/scull.png" alt="" />
        <img src="/assets/image/scull.png" alt="" />
      </Button>
    </div>
    <Teleport to="#app">
      <div v-if="isModal" class="map-modal">
        <img class="modal-background" src="/assets/image/map.png" alt="" />
        <ul class="red-point">
          <li @click="togglePoint(1)">
            <span class="blind">red point</span>
          </li>
          <li @click="togglePoint(2)" v-if="pointVisible > 0">
            <span class="blind">red point</span>
          </li>
          <li v-if="pointVisible > 1">
            <span class="blind">red point</span>
          </li>
        </ul>
        <Button
          class="close-map"
          @click="isModal = false"
          @mouseenter="buttonHover(true, 'close-map' , 0.3, '-120%')"
          @mouseleave="buttonHover(false, 'close-map' , 0.3 , '0%')"
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
import Button from "@/components/element/Button.vue";
import { buttonHover } from "@/components/common/buttonHover";

export default {
  components: {
    Button,
  },
  setup() {
    const isModal = ref(false);
    const pointVisible = ref(0);

    //모달
    onMounted(() => {
      watch(isModal, (value) => {
        if (value) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      });
    });

    //다음 포인트로 넘어가기
    const togglePoint = (index) => {
      if( pointVisible.value != index && pointVisible.value < 2 ){
        ++pointVisible.value;
      }
    };

    return {
      isModal,
      buttonHover,
      togglePoint,
      pointVisible,
    };
  },
};
</script>
