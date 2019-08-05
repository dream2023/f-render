<template>
  <div style="min-width:1350px;">
    <app-header class="app-header"></app-header>
    <div class="app-container">
      <app-type class="app-type"></app-type>
      <div class="app-main">
        <app-main-header
          :formAttr="formAttr"
          :formDesc="formDesc"
        ></app-main-header>
        <app-form
          :formAttr="formAttr"
          @change="handleFormChange"
          @select="handleSelectFormItem"
        ></app-form>
      </div>
      <div class="app-attr">
        <el-tabs
          :stretch="true"
          v-model="activeTab"
        >
          <el-tab-pane
            label="表单项属性"
            name="0"
          >
            <app-item-attr :formItem="selectedItem" />
          </el-tab-pane>
          <el-tab-pane
            label="表单属性"
            name="1"
          >
            <app-form-attr @change="handleFormAttrChange" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import AppForm from './components/AppForm'
import AppHeader from './components/AppHeader'
import AppType from './components/AppType'
import AppFormAttr from './components/AppFormAttr'
import AppItemAttr from './components/AppItemAttr'
import AppMainHeader from './components/AppMainHeader'

export default {
  name: 'App',
  components: {
    AppForm,
    AppHeader,
    AppFormAttr,
    AppItemAttr,
    AppType,
    AppMainHeader
  },
  data () {
    return {
      // 表单项描述
      formDesc: {},
      // 表单属性
      formAttr: {},
      selectedItem: {},
      // 当前激活的 tab 用
      activeTab: '0'
    }
  },
  methods: {
    handleFormChange (formDesc) {
      this.formDesc = formDesc
    },
    handleSelectFormItem (formItem) {
      this.selectedItem = formItem
    },
    handleFormAttrChange (attr) {
      this.formAttr = attr
    }
  }
}
</script>

<style>
.app-header {
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 1;
  width: 100%;
  padding: 0 20px;
}

.app-container {
  display: flex;
  height: calc(100vh - 60px);
  overflow: hidden;
  margin-top: 2px;
}

.app-type {
  width: 280px;
  overflow: scroll;
}

.app-main {
  flex: 1;
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  overflow: scroll;
}

.app-attr {
  width: 280px;
  margin-top: 21px;
  overflow: scroll;
}

.el-tabs__nav-wrap::after {
  height: 1px !important;
}

.el-tabs__active-bar {
  height: 1px !important;
}
</style>
