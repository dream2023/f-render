<template>
  <div style="min-width:1350px;">
    <app-header />
    <app-main />
  </div>
</template>

<script>
import AppHeader from './components/app-header'
import AppMain from './components/app-main/index'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppMain
  }
}
</script>

<style>
body {
  background: white;
}
</style>
