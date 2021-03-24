<template>
  <div>
    <el-table :data="posts" style="width: 100%">
      <el-table-column prop="title" label="标题" width="240">
      </el-table-column>
      <el-table-column prop="postType" label="文章类型" width="180">
        <template #default="scope">
          <span>{{scope.row.postType==0?'Markdown上传':'网页编写'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" :formatter="formatter">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Post } from "./types";
import { get } from "@/util/request";

export default defineComponent({
  setup() {
    const posts = ref<Post>();
    const getPosts = () => {
      get("posts").then((res) => {
        posts.value = res.data;
      });
    };
    return {
      posts,
      getPosts,
    };
  },
  mounted() {
    this.getPosts();
  },
});
</script>
