<template>
  <el-card>
    <div class="max-w-[880px] p-[40px]">
      <el-timeline style="max-width: 600px">
        <el-timeline-item
          center
          v-for="(activity, index) in activities"
          :key="activity.id"
        >
          <div class="item items-center flex">
            <div class="cover w-[6rem] h-[6rem] overflow-hidden">
              <el-image
                class="w-[100%] h-[100%] duration-300 hover:scale-110"
                fit="cover"
                :src="banner"
              ></el-image>
            </div>
            <div class="info ml-[10px]">
              <div class="title text-xl">{{ activity.title }}</div>
              <div class="title">{{ activity.createTime }}</div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-card>
  <div class="flex justify-center items-center mt-[0.3rem]">
    <el-pagination
      v-model:current-page="params.currentPage"
      v-model:page-size="params.pageSize"
      layout="prev, pager, next"
      :total="activities.length"
      @change="getArchive"
    />
  </div>
</template>

<script setup lang="ts">
import banner from "@/assets/images/banner.png";
import { reactive } from "vue";

const activities = [
  {
    id: 1,
    title: "Custom icon",
    createTime: "2018-04-12 20:46",
    size: "large",
    type: "primary",
  },
  {
    id: 2,
    title: "Custom color",
    createTime: "2018-04-03 20:46",
    color: "#0bbd87",
  },
  {
    id: 3,
    title: "Custom size",
    createTime: "2018-04-03 20:46",
    size: "large",
  },
  {
    id: 4,
    title: "Custom hollow",
    createTime: "2018-04-03 20:46",
    type: "primary",
    hollow: true,
  },
  {
    id: 5,
    title: "Default node",
    createTime: "2018-04-03 20:46",
  },
];
const params = reactive({
  currentPage: 1,
  pageSize: 5,
});
const getArchive = () => {};
</script>

<style lang="scss" scoped></style>
