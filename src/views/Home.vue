<template>
  <div class="buttonsContainer">
    <Button text="profile" color="green"  route="profile" />
    <Button text="tracks" color="green" route="tracks" />
    <Button text="matches" color="green" route="matches" />
    <br />
    <Button style="matchButton" size="15px 125px" text="match" route="matcher" />
  </div>

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

<style scoped>
.buttonsContainer {
  margin: auto;
  width: 50%;
  padding: 10px;
}
</style>
