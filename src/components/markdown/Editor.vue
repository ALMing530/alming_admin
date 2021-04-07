<template>
  <div id="editor"></div>
</template>
<script lang="ts">
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { defineComponent } from "vue";
import Editor from "@toast-ui/editor";

export default defineComponent({
  emits: ["onchange"],
  props: {
    text: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {
      editor: {} as Editor,
    };
  },
  methods: {
    initEditor(text: string) {
      this.editor = new Editor({
        el: document.querySelector("#editor") as HTMLElement,
        height: this.height,
        initialEditType: "markdown",
        previewStyle: "vertical",
        usageStatistics: false,
        hideModeSwitch: true,
        initialValue: text,
      });
      this.editor.on("change", () => {
        // this.$emit("update:modelValue",this.editor.getMarkdown())
        this.$emit(
          "onchange",
          this.editor.getMarkdown(),
          this.editor.getHtml()
        );
      });
    },
  },
  mounted() {
    this.initEditor(this.text)
  },
  watch: {
    text(n: string) {
      this.initEditor(n)
    },
  },
  unmounted() {
    this.editor.remove;
  },
});
</script>
