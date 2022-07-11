<template>
  <button
    @click="$router.push(route)"
    :style="{
      background: color,
      padding: size,
      width:width,
      height:height,
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
    width: String,
    height:String,
  },
  methods: {
    onClick() {},
  },
};
</script>
