<template>
  <section>
    <img
      class="background"
      ref="background"
      src="/assets/image/home-background.jpg"
    />
    <img
      class="foreground"
      ref="foreground"
      src="/assets/image/tree.png"
    />
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
    <img class="scroll" src="/assets/image/scroll.gif" alt="">
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
      const maxBackgroundSize = 120;
      const backgroundSize = scrollY / (maxBackgroundSize - 100);
      const backgroundOpacity = 1;

      first.value.style.opacity =
        (100 - (scrollY + window.innerHeight - first.value.offsetHeight)) / 100;
      second.value.style.opacity =
        (100 + (scrollY + window.innerHeight - second.value.offsetHeight)) / 100;
      background.value.style.transform =
        "scale(" + (100 + backgroundSize * 0.4) / 100 + ")";
      // background.value.style.opacity =
      // (100 - (scrollY + window.innerHeight - background.value.offsetHeight)) / 100;
      foreground.value.style.transform =
        "scale(" + (100 + backgroundSize * 1.5) / 100 + ")";
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

<style scoped lang = "scss">
section {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  height: 260vh;
  .background,
  .foreground {
    position: fixed;
    width: 100%;
  }
}
.content{
  .box {
    position: fixed;
    color: white;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.first {
  margin-bottom: 500px;
  h1{
    display: flex;
    justify-content: center;
    font-size: 25px;
  }
  .logo{
    width: 428px;
    height: 99px;
    background-image: url(/assets/image/home-logo.png);
    background-repeat: no-repeat;
    background-size: contain;
  }
}

.second{
  opacity: 0;
  div {
    color: white;
    text-align: center;
    padding: 50px;
    max-width: 300px;
    opacity: 1;
  }
  h2 {
    font-size: 35px;
    margin-bottom: 40px;
  }
  p {
    line-height: 150%;
  }
}

.scroll{
  position: fixed;
    left: 0%;
    top: auto;
    right: 0%;
    bottom: 0%;
    z-index: 2;
    margin-bottom: 40px;
    margin-left: 48%;
    width: 50px;
    height: 50px;
}

</style>
