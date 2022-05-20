<template>
  <header>
    <h1>Spotify Matcher</h1>
  </header>
  <body>
    <Button
      v-if="this.$route.path == '/'"
      text="Login"
      color="green"
      route="login"
    />
    <Button
      v-if="this.$route.path == '/'"
      text="Refresh"
      color="blue"
      route="refresh"
    />
  </body>
</template>


<script>
import Button from "./Button";
export default {
  name: "Header",
  components: {
    Button,
  },
};

methods: {
}
</script>


<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>