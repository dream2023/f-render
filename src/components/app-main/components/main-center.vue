<template>
  <div class="app-main-center">
    <ele-form
      v-model="formData"
      :form-desc="formDesc"
      :request-fn="handleSubmit"
      @request-success="handleSuccess"
      ref="ele-form"
      v-bind="formAttr"
    >
      <template v-slot:form-content="{ formData, formDesc, formErrorObj }">
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
                v-bind="getColAttrs(formItem.layout)"
                @click.native="handleFormItemClick(index)"
                v-if="formItem._vif"
                class="form-item"
                :class="{ 'form-item-active': selectIndex === index }"
              >
                <el-form-item
                  :error="formErrorObj ? formErrorObj[field] : null"
                  :label="
                    formAttr.isShowLabel === false ? null : formItem.label
                  "
                  :prop="field"
                >
                  <component
                    :disabled="formAttr.disabled || formItem._disabled"
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
                  v-if="selectIndex === index"
                ></el-button>
              </el-col>
            </template>
          </template>
        </draggable>
      </template>
    </ele-form>
  </div>
</template>

<script>
import * as _ from 'lodash'
import draggable from 'vuedraggable'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AppMainCenter',
  components: {
    draggable
  },
  computed: {
    ...mapState(['list', 'selectIndex', 'formAttr']),
    formDesc() {
      return _.keyBy(_.cloneDeep(this.list), 'field')
    }
  },
  data() {
    return {
      formData: {},
      // 确保渲染结束
      isRenderFinish: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.isRenderFinish = true
    })
  },
  methods: {
    ...mapMutations(['deleteItemByIndex', 'updateSelectIndex']),
    // 删除
    handleDelete(index) {
      this.deleteItemByIndex(index)

      // 如果删除的最后一个, 则重新选择最后一个
      if (index >= this.list.length) {
        this.updateSelectIndex(this.list.length - 1)
      }
    },
    // 新增
    handleAdd(res) {
      this.updateSelectIndex(res.newIndex)
    },
    // 移动开始
    handleMoveStart(res) {
      this.updateSelectIndex(res.oldIndex)
    },
    // 移动结束
    handleMoveEnd(res) {
      this.updateSelectIndex(res.newIndex)
    },
    // 点击选中
    handleFormItemClick(index) {
      this.updateSelectIndex(index)
    },
    // 表单提交
    handleSubmit(data) {
      return Promise.resolve()
    },
    // 请求成功
    handleSuccess() {
      this.$message.success('创建成功')
    },
    // 获取组件名(调用ele-form内部方法)
    getColAttrs(layout) {
      return this.$refs['ele-form'].getColAttrs(layout)
    }
  }
}
</script>

<style>
.app-main-center {
  padding: 20px;
}

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
}

.form-item-active {
  border: 1px dashed #409eff;
}

/* 遮挡区(遮挡住) */
.form-item::after {
  content: ' ';
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
</style>
