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
          <IconParkOutlineCloseOne @click="props.hanldeClickMessage" class="close" />
        </div>
      </div>
    </template>
    <div class="content">

    </div>
    <template #footer>
      <div class="footer">
        <div class="footer-left">
          <FluentEmojiMultiple24Filled />
        </div>
        <div class="footer-center">
          <el-input />
        </div>
        <div class="footer-right">
          <el-button>发送</el-button>
        </div>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import IconParkOutlineCloseOne from '~icons/icon-park-outline/close-one?width=32px&height=32px';
import CarbonUserAvatarFilledAlt from '~icons/carbon/user-avatar-filled-alt?width=32px&height=32px';
import FluentEmojiMultiple24Filled from '~icons/fluent/emoji-multiple-24-filled?width=1.2em&height=1.2em';
const props = defineProps({
  hanldeClickMessage: {
    type: Function,
    required: true
  }
})
const title = 'Like的聊天室'
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
}

.footer {
  height: .8rem;
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