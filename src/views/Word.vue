<template>
  <!-- <div>{{ words }}</div> -->
  <el-table :data="words" style="width: 100%">
    <el-table-column prop="en" label="英文单词" width="240">
    </el-table-column>
    <el-table-column prop="cn" label="翻译" >
    </el-table-column>
    <el-table-column prop="familiar" width="100" label="熟悉程度">
    </el-table-column>
    <el-table-column width="200" label="操作">
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
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { get } from "@/util/request";
import { Word } from "./types";
export default defineComponent({
  setup() {
    const words = ref<Word>();
    const getWords = () => {
      get("/words").then((res) => {
        words.value = res.data;
      });
    };
    return {
      words,
      getWords,
    };
  },
  mounted() {
    this.getWords();
  },
});
</script>
