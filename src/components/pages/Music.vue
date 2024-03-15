<template>
  <div class="music-wrap">
    <Button
      class="open-music"
      @click="toggleMusicModal"
      @mouseenter="buttonHover(true, 'open-music', 0.3, '-120%')"
      @mouseleave="buttonHover(false, 'open-music', 0.3, '0%')"
    >
      <img src="/assets/image/music.png" alt="" />
      <img src="/assets/image/music.png" alt="" />
    </Button>
  </div>
  <div class="music-modal" ref="musicModal">
    <h2>노래제목 : "{{ currentMusic.title }}"</h2>
    <div class="music-function">
      <audio ref="audioPlayer" :src="currentMusic.url"></audio>
      <Button class="prev-btn" @click="prevMusic">prev</Button>
      <Button class="play-btn" @click="togglePlay">{{ isPlaying ? "Pause" : "Play" }}</Button>
      <Button class="next-btn" @click="nextMusic">next</Button>
    </div>
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
    const playlist = [
      { title: "place", url: "/assets/music/place.mp3" },
      { title: "color", url: "/assets/music/color.mp3" },
      { title: "inspiring", url: "/assets/music/inspiring.mp3" },
    ];

    const currentTrackIndex = ref(0);

    const currentMusic = computed(() => playlist[currentTrackIndex.value]);

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
      if (!event.target.closest(".open-music")) return;
      event.stopPropagation();
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

    const nextMusic = () => {
      if (currentTrackIndex.value === playlist.length - 1) {
        currentTrackIndex.value = 0;
      } else {
        currentTrackIndex.value++;
      }
      isPlaying.value = false;
    };

    const prevMusic = () => {
      if (currentTrackIndex.value === 0) {
        currentTrackIndex.value = playlist.length - 1;
      } else {
        currentTrackIndex.value--;
      }
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
      nextMusic,
      prevMusic,
    };
  },
};
</script>
