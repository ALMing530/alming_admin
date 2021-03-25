<template>
  <div>
    <div class="add-container">
      <el-row>
        <el-col :span="4"
          ><el-button type="primary" size="mini">直接编写</el-button></el-col
        >
        <el-col :span="20">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="http://localhost:53000/post"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :before-upload="beforUpload"
            :file-list="fileList"
            name="post"
            :data="title"
            :auto-upload="false"
          >
            <template #trigger>
              <el-button size="small" type="primary">选取文件</el-button>
            </template>
            <label
              for="title"
              style="margin-left: 5px; font-size: 16px; vertical-align: middle"
              >文章标题:</label
            >
            <el-input
              name="title"
              size="mini"
              style="width: 50%; margin-left: 5px"
              v-model="title.title"
            ></el-input>
            <el-button
              type="success"
              style="margin-left: 15px"
              size="mini"
              @click="upload"
              >确认上传</el-button
            >
            <template #tip>
              <div class="el-upload__tip">只能上传 Markdown 文件.</div>
            </template>
          </el-upload>
        </el-col>
      </el-row>
    </div>
    <el-table :data="posts" style="width: 100%">
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="postType" label="文章类型" width="200">
        <template #default="scope">
          <span>{{
            scope.row.postType == 0 ? "Markdown上传" : "网页编写"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        :formatter="formatter"
        width="200"
      >
      </el-table-column>
      <el-table-column width="150" label="操作">
        <template #default="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
          <el-button
            v-if="scope.row.postType == 1"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
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
import{del} from "@/util/request"
import { ElMessage } from "element-plus";

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
  data() {
    return {
      title: {
        title: "",
      },
    };
  },
  methods: {
    beforUpload(file: File): boolean {
      const fileSplit = file.name.split(".");
      if ("md" != fileSplit[fileSplit.length - 1]) {
        ElMessage({
          message: "您必须上传Markdown文件",
          type: "warning",
        });
        return false;
      }
      return true;
    },
    upload() {
      (this.$refs.upload as HTMLFormElement).submit();
    },
    handleDelete(item: Post){
      del("/post/"+item.id).then(res=>{
        console.log(res)
      })
    }
  },
  mounted() {
    this.getPosts();
  },
});
</script>
<style scoped>
.add-container {
  text-align: left;
  padding: 10px;
}
</style>