<template>
  <el-menu
    default-active="1-4-1"
    class="nav-menu"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/word/index">
      <i class="el-icon-notebook-2"></i>
      <template #title>
        <span>单词管理</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/post/index">
      <i class="el-icon-postcard"></i>
      <template #title>文章管理</template>
    </el-menu-item>
    <el-menu-item index="/sys/index">
      <i class="el-icon-cpu"></i>
      <template #title>性能监控</template>
    </el-menu-item>
  </el-menu>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isCollapse: Boolean,
  },
  methods: {
  },
});
</script>
<style scoped>
.el-menu{
  width: 100%;
}
</style>