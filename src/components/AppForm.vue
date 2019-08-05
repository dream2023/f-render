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
        <div
          class="form-area-placeholder"
          v-if="list.length === 0"
        >从左侧拖拽来添加表单项</div>
        <template v-else>
          <!-- 表单项 -->
          <template v-for="(formItem, index) of list">
            <!-- 列 -->
            <el-col
              :class="{'form-item-active': selectIndex === index}"
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
                <div
                  class="ele-form-tip"
                  v-if="formItem.formData.tip"
                >{{formItem.formData.tip}}</div>
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
    </ele-form>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
const cloneDeep = require('lodash.clonedeep')

export default {
  name: 'AppForm',
  props: {
    formAttr: Object
  },
  components: {
    draggable
  },
  watch: {
    // 检查变化, 抛出选中项到属性编辑见面
    selectIndex (index) {
      this.$emit('select', this.list[index])
    },
    // 检测列表变化, 抛出变化, 用于生成代码
    list: {
      handler (list) {
        list = cloneDeep(list)

        const formDesc = list.reduce((acc, { formData }) => {
          const field = formData['field']
          // 删除字段属性
          delete formData['field']

          // 判断默认值
          if (formData.default === null || formData.default === undefined) delete formData.default

          // 判断布局
          if (formData.layout === 24) delete formData.layout
          acc[field] = formData
          return acc
        }, {})
        this.$emit('change', formDesc)
      },
      deep: true
    }
  },
  data () {
    return {
      selectIndex: null,
      list: []
    }
  },
  methods: {
    // 删除
    handleDelete (index) {
      this.list.splice(index, 1)
      if (index >= this.list.length) {
        this.selectIndex = this.list.length - 1
      }
    },
    // 新增
    handleAdd (res) {
      this.selectIndex = res.newIndex
    },
    // 移动开始
    handleMoveStart (res) {
      this.selectIndex = res.oldIndex
    },
    // 移动结束
    handleMoveEnd (res) {
      this.selectIndex = res.newIndex
    },
    // 点击选中
    handleFormItemClick (index) {
      this.selectIndex = index
    },

    // 表单提交
    handleSubmit (data) {
      return Promise.resolve()
    },
    // 请求成功
    handleSuccess () {
      this.$message.success('创建成功')
    },

    // 获取组件名(调用ele-form内部方法)
    getComponentName (type) {
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
</style>
