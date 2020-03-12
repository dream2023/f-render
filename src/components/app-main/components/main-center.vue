<template>
  <div class="app-main-center">
    <ele-form
      v-model="formData"
      :form-desc="currentFormDesc"
      :request-fn="handleSubmit"
      @request-success="handleSuccess"
      ref="ele-form"
      v-bind="currentFormAttr"
    >
      <template
        v-slot:form-content="{ props, formData, formDesc, formErrorObj }"
      >
        <draggable
          :animation="200"
          v-if="isRenderFinish"
          :disabled="false"
          :list="list"
          @add="handleAdd"
          @end="handleMoveEnd"
          @start="handleMoveStart"
          group="form"
          tag="el-row"
          style="padding-bottom: 80px;"
        >
          <!-- 当为空时 -->
          <div class="form-area-placeholder" v-if="list.length === 0">
            从左侧拖拽来添加表单项
          </div>
          <template v-else>
            <template v-for="(formItem, field, index) of formDesc">
              <el-col
                :key="field"
                v-bind="formItem._colAttrs"
                @click.native="handleFormItemClick(index)"
                v-if="formItem._vif"
                class="form-item"
                :class="{ 'form-item-active': currentFormItemIndex === index }"
              >
                <el-form-item
                  :error="formErrorObj ? formErrorObj[field] : null"
                  :prop="field"
                  :label="
                    props.isShowLabel && formItem.isShowLabel !== false
                      ? formItem.label
                      : null
                  "
                  :label-width="formItem.labelWidth || null"
                >
                  <component
                    :disabled="props.disabled || formItem._disabled"
                    :desc="formItem"
                    :is="formItem._type"
                    :options="formItem._options"
                    :ref="field"
                    :field="field"
                    v-model="formItem.default"
                  />
                  <div
                    class="ele-form-tip"
                    v-if="formItem.tip"
                    v-html="formItem.tip"
                  ></div>
                </el-form-item>

                <!-- 删除按钮 -->
                <el-button
                  @click.stop="handleDelete(index)"
                  class="form-item-delete-btn"
                  icon="el-icon-delete"
                  size="mini"
                  style="border-radius: 0"
                  type="primary"
                  v-if="currentFormItemIndex === index"
                ></el-button>
              </el-col>
            </template>
          </template>
        </draggable>
      </template>
    </ele-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import draggable from "vuedraggable";
import { createComponent, toRefs, ref, onMounted } from "@vue/composition-api";

export default createComponent({
  name: "AppMainCenter",
  components: {
    draggable
  },
  setup() {
    const {
      currentFormAttr,
      currentFormDesc,
      currentFormItemList: list
    } = toRefs(store.getters);
    const { currentFormItemIndex } = toRefs(store.state);

    // 确保渲染结束
    const isRenderFinish = ref(false);
    onMounted(() => {
      Vue.nextTick(() => {
        isRenderFinish.value = true;
      });
    });

    // 通过index删除
    const deleteItemByIndex = (index: number) =>
      store.commit("deleteFormItemByIndex", index);

    // 通过index更新
    const updateSelectIndex = (index: number) =>
      store.commit("updateFormItemIndex", index);

    // 删除
    function handleDelete(index: number) {
      deleteItemByIndex(index);

      // 因为如果删除最后一个, 界面则无选中效果
      // 所以这里删除最后一个后, 重新选择最后一个
      if (index >= list.value.length) {
        updateSelectIndex(list.value.length - 1);
      }
    }
    // 新增
    function handleAdd(res: AnyObj) {
      updateSelectIndex(res.newIndex);
    }
    // 移动开始
    function handleMoveStart(res: AnyObj) {
      updateSelectIndex(res.oldIndex);
    }
    // 移动结束
    function handleMoveEnd(res: AnyObj) {
      updateSelectIndex(res.newIndex);
    }
    // 点击选中
    function handleFormItemClick(index: number) {
      updateSelectIndex(index);
    }
    return {
      formData: ref({}),
      list,
      handleDelete,
      handleMoveStart,
      handleFormItemClick,
      handleMoveEnd,
      handleAdd,
      currentFormAttr,
      currentFormDesc,
      currentFormItemIndex,
      isRenderFinish
    };
  },
  methods: {
    // 表单提交
    handleSubmit(data: any) {
      // eslint-disable-next-line no-console
      console.log(data);
      return Promise.resolve();
    },
    // 请求成功
    handleSuccess() {
      this.$message.success("创建成功");
    }
  }
});
</script>

<style lang="scss">
.app-main-center {
  padding: 20px;

  /* 当无表单时的占位 */
  .form-area-placeholder {
    width: 100%;
    height: 300px;
    line-height: 300px;
    background-color: white;
    color: #909399;
    text-align: center;
  }

  /* 表单项 */
  .form-item {
    background: white;
    cursor: move;
    position: relative;
    z-index: 1;
    padding: 0 20px;
    border: 1px dashed rgba(0, 0, 0, 0);

    &-active {
      border: 1px dashed #409eff;
    }

    /* 遮挡区(遮挡住) */
    &::after {
      content: " ";
      display: block;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      z-index: 2;
    }

    .form-item-delete-btn {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 3;
    }
  }
}
</style>
