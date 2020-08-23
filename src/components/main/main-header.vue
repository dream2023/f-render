<template>
  <div class="main-header">
    <div class="main-header-btns">
      <div>
        <el-button
          v-for="item of operations"
          :key="item.key"
          :icon="item.icon"
          @click="item.click"
          type="text"
          >{{ item.label }}</el-button
        >
      </div>
      <div>
        <el-button @click="$emit('save')" icon="el-icon-upload2" type="text"
          >保存数据</el-button
        >
      </div>
    </div>

    <!-- 预览弹窗 -->
    <template v-for="item of operations">
      <component
        v-if="item.isComponent !== false"
        :visible="operatekeys[item.key]"
        :key="item.key"
        :is="`${item.key}-dialog`"
        @change="changeVisible($event, item.key)"
      />
    </template>
  </div>
</template>

<script>
import PreviewDialog from "./components/preview-dialog";
import DataDialog from "./components/data-dialog";
import CodeDialog from "./components/code-dialog";
import BatchDialog from "./components/batch-dialog";

// 各个弹窗都会用到的代码高亮 css
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "vue-prism-editor/dist/prismeditor.min.css";
import "prismjs/themes/prism-tomorrow.css";

export default {
  inject: ["frender"],
  components: {
    PreviewDialog,
    DataDialog,
    CodeDialog,
    BatchDialog
  },
  data() {
    return {
      operatekeys: []
    };
  },
  computed: {
    operations() {
      return [
        {
          key: "preview",
          icon: "el-icon-view",
          label: "预览"
        },
        {
          key: "data",
          icon: "el-icon-edit",
          label: "更改数据"
        },
        {
          key: "code",
          icon: "el-icon-tickets",
          label: "生成代码"
        },
        {
          key: "batch",
          icon: "el-icon-plus",
          label: "批量添加"
        },
        {
          key: "clear",
          isComponent: false,
          click: () => {
            this.frender.updateFormItemList([]);
          },
          icon: "el-icon-delete",
          label: "清空表单"
        }
      ]
        .filter(item => this.operatekeys[item.key] !== undefined)
        .map(this.toggleVisible);
    }
  },
  methods: {
    toggleVisible(item) {
      if (!item.click) {
        item.click = () => {
          this.$set(this.operatekeys, item.key, !this.operatekeys[item.key]);
        };
      }
      return item;
    },
    changeVisible(val, key) {
      this.operatekeys[key] = val;
    }
  },
  mounted() {
    this.operatekeys = this.frender.operations.reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
  }
};
</script>

<style lang="scss">
.main-header-btns {
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  padding: 0 15px;
  border-bottom: 1px solid #ebeef5;
}
</style>

<style lang="scss">
.f-render-code {
  background: #2d2d2d;
  color: #ccc;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
  height: 350px;
  min-height: 350px;

  .prism-editor__textarea:focus {
    outline: none;
  }
}
</style>
