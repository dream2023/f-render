<template>
  <el-card
    header="表单"
    shadow="never"
  >
    <ele-form
      :form-data="formData"
      :form-desc="{}"
      :request-fn="handleSubmit"
      :rules="rules"
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
        style="padding-bottom: 60px;"
        tag="el-row"
      >
        <div
          class="form-area-placeholder"
          v-if="list.length === 0"
        >从左侧拖拽来添加表单项</div>
        <template v-else>
          <!-- 表单项 -->
          <template v-for="(formItem, index) of list">
            <el-col
              :class="{'form-item-active': selectIndex === index}"
              :key="formItem.formData.field"
              :md="formItem.formData.layout || 24"
              :xs="24"
              @click.native="handleFormItemClick(index)"
              class="form-item"
              v-if="formItem.formData.type !== 'hide'"
            >
              <el-form-item
                :label="formItem.formData.label"
                :prop="formItem.formData.field"
              >
                <component
                  :desc="formItem"
                  :is="getComponentName(formItem.formData.type)"
                  :key="formItem.formData.field"
                  v-model="formData[formItem.field]"
                />
                <div
                  class="ele-form-tip"
                  v-if="formItem.formData.tip"
                >{{formItem.formData.tip}}</div>
              </el-form-item>
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
  </el-card>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'AppForm',
  props: {
    formAttr: Object
  },
  components: {
    draggable
  },
  data () {
    return {
      selectIndex: null,
      list: [],
      formData: {},
      rules: {}
    }
  },
  methods: {
    handleDelete (index) {
      this.list.splice(index, 1)
      if (index >= this.list.length) {
        this.selectIndex = this.list.length - 1
      }
      this.$emit('select', this.list[this.selectIndex])
    },
    handleFormItemClick (index) {
      this.selectIndex = index
      this.$emit('select', this.list[this.selectIndex])
    },
    handleAdd (res) {
      this.selectIndex = res.newIndex
      this.$emit('select', this.list[this.selectIndex])
    },
    handleMoveStart (res) {
      this.selectIndex = res.oldIndex
      this.$emit('select', this.list[this.selectIndex])
    },
    handleMoveEnd (res) {
      this.selectIndex = res.newIndex
      this.$emit('select', this.list[this.selectIndex])
    },
    handleSubmit (data) {
      return Promise.resolve()
    },
    // 请求成功
    handleSuccess () {
      this.$message.success('创建成功')
    },
    formAttrChange (attr) {
      this.attr = attr
    },
    getComponentName (type) {
      return this.$refs['ele-form'].getComponentName(type)
    }
  },
  mounted () {

  }
}
</script>

<style>
.form-area-placeholder {
  width: 100%;
  height: 300px;
  line-height: 300px;
  background-color: white;
  color: #909399;
  text-align: center;
}

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
