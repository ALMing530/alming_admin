<template>
  <div class="editor-body">
    <div class="toolbar">
      <el-row>
        <el-col :span="20">
          <input v-model="title" placeholder="输入标题" class="title-input" />
        </el-col>
        <el-col :span="4"
          ><el-button
            v-if="postId == ''"
            type="primary"
            size="small"
            @click="publish"
            >确认发布</el-button
          >
          <el-button
            v-if="postId != ''"
            type="primary"
            size="small"
            @click="update"
            >发布更新</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div class="markdown-editor">
      <markdown-editor :text="text" @onchange="onchange" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import MarkdownEditor from "@/components/markdown/Editor.vue";
import { post, get, put } from "@/util/request";
import { timeToStr } from "@/util/util";
import { Post } from "./types";
import { ElMessage } from "element-plus";

export default defineComponent({
  props: {
    postId: {
      type: String,
      default: "",
    },
  },
  components: {
    MarkdownEditor,
  },
  data() {
    return {
      text: "",
      oringin: "",
      format: "",
      title: "",
      currentPost: {} as Post,
    };
  },
  methods: {
    onchange(markdonw: string, html: string) {
      this.oringin = markdonw;
      this.format = html;
    },
    publish() {
      post("/post", {
        title: this.title,
        oringin: this.oringin,
        format: this.format,
      });
    },
    update() {
      this.currentPost.oringin = this.oringin;
      this.currentPost.format = this.format;
      this.currentPost.title = this.title
      put("/post", this.currentPost).then(res=>{
        if(res.status==200){
          ElMessage({
            type:"success",
            message:"更新完成"
          })
        }
      });
    },
    initPost() {
      get("/post/" + this.postId).then((res) => {
        this.currentPost = res.data;
        this.title = res.data.title;
        this.text = res.data.oringin
      });
    },
  },
  mounted() {
    this.title = "TITLE:" + timeToStr(new Date(), "yyyy-MM-dd hh:mm:ss");
    console.log(this.postId);
    if (this.postId != "") {
      this.initPost();
    }
  },
});
</script>
<style scoped>
#editor {
  text-align: left;
}
.editor-body {
  height: 100%;
}
.toolbar {
  text-align: right;
  padding: 3px;
}
.markdown-editor {
  height: calc(100% - 38px);
}
.title-input {
  height: 30px;
  border: none;
  outline: none;
  width: 100%;
  padding-left: 25px;
  font-size: 16px;
  font-weight: bold;
  color: rgb(194, 194, 194);
}
.title-input:focus {
  border: none;
  border-bottom: 1px solid rgb(189, 189, 189);
}
</style>