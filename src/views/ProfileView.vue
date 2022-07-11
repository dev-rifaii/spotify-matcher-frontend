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
    let token = localStorage.getItem("jwt");
    token = token.substring(1, token.length);
    try {
      const res = await axios.get(
        `${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/users/profile`,
        {
          headers: { jwt: token },
        }
      );
      this.profile = res.data;
    } catch (e) {
      this.$router.push("error");
      console.error(e);
    }
  },
};
</script>
