<template>
  <div class="main-header">
    <div class="f-render-header main-header-btns">
      <div>
        <template v-for="key of frender.operations">
          <!-- 根据 key 获取对应的 operationBtns 内容 -->
          <el-button
            :key="key"
            :icon="operationBtns[key].icon"
            @click="operationBtns[key].click"
            v-if="operationBtns[key]"
            type="text"
            >{{ operationBtns[key].label }}</el-button
          >
        </template>
      </div>
      <div v-if="frender.operations.includes('save')">
        <el-button @click="$emit('save')" icon="el-icon-upload2" type="text"
          >保存数据</el-button
        >
      </div>
    </div>

    <!-- 预览弹窗 -->
    <template v-for="key of frender.operations">
      <component
        :visible="operationBtns[key].visible"
        v-if="operationBtns[key] && operationBtns[key].isComponent !== false"
        :key="key"
        :is="`${key}-dialog`"
        @change="operationBtns[key].click"
      />
    </template>
  </div>
</template>

<script>
import PreviewDialog from "./components/preview-dialog";
import DataDialog from "./components/data-dialog";
import CodeDialog from "./components/code-dialog";
import BatchDialog from "./components/batch-dialog";

export default {
  inject: ["frender"],
  components: {
    PreviewDialog,
    DataDialog,
    CodeDialog,
    BatchDialog
  },
  data() {
    // 切换 visible
    const createToggleVisibleFn = key => {
      return () => {
        this.$set(
          this.operationBtns[key],
          "visible",
          !this.operationBtns[key].visible
        );
      };
    };
    return {
      // 左侧按钮列表
      operationBtns: {
        // 按钮的 key 和 frender 中 operationBtns 一一对应
        preview: {
          // 按钮的 icon
          icon: "el-icon-view",
          // 按钮的内容
          label: "预览",
          // 增加 visible: false
          visible: false,
          // 增加 click
          click: createToggleVisibleFn("preview")
        },
        data: {
          icon: "el-icon-edit",
          label: "更改数据",
          // 增加 visible: false
          visible: false,
          // 增加 click
          click: createToggleVisibleFn("data")
        },
        code: {
          icon: "el-icon-tickets",
          label: "生成代码",
          // 增加 visible: false
          visible: false,
          // 增加 click
          click: createToggleVisibleFn("code")
        },
        batch: {
          icon: "el-icon-plus",
          label: "批量添加",
          // 增加 visible: false
          visible: false,
          // 增加 click
          click: createToggleVisibleFn("batch")
        },
        clear: {
          icon: "el-icon-delete",
          label: "清空表单",
          // 不是组件
          isComponent: false,
          // 增加 click
          click: () => {
            // 将表单项置为空数组
            this.frender.formItemList = [];
            // 将表单属性置为原默认值
            this.frender.initFormPropsData();
          }
        }
      }
    };
  }
};
</script>

<style lang="css">
/* 按钮列表 */
.main-header-btns {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}

/* 代码编辑区 */
.f-render-code {
  background: #2d2d2d;
  color: #ccc;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
  height: 350px;
  margin-top: 20px;
  min-height: 350px;
}

/* 去除默认边框 */
.f-render-code .prism-editor__textarea:focus {
  outline: none;
}
</style>
