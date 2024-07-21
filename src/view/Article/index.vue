<template>
  <el-row :gutter="20">
    <el-col :sm="18" :xs="24">
      <el-card>
        <MdPreview :theme="getIsDark ? 'dark' : 'light'" :editorId="id" :modelValue="text" />
        <div class="copyright-info p-[20px] border-t  border-slate-100">
          <div class="w-[100%] p-[10px]">
            <div class="item flex items-center w-[100%]">
              <div class="label">文章作者</div>
              <div class="value">
                Like
              </div>
            </div>
            <div class="item flex items-center w-[100%]">
              <div class="label">类型</div>
              <div class="value">
                <a href="" class="underline">原创</a>
              </div>
            </div>
            <div class="item flex items-center w-[100%]">
              <div class="label">本文链接</div>
              <div class="value">
                <a href="" class="underline">www.baidu.com</a>
              </div>
            </div>
            <div class="item flex items-center w-[100%]">
              <div class="label">声明</div>
              <div class="value">
                此文章版权归Like所有
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :sm="6" :xs="0">
      <el-affix :offset="60">
        <el-card>
          <div class="w-[100%] max-h-[60vh] py-[.5rem]">
            <MdCatalog :scroll-element-offset-top="80" :offsetTop="80" :editorId="id" :scrollElement="scrollElement" />
          </div>
        </el-card>
      </el-affix>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import useArticle from "../../store/article"
import banner from '@/assets/images/banner.png';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import userStore from '../../store/user'
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';
import { storeToRefs } from "pinia";
const { getIsDark } = storeToRefs(userStore())
const id = 'preview-only';
const text = ref('# Hello Editor');
const scrollElement = document.documentElement;
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
  category: "博客部署",
  readDuration: '21小时'
}
const articleStore = useArticle();
const article = ref();
onMounted(() => {
  article.value = articleDetail;
  articleStore.setArticle(article.value)
})
</script>

<style lang="scss" scoped>
.label {
  position: relative;
  margin-right: 0.5rem;
}

.label::before {
  content: ':';
  position: absolute;
  top: 0;
  right: -0.3rem;
}
</style>