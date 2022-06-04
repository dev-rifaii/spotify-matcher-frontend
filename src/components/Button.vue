<template>
  <button
    @click="$router.push(route)"
    :style="{
      background: color,
      padding: size,
    }"
    class="btn customButton"
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
    size: String,
  },
  methods: {
    onClick() {},
  },
};
</script>
