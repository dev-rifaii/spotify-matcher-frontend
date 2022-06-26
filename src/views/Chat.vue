<template>
  <div>
    <div class="wrapper">
      <div class="content">
        <div v-for="match in matches" :key="match.id">
          <div @click="setCurrentRecipient(match)">
            <img class="img" :src="match.image" />
          </div>
        </div>
      </div>
      <div class="chatbox">
        <!-- <p>{{ current_recipient }}</p> -->
        <div class="convo-container">
          <div v-for="(message, index) in received_messages" :key="index">
            <div class="message sender" v-if="message.senderId == user.id">
              <img class="avatar" :src="user.image" />
              <p class="sender-message-content">{{ message.content }}</p>
            </div>
            <div
              class="message recipient"
              v-if="message.senderId == current_recipient.id"
            >
              <img class="avatar" :src="current_recipient.image" />
              <p class="recipient-message-content">{{ message.content }}</p>
            </div>
          </div>
        </div>
        <div class="chatboxfooter">
          <input
            class="form-control"
            placeholder="enter message"
            v-model="msg"
            v-on:keyup.enter="send()"
          />
          <button class="btn btn-default" @click="send()">send</button>
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
      user: null,
      current_recipient: null,
    };
  },

  created() {
    const token = JSON.parse(localStorage.getItem("token"));
    Util.refreshIfExpired(token);
    this.getUser(token);
  },

  methods: {
    setCurrentRecipient(match) {
      this.current_recipient = match;
      if (localStorage.getItem(this.getConvoId()) != null) {
        this.received_messages = JSON.parse(
          localStorage.getItem(this.getConvoId())
        );
      } else {
        this.received_messages = [];
      }
    },

    async getMatches(token) {
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/users/matches`,
          {
            headers: { token: token.access_token },
          }
        );
        this.matches = res.data;
        if (this.matches.length > 0) {
          this.current_recipient = res.data[0];
          if (localStorage.getItem(this.getConvoId()) != null) {
            this.received_messages = JSON.parse(
              localStorage.getItem(this.getConvoId())
            );
          }
        }
      } catch (e) {
        this.$router.push("error");
        console.error(e);
      }
    },

    async getUser(token) {
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/users/profile`,
          {
            headers: { token: token.access_token },
          }
        );
        this.user = res.data;
        this.getMatches(token);
        this.connect();
      } catch (e) {
        this.$router.push("error");
        console.error(e);
      }
    },

    send() {
      if (this.msg.length > 0) {
        const msg = {
          senderId: this.user.id,
          recipientId: this.current_recipient.id,
          content: this.msg,
        };
        this.persistMessage(msg);
        this.received_messages.push(msg);
        this.stompClient.send("/app/private", JSON.stringify(msg), {});
        this.msg = "";
      }
    },

    persistMessage(message) {
      const convoId = this.getConvoId();

      if (localStorage.getItem(convoId) == null) {
        const convo = [message];
        localStorage.setItem(convoId, JSON.stringify(convo));
      } else {
        let convo = JSON.parse(localStorage.getItem(convoId));
        console.log(convo);
        convo.push(message);
        localStorage.setItem(convoId, JSON.stringify(convo));
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
          this.stompClient.subscribe(`/user/${this.user.id}/dm`, (tick) => {
            const message = JSON.parse(tick.body);
            this.persistMessage(message);
            this.received_messages.push(message);
          });
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

    getConvoId() {
      return (
        this.hashCode(this.user.id) + this.hashCode(this.current_recipient.id)
      );
    },

    hashCode(string) {
      var hash = 0;
      for (var i = 0; i < string.length; i++) {
        var code = string.charCodeAt(i);
        hash = (hash << 5) - hash + code;
        hash = hash & hash;
      }
      return hash;
    },
  },
};
</script>

<style  scoped>
.wrapper {
  display: flex;
  gap: 15px;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.img {
  border-radius: 50%;
  border: 5px solid green;
  max-width: 70px;
}

.chatbox {
  flex-grow: 1;

  border-radius: 10px;
  border: 2px solid grey;
  height: 600px;
}

.chatboxfooter {
  display: flex;
  position: relative;
  padding: 5px;
  top: 20px;
}

.form-control {
  max-width: 90%;
}

.convo-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 85%;
  width: 97%;
  overflow: auto;
  position: relative;
  top: 2%;
  left: 1.5%;
}

.message {
  display: flex;
}

.sender {
  flex-direction: row-reverse;
}

.recipient {
  color: blue;
}

.sender-message-content {
  position: relative;
  top: 12px;
  right: 5px;
}

.recipient-message-content {
  position: relative;
  top: 12px;
  left: 5px;
}

.avatar {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
</style>