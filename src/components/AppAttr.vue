<template>
  <div>
    <el-tabs
      :stretch="true"
      style="margin-top: 25px;"
      v-model="activeName"
    >
      <el-tab-pane
        label="表单项属性"
        name="form-item"
      >
        <app-item-attr />
      </el-tab-pane>
      <el-tab-pane
        label="表单属性"
        name="form"
      >
        <app-form-attr />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AppFormAttr from './AppFormAttr'
import AppItemAttr from './AppItemAttr'

export default {
  name: 'AppAttr',
  components: {
    AppFormAttr,
    AppItemAttr
  },
  data () {
    return {
      activeName: 'form-item'
    }
  },
  methods: {
  },
  mounted () {}
}
</script>
