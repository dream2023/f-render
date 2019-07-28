<template>
  <div style="min-width:1350px">
    <!-- 基于 layout 组件布局 -->
    <el-container>
      <!-- 头部 -->
      <el-header class="app-header">
        <app-header></app-header>
      </el-header>
      <el-container class="app-main">
        <!-- 类型列表 -->
        <el-aside
          class="app-aside"
          width="320px"
        >
          <app-type-list></app-type-list>
        </el-aside>
        <!-- 表单主题部分 -->
        <el-container>
          <el-container style="border-left: 1px solid #eee;border-right: 1px solid #eee;">
            <!-- header -->
            <el-header style="padding: 0;z-index: 1;text-align:right">
              <app-main-header></app-main-header>
            </el-header>
            <!-- 表单 -->
            <el-main>
              <app-form
                :formAttr="formAttr"
                @select="handleSelectFormItem"
              ></app-form>
            </el-main>
          </el-container>
          <!-- 属性 -->
          <el-aside
            class="app-aside"
            style="margin-top: 21px"
            width="250px"
          >
            <el-tabs
              :stretch="true"
              v-model="activeAttr"
            >
              <el-tab-pane
                label="表单项属性"
                name="item-attr"
              >
                <app-item-attr :formItem="selectedItem" />
              </el-tab-pane>
              <el-tab-pane
                label="表单属性"
                name="form-attr"
              >
                <app-form-attr @change="handleFormAttrChange" />
              </el-tab-pane>
            </el-tabs>
          </el-aside>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppForm from './components/AppForm'
import AppHeader from './components/AppHeader'
import AppTypeList from './components/AppTypeList'
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
    AppTypeList,
    AppMainHeader
  },
  data () {
    return {
      selectedItem: {},
      formAttr: {},
      activeAttr: 'item-attr'
    }
  },
  methods: {
    handleSelectFormItem (formItem) {
      this.selectedItem = formItem
    },
    handleFormAttrChange (attr) {
      this.formAttr = attr
    }
  },
  mounted () {}
}
</script>

<style>
.app-header {
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 1;
  width: 100%;
}

.app-main {
  height: calc(100vh - 60px);
}

.app-aside {
  min-height: 100%;
  overflow-y: scroll;
}

.el-tabs__nav-wrap::after {
  height: 1px !important;
}

.el-tabs__active-bar {
  height: 1px !important;
}
</style>
