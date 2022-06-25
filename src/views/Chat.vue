<template>
  <div class="container">
    <div class="wrapper">
      <div class="content">
        <div v-for="match in matches" :key="match.id">
          <img class="img" :src="match.image" />
        </div>
      </div>
      <div class="chatbox">
        <div class="chatboxfooter">
          <input class="form-control" placeholder="enter message" />
          <button class="btn btn-default">send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { Util } from "../router/index";
import axios from "axios";
import Button from "@/components/Button.vue";

export default {
  components: { Button },
  name: "Chat",
  data() {
    return {
      matches: [],
      received_messages: [],
      send_message: null,
      connected: false,
    };
  },

  mounted() {
    this.connect();
    this.getMatches();
  },

  methods: {
    async getMatches() {
      const token = JSON.parse(localStorage.getItem("token"));
      Util.refreshIfExpired(token);
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/users/matches`,
          {
            headers: { token: token.access_token },
          }
        );
        this.matches = res.data;
        console.log(res.data);
      } catch (e) {
        this.$router.push("error");
        console.error(e);
      }
    },

    send() {
      if (this.stompClient && this.stompClient.connected) {
        const msg = {
          senderId: localStorage.getItem("id"),
          recipientId: localStorage.getItem("id"),
          content: "testing content",
        };
        this.stompClient.send("/app/private", JSON.stringify(msg), {});
      }
    },
    connect() {
      this.socket = new SockJS(
        `${process.env.VUE_APP_CHAT_SERVER_ROOT_URL}/chat`
      );
      this.stompClient = Stomp.over(this.socket);

      this.stompClient.connect(
        {},
        (frame) => {
          this.connected = true;
          this.stompClient.subscribe(
            `/user/${localStorage.getItem("id")}/dm`,
            (tick) => {
              this.received_messages.push(JSON.parse(tick.body).content);
            }
          );
        },
        (error) => {
          this.$router.push({
            name: "Error",
            params: { message: "Chat server is down" },
          });
          console.log(error);
        }
      );
    },
  },
};
</script>

<style  scoped>
.wrapper {
  display: flex;
  gap: 40px;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.img {
  border-radius: 50%;
  border: 5px solid green;
  width: 70px;
}

.chatbox {
  flex-grow: 1;
  background-color: grey;
  height: 600px;
}

.chatboxfooter{
  display: flex;
}
</style>