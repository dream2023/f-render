<template>
  <div class="app-main-header">
    <div class="app-main-header-buttons">
      <div>
        <!-- 顶部按钮 -->
        <el-button @click="isPreview = true" icon="el-icon-view" type="text"
          >预览</el-button
        >
        <el-button
          @click="handleSaveData"
          icon="el-icon-upload"
          type="text"
          v-if="saveType === 'remote'"
          >保存到服务器</el-button
        >
        <el-button
          @click="isShowExportData = true"
          icon="el-icon-upload2"
          type="text"
          >生成数据</el-button
        >
        <el-button
          @click="isShowHtmlCode = true"
          icon="el-icon-tickets"
          type="text"
          >生成代码</el-button
        >
        <el-button
          @click="isShowImportDialog = true"
          icon="el-icon-download"
          type="text"
          >导入数据</el-button
        >
        <el-button
          @click="isShowBatchDialog = true"
          icon="el-icon-plus"
          type="text"
          >批量添加</el-button
        >
        <el-button @click="clearForm" icon="el-icon-delete" type="text"
          >清空表单</el-button
        >
      </div>
      <div>
        <el-button
          @click="isShowremoteConfig = true"
          icon="el-icon-setting"
          type="text"
          >保存设置</el-button
        >
      </div>
    </div>

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
    <batch-dialog :visible.sync="isShowBatchDialog" />

    <!-- 保存配置 -->
    <remote-config :visible.sync="isShowremoteConfig" />
  </div>
</template>

<script lang="ts">
import _ from "lodash-es";
import store from "@/store";
import configList from "@/config";
import { filterObjByDefault } from "@/helpers/utils";
import remoteConfig from "./components/remoteConfig.vue";
import htmlDialog from "./components/htmlDialog.vue";
import batchDialog from "./components/batchDialog.vue";
import importDialog from "./components/importDialog.vue";
import exportDialog from "./components/exportDialog.vue";
import previewDialog from "./components/previewDialog.vue";
import { createComponent, toRefs, computed, ref } from "@vue/composition-api";
import { FormItemList } from "@/types/project";
import { saveFormToServer } from "@/helpers/api";
import { Message } from "element-ui";

export default createComponent({
  name: "AppMainHeader",
  components: {
    remoteConfig,
    htmlDialog,
    batchDialog,
    importDialog,
    exportDialog,
    previewDialog
  },
  setup() {
    const { saveType } = toRefs(store.state);
    const {
      currentFormDesc: originFormDesc,
      currentFormAttr: filterFormAttr
    } = toRefs(store.getters);

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

        formItem = processData(formItem, commonDefaultData as FormItemList);

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

    // 保存数据
    const handleSaveData = async () => {
      const res = await saveFormToServer(store.state);
      if (res) {
        if (res.code === 0) {
          Message.success("保存成功");
        } else {
          Message.error("保存失败, 失败原因: " + res.msg);
        }
      }
    };

    return {
      formDesc,
      filterFormAttr,
      handleSaveData,
      clearForm: () => store.commit("clearCurrentForm"),
      isShowExportData: false,
      isShowHtmlCode: false,
      isPreview: ref(false),
      isShowBatchDialog: false,
      isShowImportDialog: false,
      isShowremoteConfig: false,
      saveType
    };
  }
});
</script>

<style lang="scss">
.app-main-header {
  height: 60px;
  line-height: 60px;
  padding: 0 15px;
  border-bottom: 1px solid #ebeef5;
  .app-main-header-buttons {
    display: flex;
    justify-content: space-between;
  }
}
</style>
