<template>
  <Tracks :tracks="tracks" />
</template>

<script>
import Tracks from "../components/Tracks";
import { Util } from "../router/index";

import axios from "axios";

export default {
  name: "TracksView",
  components: {
    Tracks,
  },

  data() {
    return {
      tracks: [],
    };
  },
  async created() {
    const token = JSON.parse(localStorage.getItem("token"));
    Util.refreshIfExpired(token);

    try {
      const res = await axios.get(
        "http://localhost:8080/spotifymatcher/users/tracks",
        {
          headers: { token: token.access_token },
        }
      );
      this.tracks = res.data;
    } catch (e) {
      this.$router.push("error");
      console.error(e);
    }
  },
};
</script>