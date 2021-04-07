<template>
  <div class="word">
    <div class="add-container">
      <el-button type="primary" size="small" @click="addDialog = true"
        >添加单词</el-button
      >
    </div>
    <el-table :data="words" style="width: 100%">
      <el-table-column prop="en" label="英文单词" width="240">
      </el-table-column>
      <el-table-column prop="cn" label="翻译"> </el-table-column>
      <el-table-column prop="familiar" width="100" label="熟悉程度">
      </el-table-column>
      <el-table-column width="200" label="操作">
        <template #default="scope">
          <!-- <el-button size="mini" @click="editWord(scope.row)">编辑</el-button> -->
          <el-button size="mini" type="danger" @click="delWord(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" v-model="addDialog" width="45%">
      <el-input size="small" v-model="word" @input="wordInput"></el-input>
      <div class="trans-container">
        <el-divider v-if="trans == null ? false : trans.length > 0"
          >待选项目</el-divider
        >
        <p
          class="trans"
          v-for="item in trans"
          :key="item"
          @click="select(item)"
        >
          {{ item }}
        </p>
        <el-divider v-if="selected == null ? false : selected.length > 0"
          >已选项目</el-divider
        >
        <p
          class="trans"
          v-for="item in selected"
          :key="item"
          @click="unSelect(item)"
        >
          {{ item }}
        </p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { get, post, del } from "@/util/request";
import { Word } from "./types";
import { debounce, ArrayUtil } from "@/util/util";

export default defineComponent({
  data() {
    return {
      addDialog: false,
      word: "",
      trans: [] as string[],
      selected: [] as string[],
    };
  },
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
  methods: {
    wordInput() {
      debounce(() => {
        get("/translate/" + this.word).then((res) => {
          this.trans = res.data;
        });
      }, 800);
    },
    select(item: string) {
      ArrayUtil.pushUnique(this.selected, item);
      ArrayUtil.deleteElement(this.trans, item);
    },
    unSelect(item: string) {
      ArrayUtil.deleteElement(this.selected, item);
      ArrayUtil.pushUnique(this.trans, item);
    },
    confirm() {
      this.addDialog = false;
      post("/word", {
        en: this.word,
        cn: this.selected.join(";"),
        familiar: 0,
      }).then((res) => {
        if (res.status == 200) {
          this.getWords();
        }
      });
    },
    delWord(item: Word) {
      del("/word/" + item.id).then((res) => {
        if (res.status == 200) {
          this.getWords();
        }
      });
    },
  },
  mounted() {
    this.getWords();
  },
});
</script>
<style scoped>
.add-container {
  text-align: left;
  padding: 5px;
}
.trans-container {
  padding: 0px 5px 0px 5px;
}
.trans {
  width: 100%;
  height: 35px;
  line-height: 35px;
  margin: 3px 0px 3px 0px;
  padding: 0px 5px 0px 5px;
  border-radius: 5px;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.trans:hover {
  background-color: rgb(240, 240, 240);
}
</style>