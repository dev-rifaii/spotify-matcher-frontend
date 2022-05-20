<template>

  <div class="row row-cols-1 row-cols-md-5">
    <div :key="track.id" v-for="track in tracks">
      <div class="col mb-4">
        <Track :track="track" />
      </div>
    </div>
  </div>
</template>


<script>
import Track from "./Track.vue";
export default {
  name: "Tracks",

  components: {
    Track,
  },
  props: {
    tracks: Array,
  },
};
</script>

