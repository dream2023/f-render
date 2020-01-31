<template>
  <multipane @paneResizeStop="handlePaneresize" class="app-main">
    <app-main-left :style="{ width: leftWidth }" class="app-main-left" />
    <multipane-resizer></multipane-resizer>
    <div class="app-main-container">
      <app-main-header />
      <app-main-center />
    </div>
    <multipane-resizer></multipane-resizer>
    <div class="app-main-right">
      <app-main-right />
    </div>
  </multipane>
</template>

<script>
import AppMainHeader from './components/main-header'
import AppMainLeft from './components/main-left'
import AppMainCenter from './components/main-center'
import AppMainRight from './components/main-right/index'
import { Multipane, MultipaneResizer } from 'vue-multipane'

export default {
  name: 'AppMain',
  components: {
    AppMainLeft,
    AppMainCenter,
    AppMainHeader,
    AppMainRight,
    Multipane,
    MultipaneResizer
  },
  data() {
    return {
      leftWidth: '300px',
      activeTab: '0'
    }
  },
  methods: {
    handlePaneresize(el) {
      if (!this.$isVscode && el.className === 'app-main-left') {
        localStorage.setItem('app-main-left', el.style.width)
      }
    }
  },
  mounted() {
    if (!this.$isVscode && localStorage.getItem('app-main-left')) {
      this.leftWidth = localStorage.getItem('app-main-left')
    }
  }
}
</script>

<style>
.app-main {
  height: calc(100vh - 60px);
  overflow: hidden;
  margin-top: 2px;
}

.app-main-left {
  min-width: 150px;
  overflow: scroll;
  line-height: 1.5em;
  height: 100%;
}

.app-main-container {
  overflow: scroll;
  flex-grow: 1;
  flex: 1;
}

.app-main-right {
  width: 315px;
  margin-top: 21px;
  overflow: scroll;
}

.app-main > .multipane-resizer {
  margin: 0;
  left: 0;
  position: relative;
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  width: 8px;
}
.app-main > .multipane-resizer::before {
  display: block;
  content: '';
  width: 1px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -1.5px;
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
}
.app-main > .multipane-resizer::before::before {
  border-color: #999;
}
</style>
