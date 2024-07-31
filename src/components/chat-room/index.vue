<template>
  <el-card style="min-width: 480px">
    <template #header>
      <div class="card-header">
        <div class="header-left flex">
          <div class="title mr-[10px]">{{ title }}</div>
          <span class="online">在线人数1</span>
        </div>
        <div class="header-right flex">
          <CarbonUserAvatarFilledAlt class="mr-[5px]" />
          <IconParkOutlineCloseOne
            @click="props.hanldeClickMessage"
            class="close"
          />
        </div>
      </div>
    </template>
    <div class="content">
      <div
        class="content-item"
        v-for="(item, index) in messageList"
        :key="index"
      >
        <div class="item-left" v-if="item.userId !== userInfo.userId">
          <el-avatar :src="item.userId" />
          <div class="ml-[11px]">
            {{ item.content }}
          </div>
        </div>
        <div class="item-right" v-else>
          <div class="mr-[10px]">
            {{ item.content }}
          </div>
          <el-avatar :src="item.userId" />
        </div>
      </div>
    </div>
    <template #footer>
      <div class="footer">
        <div class="footer-left">
          <FluentEmojiMultiple24Filled />
        </div>
        <div class="footer-center">
          <el-input v-model="yourMessage" @keyup="sendMessage" />
        </div>
        <div class="footer-right">
          <el-button @click="sendMessage">发送</el-button>
        </div>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
// @ts-ignore
import IconParkOutlineCloseOne from "~icons/icon-park-outline/close-one?width=32px&height=32px";
// @ts-ignore
import CarbonUserAvatarFilledAlt from "~icons/carbon/user-avatar-filled-alt?width=32px&height=32px";
// @ts-ignore
import FluentEmojiMultiple24Filled from "~icons/fluent/emoji-multiple-24-filled?width=1.2em&height=1.2em";
import { onMounted, ref } from "vue";
const props = defineProps({
  hanldeClickMessage: {
    type: Function,
    required: true,
  },
});
let ws: any = null;
const title = "Like的聊天室";
const yourMessage = ref("");
const userInfo = ref({
  userId: "",
});
const messageList = ref<any>([]);
const onlineList = ref([]);
const sendMessage = () => {
  if (yourMessage.value) {
    ws.send(
      JSON.stringify({
        type: "message",
        userId: userInfo.value.userId,
        content: yourMessage.value,
      })
    );
  }
  yourMessage.value = "";
};
onMounted(() => {
  userInfo.value.userId = new Date().getTime().toString().slice(8);
  initWebsocket();
});
const initWebsocket = () => {
  ws = new WebSocket("ws:127.0.0.1:8888");
  ws.onopen = () => {
    console.log("websocket连接成功");
    ws.send(
      JSON.stringify({
        type: "init",
        userId: userInfo.value.userId,
        content: "欢迎来到聊天室",
      })
    );
  };

  ws.onerror = () => {
    console.log("websocket连接失败");
  };

  ws.onmessage = (data: MessageEvent) => {
    const message = JSON.parse(data.data);
    switch (message.type) {
      case "tips":
        console.log(message.content);
        break;
      case "message":
        messageList.value.push(message);
        break;
      case "onlineList":
        onlineList.value = message.list;
        break;
      default:
        break;
    }
  };

  ws.onclose = () => {
    console.log("websocket连接关闭");
  };
};
</script>

<style scoped>
.card-header {
  height: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-left {
    align-items: center;

    .online {
      font-size: 0.7rem;
      color: #999;
    }
  }

  .header-right {
    .close:hover {
      color: aquamarine;
    }
  }
}

.content {
  height: 300px;
  overflow-y: scroll;
  .content-item {
    margin: 20px 10px;
  }
}
.item-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.item-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.footer {
  height: 0.8rem;
  align-items: center;
  display: flex;
  justify-content: space-between;

  .footer-center {
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
