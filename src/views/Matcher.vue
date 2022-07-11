<template>
  <Users :users="users" />
  <h4 v-if="!users.length">No matches found</h4>
</template>

<script>
import axios from "axios";
import Users from "../components/Users.vue";


export default {
  name: "Matcher",
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
        `${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/users/match`,
        {
          headers: { jwt: token },
        }
      );
      this.users = res.data;
    } catch (e) {
      if (e.response.status == 401) {
        this.$router.push({
          name: "Error",
          params: {
            message:
              "You need to link your socials in biography before trying to match.",
          },
        });
      } else {
        this.$router.push("error");
      }
    }
  },
};
</script>