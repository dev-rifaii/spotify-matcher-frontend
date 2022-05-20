<template>
  <button
    @click="$router.push(route)"
    :style="{
      background: color,
    }"
    class="btn"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    color: String,
    route: String,
  },
  methods: {
    onClick() {},
  },
};
</script>
