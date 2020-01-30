<template>
  <div class="app-main">
    <app-main-left class="app-main-left" />
    <div class="app-main-container">
      <app-main-header />
      <app-main-center />
    </div>
    <div class="app-main-right">
      <app-main-right />
    </div>
  </div>
</template>

<script>
import AppMainHeader from './components/main-header'
import AppMainLeft from './components/main-left'
import AppMainCenter from './components/main-center'
import AppMainRight from './components/main-right/index'

export default {
  name: 'AppMain',
  components: {
    AppMainLeft,
    AppMainCenter,
    AppMainHeader,
    AppMainRight
  },
  data() {
    return {
      activeTab: '0'
    }
  }
}
</script>

<style>
.app-main {
  display: flex;
  height: calc(100vh - 60px);
  overflow: hidden;
  margin-top: 2px;
}

.app-main-left {
  width: 300px;
  overflow: scroll;
}

.app-main-container {
  flex: 1;
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  overflow: scroll;
}

.app-main-right {
  width: 315px;
  margin-top: 21px;
  overflow: scroll;
}
</style>
