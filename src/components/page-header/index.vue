import { useRoute } from 'vue-router';
<template>
  <div class="page-header">
    <div id="home" class="home" v-if="route.path === '/home'">
      <el-image :src="banner" class="banner" fix="cover" />
      <div class="content">
        <div class="title">
          Blog
        </div>
        <div class="saying">
          一点浩然气，千里快哉风
        </div>
      </div>
      <div class="mask"></div>
      <div v-if="showScrollBottom" @click="scrollToBottom" class="scroll-bottom">
        <MingcuteDownFill class="scroll-icon w-[2rem] h-[2rem]" />
      </div>
    </div>
    <div class="article" v-else-if="route.path === '/article'">
      <el-image :src="banner" class="banner" fix="cover" />
      <div class="content text-white">
        <div class="title">{{ getArticle.title }}</div>
        <div class="info text-sm mb-3 flex flex-wrap items-center p-[1.2rem]">
          <div class="item mr-[0.3rem] flex items-center">
            <Fa6RegularCalendarDays class="w-[1rem] h-[1rem] mr-[0.2rem]" />
            <span>发表于{{ getArticle.title }}</span>
          </div>
          <div class="item mr-[0.3rem] flex items-center">
            <Fa6RegularClock class="w-[1rem] h-[1rem] mr-[0.2rem]" />
            <span>更新于{{ getArticle.updatedTime }}</span>
          </div>
          <div class="item mr-[0.3rem] flex items-center">
            <FaRegularListAlt class="w-[1rem] h-[1rem] mr-[0.2rem]" />
            <span>{{ getArticle.category }}</span>
            ｜
          </div>
          <div class="item mr-[0.3rem] flex items-center">
            <FaRegularBookmark class="w-[1rem] h-[1rem] mr-[0.2rem]" />
            <span>{{ getArticle.tage.join("、") }}</span>
            ｜
          </div>
          <div class="item mr-[0.3rem] flex items-center">
            <Fa6RegularThumbsUp class="w-[1rem] h-[1rem] mr-[0.2rem]" />
            <span>{{ getArticle.likes }}</span>
            ｜
          </div>
          <div class="item mr-[0.3rem] flex items-center">
            <Fa6RegularEye class="w-[1rem] h-[1rem] mr-[0.2rem]" />
            <span>{{ getArticle.views }}</span>
          </div>
        </div>
      </div>

      <div class="ma"></div>
    </div>
    <div class="other" v-else>
      <el-image :src="banner" class="banner" fix="cover" />
      <div class="content">
        <div class="title">
          {{ route.name }}
        </div>
      </div>
      <div class="mask"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FaRegularListAlt from "~icons/fa-regular/list-alt";
import FaRegularBookmark from "~icons/fa-regular/bookmark";
import Fa6RegularThumbsUp from "~icons/fa6-regular/thumbs-up";
import Fa6RegularEye from "~icons/fa6-regular/eye";
import Fa6RegularCalendarDays from "~icons/fa6-regular/calendar-days";
import Fa6RegularClock from "~icons/fa6-regular/clock";
import { useRoute } from 'vue-router';
import banner from '@/assets/images/banner.png';
import MingcuteDownFill from '~icons/mingcute/down-fill';
import useArticleStore from '../../store/article'
import { onMounted, ref } from 'vue';
import { debounce } from 'lodash';
import { storeToRefs } from 'pinia';
const route = useRoute();
const showScrollBottom = ref(true);

const articleStore = useArticleStore();
const { getArticle, } = storeToRefs(articleStore);

const scrollToBottom = () => {
  const homeElement = document.querySelector("#home");
  if (homeElement) {
    document.body.scrollTo({
      top: homeElement.clientHeight,
      behavior: "smooth",
    })
  }
}
const scrollListener = () => {
  if (document.body.scrollTop > 50) {
    showScrollBottom.value = false;
  } else {
    showScrollBottom.value = true;
  }
};

const initScrollEvent = () => {
  document.body.addEventListener("scroll", debounce(scrollListener, 100));
};

onMounted(() => {
  initScrollEvent();
});
</script>

<style lang="scss" scoped>
.page-header {
  width: 100%;

  .home {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .scroll-bottom {
      position: absolute;
      left: 50%;
      bottom: 0rem;
      transform: translateX(-50%);
      z-index: 2;
      color: white;

      .scroll-icon {
        cursor: pointer;
        animation: bounce 1.5s infinite;
      }
    }
  }

  .article {
    position: relative;
    width: 100%;
    height: 24rem;
    overflow: hidden;
  }

  .other {
    position: relative;
    width: 100%;
    height: 24rem;
    overflow: hidden;
  }

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 60%;
    z-index: 2;

    .title {
      font-size: 2rem;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }

    .saying {
      font-size: 1.4rem;
      color: #fff;
      text-align: center;
    }
  }
}

.banner {
  width: 100%;
  height: 100%;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    opacity: 1;
  }

  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    opacity: 0.5;
  }
}
</style>