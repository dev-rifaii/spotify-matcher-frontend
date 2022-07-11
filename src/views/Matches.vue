<template>
  <Users :users="users" />
  <h4 v-if="!users.length">No matches found</h4>
</template>

<script>
import Users from "../components/Users.vue";
import axios from "axios";

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
        let token = localStorage.getItem("jwt");
    token = token.substring(1, token.length);
    try {
      const res = await axios.get(
        `${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/users/matches`,
        {
          headers: { jwt: token },
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