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
      show-icon
      style="margin-bottom: 40px"
    >
      浏览器会存在跨域的情况, 请做好跨域处理, 接口等具体请参考
      <a
        target="_blank"
        href="https://github.com/dream2023/vue-ele-form-generator/wiki/%E5%B0%86%E6%95%B0%E6%8D%AE%E5%AD%98%E5%88%B0%E6%9C%8D%E5%8A%A1%E5%99%A8"
        >文章</a
      >
    </el-alert>
  </ele-form-dialog>
</template>

<script>
import {
  getRemoteConfig,
  setRemoteConfig,
  removeRemoteConfig
} from "@/helpers/remoteConfig";

export default {
  name: "remoteConfig",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible(val) {
      if (val && getRemoteConfig()) {
        this.formData = getRemoteConfig();
      } else {
        this.formData = {};
      }
    }
  },
  data() {
    const methods = ["GET", "POST", "PUT"];
    return {
      formData: {},
      formDesc: {
        type: {
          type: "radio",
          label: "保存方式",
          default: "local",
          isShowLabel: true,
          options: [
            { text: "本地", value: "local" },
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
      }
    };
  },
  methods: {
    handleAdd(data) {
      if (data.type === "remote") {
        setRemoteConfig(data);
      } else {
        removeRemoteConfig();
      }
      this.$store.commit("updateSaveType", data.type);
      this.$emit("update:visible", false);
      this.$message.success("设置保存成功");
    }
  }
};
</script>
