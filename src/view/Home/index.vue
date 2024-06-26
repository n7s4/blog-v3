<template>
  <div class="h-[200vh]">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card shadow="always" class="mb-[1.2rem]">
          <div class="article-item w-[100%] md:h-[18rem] 24rem flex md:flex-row flex-col overflow-hidden">
            <div class="article-cover md:w-[45%] md:h-[100%] w-[100%] h-[50%] overflow-hidden">
              <el-image :src="banner" class="hover:scale-125 duration-300 h-[100%] w-[100%]" fix="cover"></el-image>
            </div>
            <div class="article-content md:w-[55%] md:h-[100%] w-[100%] h-[50%] p-[1.2rem] flex flex-col justify-center">
              <div class="title text-3xl mb-5">博客部署教程</div>
              <div class="info text-sm mb-3 flex flex-wrap items-center p-[1.2rem]">
                <div class="item mr-[0.3rem] flex items-center">
                  <Fa6RegularCalendarDays class="w-[1rem] h-[1rem] mr-[0.2rem]" />
                  <span>发表于2024-04-17 18:34:11 {{ }}</span>
                </div>
                <div class="item mr-[0.3rem] flex items-center">
                  <Fa6RegularClock class="w-[1rem] h-[1rem] mr-[0.2rem]" />
                  <span>更新于2024-04-17 18:34:11{{ }}</span>
                </div>
                <div class="item mr-[0.3rem] flex items-center">
                  <FaRegularListAlt class="w-[1rem] h-[1rem] mr-[0.2rem]" />
                  <span>博客部署{{ }}</span>
                  ｜
                </div>
                <div class="item mr-[0.3rem] flex items-center">
                  <FaRegularBookmark class="w-[1rem] h-[1rem] mr-[0.2rem]" />
                  <span>Vue{{ }}</span>
                  ｜
                </div>
                <div class="item mr-[0.3rem] flex items-center">
                  <Fa6RegularThumbsUp class="w-[1rem] h-[1rem] mr-[0.2rem]" />
                  <span>1w{{ }}</span>
                  ｜
                </div>
                <div class="item mr-[0.3rem] flex items-center">
                  <Fa6RegularEye class="w-[1rem] h-[1rem] mr-[0.2rem]" />
                  <span>1w{{ }}</span>
                </div>
              </div>
              <div class="desc text-xl w-[100%] text-ellipsis overflow-hidden whitespace-nowrap">
                博客部署教程博客部署教程博客部署教程博客部署教程</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="2">right</el-col>
    </el-row>
  </div>
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

import Fa6RegularBell from "~icons/fa6-regular/bell";
import Fa6RegularChartBar from "~icons/fa6-regular/chart-bar";
</script>

<style lang="scss" scoped>
</style>