<template>
  <div>
    article
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import useArticle from "../../store/article"
import banner from '@/assets/images/banner.png';
const articleDetail = {
  id: 1,
  title: "博客部署教程",
  desc: "博客部署，记录一下",
  cover: banner,
  createdTime: "2024-06-29 15:52:39",
  updatedTime: "2024-06-29 15:52:39",
  views: "1w",
  likes: "100",
  tage: ["教程", "部署"],
  category: "博客部署"
}
const articleStore = useArticle();
const article = ref();
onMounted(() => {
  article.value = articleDetail;
  articleStore.setArticle(article.value)
})
</script>

<style lang="scss" scoped></style>