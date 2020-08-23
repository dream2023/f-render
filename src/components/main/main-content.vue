<template>
  <perfect-scrollbar class="scroll-area main-content">
    <ele-form
      v-model="formData"
      :request-fn="handleSubmit"
      @request-success="handleSuccess"
      ref="ele-form"
      :formDesc="frender.formDesc"
      v-bind="frender.formConfig"
    >
      <template v-slot:form-content="{ props, formDesc, formErrorObj }">
        <draggable
          :animation="200"
          v-if="isRenderFinish"
          :disabled="false"
          :list="formItemList"
          @add="handleAdd"
          @end="handleMoveEnd"
          @start="handleMoveStart"
          group="form"
          tag="el-row"
          style="padding-bottom: 80px;"
        >
          <!-- 当为空时 -->
          <div class="form-area-placeholder" v-if="formItemList.length === 0">
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
                :class="{ 'form-item-active': currentIndex === index }"
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
                <i
                  @click.stop="handleDelete(index)"
                  class="el-icon-delete form-item-delete-btn"
                  v-if="currentIndex === index"
                ></i>
              </el-col>
            </template>
          </template>
        </draggable>
      </template>
    </ele-form>
  </perfect-scrollbar>
</template>

<script>
import draggable from "vuedraggable";
import { PerfectScrollbar } from "vue2-perfect-scrollbar";

export default {
  inject: ["frender"],
  components: {
    draggable,
    PerfectScrollbar
  },
  computed: {
    formItemList() {
      return this.frender.formItemList;
    },
    currentIndex() {
      return this.frender.currentIndex;
    }
  },
  data() {
    return {
      formData: {},
      isRenderFinish: false
    };
  },
  mounted() {
    // 确保渲染结束
    this.$nextTick(() => {
      this.isRenderFinish = true;
    });
  },
  methods: {
    // 通过index删除
    deleteItemByIndex(index) {
      this.frender.formItemList.splice(index, 1);
    },

    // 通过index更新
    updateSelectIndex(index) {
      this.frender.currentIndex = index;
    },
    // 删除
    handleDelete(index) {
      this.deleteItemByIndex(index);

      // 因为如果删除最后一个, 界面则无选中效果
      // 所以这里删除最后一个后, 重新选择最后一个
      if (index >= this.formItemList.length) {
        this.updateSelectIndex(this.formItemList.length - 1);
      }
    },
    // 新增
    handleAdd(res) {
      this.updateSelectIndex(res.newIndex);
    },
    // 移动开始
    handleMoveStart(res) {
      this.updateSelectIndex(res.oldIndex);
    },
    // 移动结束
    handleMoveEnd(res) {
      this.updateSelectIndex(res.newIndex);
    },
    // 点击选中
    handleFormItemClick(index) {
      this.updateSelectIndex(index);
    },

    // 表单提交
    handleSubmit(data) {
      // eslint-disable-next-line no-console
      console.log(data);
      return Promise.resolve();
    },
    // 请求成功
    handleSuccess() {
      this.$message.success("创建成功");
    }
  }
};
</script>

<style lang="scss">
.main-content {
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
      cursor: pointer;
      padding: 7px 15px;
      color: white;
      background: #409eff;
    }
  }
}
</style>
