<template>
  <Main />
  <Map />
  <Music />
</template>

<script>
import Main from "@/components/pages/Main.vue"
import Map from "@/components/pages/Map.vue";
import Music from "@/components/pages/Music.vue";

export default {
  components: {
    Main,
    Map,
    Music,
  },
};
</script>