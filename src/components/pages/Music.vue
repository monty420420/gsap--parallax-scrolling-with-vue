<template>
  <div class="music-modal" ref="musicModal">
    <Button @click="togglePlay">{{ isPlaying ? "Pause" : "Play" }}</Button>
    <h2>제목 : "{{ currentMusic.title }}"</h2>
    <audio ref="audioPlayer" :src="currentMusic.url"></audio>
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
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import Button from "@/components/element/Button.vue";
import { buttonHover } from "@/components/common/buttonHover";
import gsap from "gsap";
export default {
    components: {
    Button,
  },
  setup() {
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

    onMounted(() => {
      document.addEventListener("click", toggleMusicModal);
    });

    onUnmounted(() => {
      document.removeEventListener("click", toggleMusicModal);
    });

    return {
      buttonHover,
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