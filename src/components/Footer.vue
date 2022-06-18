<template>
  <router-link class="about" to="/about">About</router-link>
  <router-link v-if="this.$route.path != '/'" class="about" to="/">  |  Login Page</router-link>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.about {
  position: relative;
  left: 47%;
  bottom: 40px;
  text-decoration: none;
}
</style>