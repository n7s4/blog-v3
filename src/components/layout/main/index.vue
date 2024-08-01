<template>
  <div class="main-container">
    <page-header />
    <div
      :class="[
        wideList.includes(route.path) ? 'max-w-[1280px]' : 'max-w-[880px]',
        'md:px-[40px]',
        'md:pt-[60px]',
        'pt-[60px]',
        'px-[10px]',
      ]"
    >
      <router-view></router-view>
    </div>
    <ChatRoom
      v-if="chatVisible"
      class="chat"
      :hanldeClickMessage="hanldeClickMessage"
    />
    <div @click="hanldeClickMessage">
      <MageMessageDotsRoundFill v-if="showScrollBottom" class="message" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import PageHeader from "../../page-header/index.vue";
import ChatRoom from "../../chat-room/index.vue";
// @ts-ignore
import MageMessageDotsRoundFill from "~icons/mage/message-dots-round-fill?width=48px&height=48px";
import { onMounted, ref } from "vue";
import * as _ from "lodash";
const wideList = ["/home", "/articlr"];
const route = useRoute();
const showScrollBottom = ref(true);
const chatVisible = ref(false);
const scrollListener = () => {
  if (document.body.scrollTop < 250) {
    showScrollBottom.value = false;
  } else {
    showScrollBottom.value = true;
  }
};

const initScrollEvent = () => {
  document.body.addEventListener("scroll", _.debounce(scrollListener, 10));
};
const hanldeClickMessage = () => {
  chatVisible.value = !chatVisible.value;
};

onMounted(() => {
  initScrollEvent();
});
</script>

<style lang="scss" scoped>
.message {
  // 固定到页面的右下角
  position: fixed;
  bottom: 200px;
  right: 20px;
  z-index: 999;
  animation: bounce 1.5s infinite;

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 1280px) {
    bottom: 100px;
  }
}

.message:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.chat {
  position: fixed;
  bottom: 100px;
  right: 100px;
  z-index: 9999;
}
</style>
