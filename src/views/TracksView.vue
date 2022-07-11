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
    let token = localStorage.getItem("jwt");
    token = token.substring(1, token.length);

    try {
      const res = await axios.get(
        `${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/users/tracks`,
        {
          headers: { jwt: token },
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