<template>
  <div class="app-main-header">
    <!-- 顶部按钮 -->
    <el-button @click="isPreview = true" icon="el-icon-view" type="text"
      >预览</el-button
    >
    <el-button
      @click="isShowExportData = true"
      icon="el-icon-upload2"
      type="text"
      >生成数据</el-button
    >
    <el-button @click="isShowHtmlCode = true" icon="el-icon-tickets" type="text"
      >生成代码</el-button
    >
    <el-button
      @click="isShowImportDialog = true"
      icon="el-icon-download"
      type="text"
      >导入数据</el-button
    >
    <el-button @click="isShowBatchDialog = true" icon="el-icon-plus" type="text"
      >批量添加</el-button
    >
    <el-button @click="clearForm" icon="el-icon-delete" type="text"
      >清空表单</el-button
    >
    <!-- 预览弹窗 -->
    <preview-dialog
      :formDesc="formDesc"
      :formAttr="filterFormAttr"
      :visible.sync="isPreview"
    />

    <!-- 导入数据弹框 -->
    <import-dialog :visible.sync="isShowImportDialog" />

    <!-- 导出数据弹框 -->
    <export-dialog
      :formDesc="formDesc"
      :formAttr="filterFormAttr"
      :visible.sync="isShowExportData"
    />

    <!-- 生成代码弹框 -->
    <html-dialog
      :formDesc="formDesc"
      :formAttr="filterFormAttr"
      :visible.sync="isShowHtmlCode"
    />

    <!-- 批量添加 -->
    <batch-dialog :visible.sync="isShowBatchDialog"></batch-dialog>
  </div>
</template>

<script lang="ts">
import _ from "lodash-es";
import store from "@/store";
import configList from "@/config";
import { filterObjByDefault } from "@/helpers/utils";
import htmlDialog from "./components/htmlDialog.vue";
import batchDialog from "./components/batchDialog.vue";
import importDialog from "./components/importDialog.vue";
import exportDialog from "./components/exportDialog.vue";
import previewDialog from "./components/previewDialog.vue";
import { createComponent, toRefs, computed } from "@vue/composition-api";
import { FormDescListItem } from "@/types/formList";

export default createComponent({
  name: "AppMainHeader",
  components: {
    batchDialog,
    importDialog,
    previewDialog,
    exportDialog,
    htmlDialog
  },
  setup() {
    const { formDesc: originFormDesc, filterFormAttr } = toRefs(store.getters);

    // 处理数据, 主要是删除默认值和对值进行 formatter
    const processData = (
      obj: AnyObj,
      defaultObj: AnyObj = {},
      assistProperty: string[] = [],
      formatterObj: AnyObj = {}
    ): AnyObj => {
      // 删除默认值
      obj = filterObjByDefault(obj, defaultObj);
      // 无值的 & 辅助属性 & 私有属性
      const isShouldDelete = (val: any, key: string) =>
        _.isNil(val) || assistProperty.includes(key) || key.startsWith("_");
      obj = _.omitBy(_.cloneDeep(obj), isShouldDelete);

      // 对数据做自定义处理
      const formatterValue = (val: any, key: string) =>
        formatterObj[key]?.valueFormatter
          ? formatterObj[key].valueFormatter(val)
          : val;
      obj = _.mapValues(obj, formatterValue);

      return obj;
    };

    const formDesc = computed(() => {
      // 对formDesc每一项进一步处理:
      // 1.删除无用属性 2.自定义formatter函数
      return _.mapValues(_.cloneDeep(originFormDesc.value), (formItem: any) => {
        const { commonDefaultData, attrsDefaultData, assistProperty, attrs } =
          configList[formItem.type as string] || {};

        formItem = processData(formItem, commonDefaultData as FormDescListItem);

        // 组件自身属性
        if (formItem.attrs) {
          formItem.attrs = processData(
            formItem.attrs,
            attrsDefaultData,
            assistProperty,
            attrs
          );
        }
        if (_.isEmpty(formItem.attrs)) {
          delete formItem.attrs;
        }

        return formItem;
      });
    });

    return {
      formDesc,
      filterFormAttr,
      clearForm: () => store.commit("clearForm"),
      isShowExportData: false,
      isShowHtmlCode: false,
      isPreview: false,
      isShowBatchDialog: false,
      isShowImportDialog: false
    };
  }
});
</script>

<style lang="scss">
.app-main-header {
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  border-bottom: 1px solid #ebeef5;
}
</style>
