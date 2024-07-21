<template>
  <div class="w-[100vw] flex justify-center">
    <el-card>
      <div class="p-[40px]">
        <div class="talk-item mb-[2rem] pb-[2rem] flex border-b" v-for="talk in talkList" :key="talk.id">
          <div class="left mr-[1rem]">
            <el-avatar shape="square" :size="64">{{ talk.nick_name }}</el-avatar>
          </div>
          <div class="rigth flex flex-col items-start">
            <div class="nick-name text-xl mb-[1.8rem]">{{ talk.nick_name }}</div>
            <div class="content mb-[1rem]">{{ talk.content }}</div>
            <div v-if="talk.imageList.length > 1" class="image grid grid-cols-3 gap-1">
              <div class="image w-[100px] h-[100px] overflow-hidden" v-for="url in talk.imageList">
                <BlogImage :src="url" />
              </div>
            </div>
            <div v-else class="image grid grid-cols-3 gap-1">
              <div class="image w-[308px] h-[308px] overflow-hidden" v-for="url in talk.imageList">

                <BlogImage :src="url" />
              </div>
            </div>
          </div>
        </div>
        <div class="observer text-center">
          {{ loadMore ? '下拉加载更多' : '已经没有啦' }}
        </div>
      </div>

    </el-card>
  </div>

</template>

<script setup lang="ts">
import banner from '@/assets/images/banner.png';
import { onMounted, reactive, ref, nextTick, onBeforeUnmount } from 'vue';
import BlogImage from '@/components/blog-image/index.vue'
type TalkList = {
  id: number;
  user_id: number;
  nick_name: string;
  content: string;
  imageList: string[];
}
const staticTalkList: TalkList[] = [
  {
    id: 1,
    user_id: 1,
    nick_name: 'Like',
    content: '我受不了啦！',
    imageList: [banner, banner, banner, banner]
  },
  {
    id: 2,
    user_id: 1,
    nick_name: 'Like',
    content: '我受不了啦！',
    imageList: [banner, banner, banner, banner],
  },
  {
    id: 3,
    user_id: 1,
    nick_name: 'Like',
    content: '我受不了啦！',
    imageList: [banner, banner, banner, banner],
  },
  {
    id: 4,
    user_id: 1,
    nick_name: 'Like',
    content: '我受不了啦！',
    imageList: [banner, banner, banner, banner],
  },
  {
    id: 5,
    user_id: 1,
    nick_name: 'Like',
    content: '我受不了啦！',
    imageList: [banner]
  },
  {
    id: 6,
    user_id: 1,
    nick_name: 'Like',
    content: '我受不了啦！',
    imageList: [banner]
  },
  {
    id: 7,
    user_id: 1,
    nick_name: 'Like',
    content: '我受不了啦！',
    imageList: [banner, banner, banner, banner],
  },
]
const loadMore = ref(true)
let obserDom: Element | null = null
let observer: any = null
const talkList = ref<TalkList[]>([])
const params = reactive({
  currentPage: 1,
  pageSize: 5,
})
const getTalkList = () => {
  // 分到第几条了
  let current = (params.currentPage - 1) * params.pageSize

  // 取出第几条到第几条的数据
  const sliceList = staticTalkList.slice(current, current + params.pageSize)
  talkList.value = params.currentPage === 1 ? sliceList : [...talkList.value, ...sliceList]
  if (talkList.value.length === staticTalkList.length) {
    loadMore.value = false
  }
}
const initTalk = () => {
  getTalkList()
  nextTick(() => {
    observerTalk()
  })
}
onMounted(() => {
  initTalk()
})
onBeforeUnmount(() => {
  observer && observer.unobserve(obserDom)
})
const observerTalk = () => {
  obserDom = document.querySelector('.observer')
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        params.currentPage++
        getTalkList()
      }
    })
  })
  observer && observer.observe(obserDom as Element)
}

</script>

<style lang="scss" scoped></style>