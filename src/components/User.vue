<template>
  <div class="card" style="width: 18rem">
    <img
      :src="user.image"
      class="card-img-top"
      @error="
        $event.target.src =
          'https://static.thenounproject.com/png/82455-200.png'
      "
    />
    <div class="card-body">
      <p class="card-text">Country: {{ user.country }}</p>
      <p class="card-text">Email: {{ user.email }}</p>
      <p class="card-text">Biography: {{ user.biography }}</p>
      <input
        id="bioinput"
        type="text"
        class="form-control"
        ref="inp"
        aria-describedby="emailHelp"
        placeholder="change biography"
        v-model="bid"
        v-if="this.$route.path == '/profile'"
      />
      <br />
      <button
        v-if="this.$route.path == '/profile'"
        type="button"
        @click="setBio()"
        class="btn setBio"
      >
        Set Bio
      </button>
      <label v-if="enough == true">Minimum 20 characters</label>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "User",
  props: {
    user: Object,
  },
  data() {
    return {
      id: String,
      enough: Boolean,
    };
  },

  methods: {
    setBio() {
      if (!this.checkInput()) {
        this.enough = true;
        return;
      }

    let token = localStorage.getItem("jwt");
    token = token.substring(1, token.length);

      axios
        .post(
          `${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/users/bio`,
          this.bid,
          {
            headers: {
              "Content-Type": "text/plain",
              jwt: token,
            },
          }
        )
        .then(() => location.reload())
        .catch((error) => {
          if (error.response.status !== 200) {
            this.$router.push("error");
          }
        });
    },
    checkInput() {
      return this.bid.length >= 20;
    },
  },
};
</script>

<style>
.setBio {
  padding: 15px 96px;
}
</style>