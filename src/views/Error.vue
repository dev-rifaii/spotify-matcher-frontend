<template>
  <h1>Error</h1>
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