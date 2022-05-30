<template>
  <div class="row row-cols-1 row-cols-md-3">
    <div :key="user.id" v-for="user in users">
      <div class="col mb-4">
        <User :user="user" />
      
      </div>
    </div>
  </div>
</template>
<script>
import User from "./User";
export default {
  name: "Users",
  components: {
    User,
  },
  props: {
    users: Array,
  },
};
</script>