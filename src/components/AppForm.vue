<template>
  <div class="app-form-container">
    <ele-form
      :form-data="{}"
      :form-desc="{}"
      :request-fn="handleSubmit"
      @request-success="handleSuccess"
      ref="ele-form"
      v-bind="formAttr"
    >
      <draggable
        :animation="200"
        :disabled="false"
        :list="list"
        @add="handleAdd"
        @end="handleMoveEnd"
        @start="handleMoveStart"
        group="form"
        style="padding-bottom: 80px;"
        tag="el-row"
      >
        <!-- 当为空时 -->
        <div class="form-area-placeholder" v-if="list.length === 0">
          从左侧拖拽来添加表单项
        </div>
        <template v-else>
          <!-- 表单项 -->
          <template v-if="formAttr.inline">
            <template v-for="(formItem, index) of list">
              <el-form-item
                :class="{ 'form-item-active': selectIndex === index }"
                :key="index"
                :label="formItem.formData.label"
                :prop="formItem.formData.field"
                @click.native="handleFormItemClick(index)"
                v-if="formItem.type !== 'hide'"
              >
                <!-- 具名 作用域插槽(用于用户自定义显示) -->
                <component
                  :desc="formItem"
                  :is="getComponentName(formItem.formData.type)"
                  :key="formItem.formData.field"
                  v-model="formItem.formData.default"
                />
                <div class="ele-form-tip" v-if="formItem.tip">
                  {{ formItem.tip }}
                </div>

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
              </el-form-item>
            </template>
          </template>
          <template v-else>
            <template v-for="(formItem, index) of list">
              <!-- 列 -->
              <el-col
                :class="{ 'form-item-active': selectIndex === index }"
                :key="formItem.formData.field"
                :md="formItem.formData.layout || 24"
                :xs="24"
                @click.native="handleFormItemClick(index)"
                class="form-item"
                v-if="formItem.formData.type !== 'hide'"
              >
                <!-- 表单项 -->
                <el-form-item
                  :label="formItem.formData.label"
                  :prop="formItem.formData.field"
                >
                  <!-- 组件 -->
                  <component
                    :desc="formItem"
                    :is="getComponentName(formItem.formData.type)"
                    :key="formItem.formData.field"
                    v-model="formItem.formData.default"
                  />
                  <!-- 提示 -->
                  <div class="ele-form-tip" v-if="formItem.formData.tip">
                    {{ formItem.formData.tip }}
                  </div>
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
        </template>
      </draggable>
    </ele-form>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AppForm',
  components: {
    draggable
  },
  computed: {
    ...mapState(['list', 'selectIndex', 'formAttr'])
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
    getComponentName(type) {
      return this.$refs['ele-form'].getComponentName(type)
    }
  }
}
</script>

<style>
.app-form-container {
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
