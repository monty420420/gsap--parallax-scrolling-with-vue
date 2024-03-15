<template>
  <section>
    <img class="background" ref="background" src="/assets/image/home-background.jpg" />
    <img class="foreground" ref="foreground" src="/assets/image/tree.png" />
    <div class="content first" ref="first">
      <div class="box">
        <h1>the story of</h1>
        <transition appear @before-enter="beforeLogo" @enter="afterLogo">
          <div class="logo">
            <span class="blind">THE GOONIES</span>
          </div>
        </transition>
      </div>
    </div>
    <div class="content second" ref="second">
      <div class="box">
        <h2>Plot</h2>
        <p>
          Facing foreclosure of their homes in the Goon Docks area of Astoria,
          Oregon to an expanding country club, a group of children who call
          themselves "the Goonies" gather for a final weekend together.
        </p>
      </div>
    </div>
    <img class="scroll" src="/assets/image/scroll.gif" alt="" />
  </section>
</template>
<script>
import { ref, onMounted, onUnmounted } from "vue";
import Map from "@/components/pages/Map.vue";
import gsap from "gsap";
import Button from "@/components/element/Button.vue";
import { buttonHover } from "@/components/common/buttonHover";

export default {
  components: {
    Map,
    Button,
  },
  setup() {
    const foreground = ref(null);
    const background = ref(null);
    const first = ref(null);
    const second = ref(null);

    /**
     *  1. scrollY + window.innerHeight = 보여지는 화면의 가장밑바닥 절대위치
     *  2. offsetHeight 해당요소의 높이
     */
    const handleScroll = () => {
      const scrollY = window.scrollY; //현재 수직으로 스크롤 된 값
      const maxBackgroundSize = 120; //최고 확대될수있는값
      const backgroundSize = scrollY / (maxBackgroundSize - 100);
      first.value.style.opacity =
        (100 - (scrollY + window.innerHeight - first.value.offsetHeight)) / 100;
      second.value.style.opacity =
        (100 + (scrollY + window.innerHeight - second.value.offsetHeight)) / 100;
      background.value.style.transform = `scale(${ (100 + backgroundSize * 0.4) / 100 })`;
      foreground.value.style.transform = `scale(${ (100 + backgroundSize * 0.8) / 100 })`;
    };

    onMounted(() => {
      document.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      document.removeEventListener("scroll", handleScroll);
    });

    const beforeLogo = (el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(70px)";
    };

    const afterLogo = (el) => {
      gsap.to(el, { opacity: 1, y: 0, duration: 1 });
    };

    return {
      foreground,
      background,
      first,
      second,
      buttonHover,
      beforeLogo,
      afterLogo,
    };
  },
};
</script>
