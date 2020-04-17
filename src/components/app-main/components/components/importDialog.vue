<template>
  <el-dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    append-to-body
    title="导入数据"
    v-if="visible"
    width="600px"
  >
    <!-- 预览弹窗 -->
    <el-dialog width="90%" :visible.sync="isShowPreview" append-to-body>
      <el-card header="表单预览" shadow="hover" class="box-card">
        <ele-form
          :form-desc="formDesc"
          v-model="formData"
          :request-fn="handleRequest"
          @request-success="handleRequestSuccess"
          v-bind="formAttr"
        ></ele-form>
      </el-card>
      <div slot="footer">
        <el-button @click="isShowPreview = false">返回编辑</el-button>
        <el-button type="primary" @click="confirmGen">生成表单</el-button>
      </div>
    </el-dialog>

    <el-alert
      title="必须是JSON对象"
      style="margin-bottom: 20px"
      type="warning"
      show-icon
    >
    </el-alert>

    <!-- 编辑器 -->
    <codemirror @input="handleChange" v-model="jsonStr"></codemirror>
    <!-- 按钮操作 -->
    <div style="text-align: center;margin-top: 20px">
      <el-button @click="handleImport" :disabled="importDisabled" type="primary"
        >导入数据</el-button
      >
    </div>
  </el-dialog>
</template>

<script lang="ts">
import _ from "lodash-es";
import store from "@/store";
import { Message } from "element-ui";
import formAttrDefault from "@/store/formAttrDefault";
import {
  defineComponent,
  ref,
  computed,
  watch,
  toRefs
} from "@vue/composition-api";

export default defineComponent({
  name: "importDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const isShowPreview = ref(false);
    const formDesc = ref({});
    const formAttr = ref({});
    const jsonData = ref({} as AnyObj);
    const jsonStr = ref("{}");
    const isError = ref(false);

    // 无数据时, 禁用按钮
    const importDisabled = computed(() => {
      return !jsonData.value || Object.keys(jsonData.value).length === 0;
    });

    // 当隐藏时, 清空数据
    const { visible } = toRefs(props);
    watch(visible, () => {
      isShowPreview.value = false;
      jsonData.value = {};
      formDesc.value = {};
      jsonStr.value = "{}";
    });

    // 代码输入事件
    const handleChange = _.debounce(json => {
      try {
        json = eval("(" + json + ")");
        if (typeof json === "object") {
          jsonData.value = _.cloneDeep(json);
          formDesc.value = jsonData.value.formDesc;
          isError.value = false;
        } else {
          isError.value = true;
        }
      } catch (err) {
        isError.value = true;
      }
    }, 200);

    // 处理粘贴的json
    const handleImport = () => {
      if (typeof jsonData.value !== "object" || isError.value) {
        Message.error("请输入正确的 JSON 格式！");
        return false;
      }

      if (jsonData.value && jsonData.value.formDesc) {
        const keys = Object.keys(formAttrDefault);
        formAttr.value = Object.assign(
          {},
          formAttrDefault,
          _.pick(jsonData.value, keys)
        );

        // 临时预览的 formAttr
        isShowPreview.value = true;
      } else {
        Message.error('数据必须有 "formDesc" 属性！');
        return false;
      }
    };

    // 处理json数据，将json 映射到操作面板 （list)
    function json2Form() {
      // 清空原有list （待优化）
      store.commit("clearCurrentForm");
      // 1.分离 formAttr （表单配置数据）
      store.commit("updateCurrentFormAttr", formAttr.value);
      // 2.更新 formDesc（组件通用配置数据）
      // 3.处理 formDesc.attr（组件属性配置数据）
      const list = Object.entries(formDesc.value).map(([key, val]) => ({
        ...(val as object),
        attrs: (val as { attrs: AnyObj }).attrs || {},
        field: key
      }));
      // 更新 list
      store.commit("updateCurrentFormItemList", list);
      // 更新 selectIndex
      store.commit("updateFormItemIndex", 0);
    }

    // 确认生成表单
    function confirmGen() {
      json2Form();
      context.emit("update:visible", false);
    }
    return {
      formData: ref({}),
      confirmGen,
      handleImport,
      handleChange,
      importDisabled,
      isShowPreview,
      formDesc,
      formAttr,
      jsonData,
      jsonStr,
      isError
    };
  },
  methods: {
    handleRequest(data) {
      // eslint-disable-next-line no-console
      console.log(data);
      return Promise.resolve();
    },
    handleRequestSuccess() {
      this.$message.success("发送成功");
    }
  }
});
</script>
