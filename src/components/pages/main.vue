<template>
  <section>
    <img
      class="background"
      ref="background"
      src="/assets/image/home-background.jpg"
    />
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
    <div class="music-modal" ref="musicModal">
      <h2>title : "{{ currentMusic.title }}"</h2>
      <audio ref="audioPlayer" :src="currentMusic.url"></audio>
      <Button @click="togglePlay">{{ isPlaying ? "Pause" : "Play" }}</Button>
    </div>
    <div class="music-wrap">
      <Button
        class="open-music"
        @click="toggleMusicModal"
        @mouseenter="buttonHover(true, 'open-music')"
        @mouseleave="buttonHover(false, 'open-music')"
      >
        <img src="/assets/image/music.png" alt="" />
        <img src="/assets/image/music.png" alt="" />
      </Button>
    </div>
  </section>
</template>
<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import Map from "@/components/pages/map.vue";
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
    const musicModal = ref(null);
    const isMusic = ref(false);
    const isPlaying = ref(false);
    //노래리스트 배열
    const playlist = [
      { title: "place", url: "/assets/music/place.mp3" },
      { title: "color", url: "/assets/music/color.mp3" },
      { title: "inspiring", url: "/assets/music/inspiring.mp3" },
    ];

    const currentMusic = computed(() => playlist[0]);

    const audioPlayer = ref(null);

    const togglePlay = () => {
      if (isPlaying.value) {
        audioPlayer.value.pause();
      } else {
        audioPlayer.value.play();
      }
      isPlaying.value = !isPlaying.value;
    };

    const toggleMusicModal = (event) => {
      if (!event.target.closest(".open-music")) return; //이벤트버블링값 리턴
      event.stopPropagation(); //이벤트버블링 제거
      gsap.to(musicModal.value, {
        x: isMusic.value ? "400" : "-400",
        duration: 0.5,
      });
      isMusic.value = !isMusic.value;
      stopMusic();
    };

    const stopMusic = () => {
      audioPlayer.value.pause();
      audioPlayer.value.currentTime = 0;
      isPlaying.value = false;
    };

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
      document.addEventListener("click", toggleMusicModal);
      document.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      document.removeEventListener("click", toggleMusicModal);
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
      musicModal,
      currentMusic,
      audioPlayer,
      isPlaying,
      togglePlay,
      stopMusic,
      toggleMusicModal,
    };
  },
};
</script>

