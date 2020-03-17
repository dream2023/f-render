<template>
  <ele-form-dialog
    v-model="formData"
    :formDesc="formDesc"
    width="800px"
    :isShowLabel="false"
    :dialogAttrs="{
      'append-to-body': true
    }"
    :request-fn="handleAdd"
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    title="保存至服务器接口设置"
  >
    <el-alert
      title="警告"
      type="warning"
      v-if="formData.type === 'remote'"
      description="浏览器会存在跨域的情况, 请做好跨域处理"
      show-icon
      style="margin-bottom: 40px"
    >
    </el-alert>
  </ele-form-dialog>
</template>

<script>
import { defineComponent, ref, watch, toRefs } from "@vue/composition-api";
import { Message } from "element-ui";
import {
  getRemoteConfig,
  setRemoteConfig,
  removeRemoteConfig
} from "@/helpers/remoteConfig";
import { isVscode } from "../../../../helpers/tool";
import store from "../../../../store";

export default defineComponent({
  name: "remoteConfig",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const methods = ["GET", "POST", "PUT"];
    const formData = ref({});
    const { visible } = toRefs(props);
    watch(visible, val => {
      if (val && getRemoteConfig()) {
        formData.value = getRemoteConfig();
      } else {
        formData.value = {};
      }
    });
    const handleAdd = data => {
      if (data.type === "remote") {
        setRemoteConfig(data);
      } else {
        removeRemoteConfig();
      }
      store.commit("updateSaveType", data.type);
      context.emit("update:visible", false);
      Message.success("设置保存成功");
    };
    return {
      formData,
      formDesc: {
        type: {
          type: "radio",
          label: "保存方式",
          default: isVscode ? null : "local",
          isShowLabel: true,
          options: [
            { text: "本地", value: "local", disabled: isVscode },
            { text: "服务器", value: "remote" }
          ]
        },
        getMethod: {
          type: "select",
          label: "获取方法",
          default: "GET",
          options: methods,
          layout: 6,
          vif: data => data.type === "remote",
          required: true
        },
        getUrl: {
          type: "input",
          label: "获取表单数据的URL",
          vif: data => data.type === "remote",
          required: true,
          layout: 18
        },
        updateMethod: {
          type: "select",
          label: "更新方法",
          vif: data => data.type === "remote",
          layout: 6,
          options: methods,
          required: true
        },
        updateUrl: {
          type: "input",
          layout: 18,
          vif: data => data.type === "remote",
          label: "更新表单数据的URL",
          required: true
        }
      },
      handleAdd
    };
  }
});
</script>
