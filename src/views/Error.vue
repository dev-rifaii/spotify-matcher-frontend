<template>
  <h1 class="error">Error</h1>
  <p v-if="message != null">💥{{ message }}</p>
</template>

<script>
export default {
  name: "Error",
  props: {
    message: String,
  },
};
</script>

<style scoped>
.error{

}
</style>