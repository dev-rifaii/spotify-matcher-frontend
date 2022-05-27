<template>
  <User :user="profile" />
</template>


<script>
import axios from "axios";
import User from "../components/User";
import { Util } from "../router/index";

export default {
  name: "ProfileView",
  components: {
    User,
  },
  data() {
    return {
      profile: Object,
      token: String,
    };
  },

  async created() {
    const token = JSON.parse(localStorage.getItem("token"));
    Util.refreshIfExpired(token);
    try {
      const res = await axios.get(
        `${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/users/profile`,
        {
          headers: { token: token.access_token },
        }
      );
      this.profile = res.data;
    } catch (e) {
      this.$router.push('error');
      console.error(e);
    }
  },
};
</script>
