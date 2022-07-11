<template>
  <header>
    <h1>Spotify Matcher</h1>
    <AuthenticatedPrev v-if="tokenIsValid() == true" />
  </header>
  <body>
    <div>
      <Button
        v-if="this.$route.path == '/'"
        text="Login"
        color="green"
        size="20px 100px"
        route="login"
      />
    </div>
  </body>
</template>


<script>
import Button from "./Button";
import AuthenticatedPrev from "./AuthenticatedPrev";
export default {
  name: "Header",
  components: {
    Button,
    AuthenticatedPrev,
  },
  methods: {
    tokenIsValid() {
      const now = Date.now();
      return (
        localStorage.getItem("jwt") != null 
      );
    },
  },
};
</script>


<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>