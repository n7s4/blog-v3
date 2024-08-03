<template>
  <div class="chat-room">
    <div class="emoji" ref="emoji">
      <EmojiPicker @select="onSelectEmoji" :native="true" v-if="visibleEmoji" />
    </div>
    <el-card class="user-onlines" v-if="showLines">
      <ul>
        <li v-for="item in onlineList" :key="item.userId">
          {{ item.userId }}
        </li>
      </ul>
    </el-card>
    <el-card style="min-width: 480px">
      <template #header>
        <div class="card-header">
          <div class="header-left flex">
            <div class="title mr-[10px]">{{ title }}</div>
            <span class="online">在线人数{{ onlineList.length }}</span>
          </div>
          <div class="header-right flex">
            <CarbonUserAvatarFilledAlt
              class="mr-[5px]"
              @click="showLines = !showLines"
            />
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
          v-for="item in messageList"
          :key="item.userId"
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
            <div ref="emojiRef">
              <FluentEmojiMultiple24Filled />
            </div>
          </div>
          <div class="footer-center">
            <el-input v-model="yourMessage" @keyup.enter="sendMessage" />
          </div>
          <div class="footer-right">
            <el-button @click="sendMessage">发送</el-button>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import IconParkOutlineCloseOne from "~icons/icon-park-outline/close-one?width=32px&height=32px";
// @ts-ignore
import CarbonUserAvatarFilledAlt from "~icons/carbon/user-avatar-filled-alt?width=32px&height=32px";
// @ts-ignore
import FluentEmojiMultiple24Filled from "~icons/fluent/emoji-multiple-24-filled?width=1.2em&height=1.2em";
import EmojiPicker, { EmojiExt } from "vue3-emoji-picker";
import "vue3-emoji-picker/css";
import { onMounted, ref, onBeforeUnmount } from "vue";
const props = defineProps({
  hanldeClickMessage: {
    type: Function,
    required: true,
  },
});
let ws: WebSocket | null = null;
const title = "Like的聊天室";
const yourMessage = ref("");
const userInfo = ref({
  userId: "",
});
const messageList = ref<any>([]);
const onlineList = ref<{ userId: string }[]>([]);
const visibleEmoji = ref(false);
const showLines = ref(false);
const emoji = ref<HTMLElement | null>(null);
const emojiRef = ref<HTMLElement | null>(null);
const sendMessage = () => {
  if (yourMessage.value) {
    ws?.send(
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
  document.addEventListener("click", handleClickOutsideforEmoji);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutsideforEmoji);
});
const initWebsocket = () => {
  ws = new WebSocket("ws:127.0.0.1:8888");
  ws.onopen = () => {
    console.log("websocket连接成功");
    ws?.send(
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
// 监听点击事件 点击FluentEmojiMultiple24Filled时，切换状态，点击EmojiPicker外部时隐藏
const handleClickOutsideforEmoji = (event: Event) => {
  if (
    emoji &&
    !emoji.value?.contains(event.target as Node) &&
    !emojiRef.value?.contains(event.target as Node)
  ) {
    visibleEmoji.value = false;
    console.log(1);
  } else if (emojiRef && emojiRef.value?.contains(event.target as Node)) {
    visibleEmoji.value = !visibleEmoji.value;
  }
};
const onSelectEmoji = (emoji: EmojiExt) => {
  yourMessage.value += emoji.i;
};
</script>

<style scoped>
.chat-room {
  /* display: flex; */
  position: relative;
  .emoji {
    /* margin: 1.5rem; */
    position: absolute;
    top: 10%;
    left: 10%;
  }
  .user-onlines {
    position: absolute;
    top: -50%;
    right: 0%;
    width: 100px;
    height: 200px;
    /* background-color: #fff; */
  }
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
}
</style>
