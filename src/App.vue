<template>
  <section>
    <img
      class="background"
      ref="background"
      src="../public/assets/image/home-background.jpg"
    />
    <img
      class="foreground"
      ref="foreground"
      src="../public/assets/image/tree.png"
    />
    <div class="section section-1" ref="first">
      <div>
        <transition appear @before-enter="beforeLogo" @enter="afterLogo">
          <h1>the story of</h1>
        </transition>
      </div>
    </div>
    <div class="section section-2" ref="second">
      <div>
        <h2>Plot</h2>
        <p>
          Facing foreclosure of their homes in the Goon Docks area of Astoria,
          Oregon to an expanding country club, a group of children who call
          themselves "the Goonies" gather for a final weekend together.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

export default {
  setup() {
    const foreground = ref(null);
    const background = ref(null);
    const first = ref(null);
    const second = ref(null);

    onMounted(() => {
      document.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      document.removeEventListener("scroll", handleScroll);
    });

    const handleScroll = (evt) => {
      const scrollY = window.scrollY;
      first.value.style.opacity =
        (100 - (scrollY + window.innerHeight - first.value.offsetHeight)) / 100;
      second.value.style.opacity =
        (100 + (scrollY + window.innerHeight - second.value.offsetHeight)) /
        100;
      const maxBackgroundSize = 120;
      const backgroundSize = scrollY / (maxBackgroundSize - 100);
      background.value.style.transform =
        "scale(" + (100 + backgroundSize * 0.4) / 100 + ")";
      foreground.value.style.transform =
        "scale(" + (100 + backgroundSize * 2) / 100 + ")";
    };
    return {
      foreground,
      background,
      first,
      second,
    };
  },
  methods: {
    beforeLogo(el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(70px)";
    },
    afterLogo(el) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
      });
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}
img.background,
img.foreground {
  position: fixed;
  width: 100%;
}
.section {
  min-height: 100vh;
}
.section > div {
  position: fixed;
  color: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.section-1 {
  margin-bottom: 500px;
  font-size: 32px;
}

.section-2 {
  opacity: 0;
}

.section-2 div {
  color: white;
  text-align: center;
  padding: 50px;
  max-width: 300px;
  opacity: 1;
}

.section-2 h2 {
  font-size: 2em;
  margin-bottom: 40px;
}

.section-2 p {
  line-height: 150%;
}
</style>
