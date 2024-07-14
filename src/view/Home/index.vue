<template>
  <el-row :gutter="20">
    <el-col :sm="18" :xs="24">
      <el-card v-for="article in articleList" :key="article.id" shadow="always" class="mb-[1.2rem]">
        <div class="article-item w-[100%] md:h-[18rem] 24rem flex md:flex-row flex-col overflow-hidden">
          <div class="article-cover md:w-[45%] md:h-[100%] w-[100%] h-[50%] overflow-hidden">
            <el-image @click="gotoArticle(article.id)" :src="article.cover" class="hover:scale-125 duration-300 h-[100%] w-[100%]"
              fix="cover"></el-image>
          </div>
          <div class="article-content md:w-[55%] md:h-[100%] w-[100%] h-[50%] p-[1.2rem] flex flex-col justify-center">
            <div @click="gotoArticle(article.id)" class="title text-3xl mb-5">{{ article.title }}</div>
            <div class="info text-sm mb-3 flex flex-wrap items-center p-[1.2rem]">
              <div class="item mr-[0.3rem] flex items-center">
                <Fa6RegularCalendarDays class="w-[1rem] h-[1rem] mr-[0.2rem]" />
                <span>发表于{{ article.createdTime }}</span>
              </div>
              <div class="item mr-[0.3rem] flex items-center">
                <Fa6RegularClock class="w-[1rem] h-[1rem] mr-[0.2rem]" />
                <span>更新于{{ article.updatedTime }}</span>
              </div>
              <div class="item mr-[0.3rem] flex items-center">
                <FaRegularListAlt class="w-[1rem] h-[1rem] mr-[0.2rem]" />
                <span>{{ article.category }}</span>
                ｜
              </div>
              <div class="item mr-[0.3rem] flex items-center">
                <FaRegularBookmark class="w-[1rem] h-[1rem] mr-[0.2rem]" />
                <span>{{ article.tage.join("、") }}</span>
                ｜
              </div>
              <div class="item mr-[0.3rem] flex items-center">
                <Fa6RegularThumbsUp class="w-[1rem] h-[1rem] mr-[0.2rem]" />
                <span>{{ article.likes }}</span>
                ｜
              </div>
              <div class="item mr-[0.3rem] flex items-center">
                <Fa6RegularEye class="w-[1rem] h-[1rem] mr-[0.2rem]" />
                <span>{{ article.views }}</span>
              </div>
            </div>
            <div class="desc text-xl w-[100%] text-ellipsis overflow-hidden whitespace-nowrap">
              {{ article.desc }}
            </div>
          </div>
        </div>
      </el-card>
      <div class="flex justify-center items-center">
        <el-pagination v-model:current-page="params.currentPage" v-model:page-size="params.pageSize"
          layout="prev, pager, next" :total="staticArticleList.length" @change="getArticleList" />
      </div>
    </el-col>
    <el-col :sm="6" :xs="24">
      <el-card class="mb-[1.2rme]">
        <div class="banner w-[100%] h-[8rem]">
          <el-image class="w-[100%] h-[100%]" fix="cover" :src="banner" />
        </div>
        <div class="info-box flex mb-[0.5rem] items-center p-[5px]">
          <el-avatar class="mr-[5px]" :size="48">L</el-avatar>
          <div>我快要死了</div>
        </div>
        <div class="saying p-[5px]">
          为什么我找不到一个好工作啊
        </div>
        <div class="flex justify-around items-center p-[0.8rem]">
          <div class="item">
            <div class="title text-center">文章</div>
            <div class="value text-center">20</div>
          </div>
          <div class="item">
            <div class="title text-center">分类</div>
            <div class="value text-center">20</div>
          </div>
          <div class="item">
            <div class="title text-center">标签</div>
            <div class="value text-center">20</div>
          </div>
        </div>
        <div class="flex justify-around items-center px-[2rem] py-[1rem]">
          <SimpleIconsTencentqq class="w-[1.8rem] h-[1.8rem]" />
          <SimpleIconsWechat class="w-[1.8rem] h-[1.8rem]" />
          <SimpleIconsBilibili class="w-[1.8rem] h-[1.8rem]" />
          <SimpleIconsGithub class="w-[1.8rem] h-[1.8rem]" />
        </div>
      </el-card>
      <el-card class="mt-[1rem]">
        <template #header>
          <div class="flex items-center">
            <PhBellDuotone class="w-[2rem] h-[2rem] mr-[0.5rem]" />
            <div class="text-xl font-bold">
              公告
            </div>
          </div>
        </template>
        <div class="p-[1rem]">你好，我一点都不好</div>
      </el-card>
      <el-affix :offset="60" style="width: inherit">
        <el-card class="mt-[1rem]">
        <template #header>
          <div class="flex items-center">
            <IconParkTag class="w-[2rem] h-[2rem] mr-[0.5rem]" />
            <div class="text-xl font-bold">
              标签
            </div>
          </div>
        </template>
        <div class="flex flex-wrap items-center p-[1rem]">
          <div class=" bg-neutral-300 px-[0.3rem] py-[0.1rem] mr-[0.3rem] mb-[0.3rem] rounded-md" v-for="tag in tagList" :key="tag">
            {{ tag }}
          </div>
        </div>
      </el-card>
      <el-card class="mt-[1rem]">
        <template #header>
          <div class="flex items-center">
            <Fa6RegularChartBar class="w-[2rem] h-[2rem] mr-[0.5rem]" />
            <div class="text-xl font-bold">
              网站咨询
            </div>
          </div>
        </template>
        <div class="p-[1rem] flex flex-col justify-center items-center">
          <div class="item flex justify-between  items-center w-[100%]">
            <div class="title text-md">文章数目</div>
            <div class="title text-md">20</div>
          </div>
          <div class="item flex justify-between  items-center w-[100%]">
            <div class="title text-md">运行时间</div>
            <div class="title text-md">20</div>
          </div>
          <div class="item flex justify-between  items-center w-[100%]">
            <div class="title text-md">博客访问次数</div>
            <div class="title text-md">20</div>
          </div>
        </div>
      </el-card>
      </el-affix>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import banner from '@/assets/images/banner.png';
import FaRegularListAlt from "~icons/fa-regular/list-alt";
import FaRegularBookmark from "~icons/fa-regular/bookmark";
import Fa6RegularThumbsUp from "~icons/fa6-regular/thumbs-up";
import Fa6RegularEye from "~icons/fa6-regular/eye";
import Fa6RegularCalendarDays from "~icons/fa6-regular/calendar-days";
import Fa6RegularClock from "~icons/fa6-regular/clock";
import SimpleIconsTencentqq from "~icons/simple-icons/tencentqq";
import SimpleIconsWechat from "~icons/simple-icons/wechat";
import SimpleIconsBilibili from "~icons/simple-icons/bilibili";
import SimpleIconsGithub from "~icons/simple-icons/github";
import PhBellDuotone from '~icons/ph/bell-duotone';
import Fa6RegularChartBar from "~icons/fa6-regular/chart-bar";
import IconParkTag from '~icons/icon-park/tag';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import ArticleList from '../../store/article/types';

const router = useRouter();
const articleList = ref<ArticleList[]>([]);
const staticArticleList: ArticleList[] = [
  {
    id: 1,
    title: "博客部署教程——宝塔面板",
    desc: "博客部署，记录一下",
    cover: banner,
    createdTime: "2024-06-29 15:52:39",
    updatedTime: "2024-06-29 15:52:39",
    views: "1w",
    likes: "100",
    tage: ["教程", "部署"],
    category: "博客部署",
    readDuration: undefined
  },
  {
    id: 2,
    title: "博客部署教程——宝塔面板",
    desc: "博客部署，记录一下",
    cover: banner,
    createdTime: "2024-06-29 15:52:39",
    updatedTime: "2024-06-29 15:52:39",
    views: "1w",
    likes: "100",
    tage: ["教程", "部署"],
    category: "博客部署",
    readDuration: undefined
  },
  {
    id: 3,
    title: "博客部署教程——宝塔面板",
    desc: "博客部署，记录一下",
    cover: banner,
    createdTime: "2024-06-29 15:52:39",
    updatedTime: "2024-06-29 15:52:39",
    views: "1w",
    likes: "100",
    tage: ["教程", "部署"],
    category: "博客部署",
    readDuration: undefined
  },
  {
    id: 4,
    title: "博客部署教程——宝塔面板",
    desc: "博客部署，记录一下",
    cover: banner,
    createdTime: "2024-06-29 15:52:39",
    updatedTime: "2024-06-29 15:52:39",
    views: "1w",
    likes: "100",
    tage: ["教程", "部署"],
    category: "博客部署",
    readDuration: undefined
  },
  {
    id: 5,
    title: "博客部署教程——宝塔面板",
    desc: "博客部署，记录一下",
    cover: banner,
    createdTime: "2024-06-29 15:52:39",
    updatedTime: "2024-06-29 15:52:39",
    views: "1w",
    likes: "100",
    tage: ["教程", "部署"],
    category: "博客部署",
    readDuration: undefined
  },
  {
    id: 6,
    title: "博客部署教程——宝塔面板",
    desc: "博客部署，记录一下",
    cover: banner,
    createdTime: "2024-06-29 15:52:39",
    updatedTime: "2024-06-29 15:52:39",
    views: "1w",
    likes: "100",
    tage: ["教程", "部署"],
    category: "博客部署",
    readDuration: undefined
  },
];
const params = reactive({
  currentPage: 1,
  pageSize: 5,
})
const tagList = ['Vue', 'React', 'Ts', 'Node', "pnpm", 'Css']
const getArticleList = () => {
  let current = (params.currentPage - 1) * params.pageSize;
  articleList.value = staticArticleList.slice(current, current + params.pageSize);
}
const gotoArticle = (id: number) => {
  if(!id) return
  router.push({ path: '/article', query: {id}});
}
onMounted(() => {
  getArticleList();
})
</script>

<style lang="scss" scoped></style>