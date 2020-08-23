<template>
  <div>
    <main-header @save="$emit('save')" />
    <main-content v-loading="loading" />
  </div>
</template>

<script>
import MainHeader from "./main-header";
import MainContent from "./main-content";

export default {
  components: {
    MainHeader,
    MainContent
  },
  props: {
    loading: Boolean
  }
};
</script>
