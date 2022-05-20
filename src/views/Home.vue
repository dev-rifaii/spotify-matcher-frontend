<template>
  <router-link to="/profile">Profile|</router-link>
  <router-link to="/tracks">Tracks|</router-link>
  <router-link to="/matches">Matches</router-link>
  <br />
  <Button text="match" route="matcher" />

  <div v-if="currentPage == 'profile'">
    <profile-view></profile-view>
  </div>

</template>


<script>
import Button from "../components/Button.vue";
export default {
  name: "Home",
    data() {
    return {
      currentPage: "home",
    };
  },
  components: {
    Button,
  },
};
</script>
