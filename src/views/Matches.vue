<template>
  <Users :users="users" />
  <h4 v-if="!users.length">No matches found</h4>
</template>

<script>
import Users from "../components/Users.vue";
import axios from "axios";
import { Util } from "../router/index";

export default {
  name: "Matches",
  components: {
    Users,
  },
  data() {
    return {
      users: [],
    };
  },

  async created() {
    const token = JSON.parse(localStorage.getItem("token"));
    Util.refreshIfExpired(token);
    try {
      const res = await axios.get(
        `${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/users/matches`,
        {
          headers: { token: token.access_token },
        }
      );
      this.users = res.data;
    } catch (e) {
      this.$router.push('error');
      console.error(e);
    }
  },
};
</script>