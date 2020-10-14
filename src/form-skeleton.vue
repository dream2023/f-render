<template>
  <div class="form-skeleton">
    <div v-for="item of 4" :key="item" class="form-skeleton-item">
      <div class="form-skeleton-label skeleton-animation">xxx</div>
      <div class="form-skeleton-component skeleton-animation"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "form-skeleton",
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style>
.form-skeleton {
  margin-bottom: 20px;
}

.form-skeleton-item {
  margin-top: 20px;
  display: flex;
  align-items: center;
  height: 40px;
}

.form-skeleton-label {
  width: 50px;
  padding-right: 12px;
  text-align: right;
  color: #606266;
  line-height: 40px;
}

@keyframes skeletonLoading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.form-skeleton-component {
  flex: 1;
  border-radius: 5px;
  background: linear-gradient(90deg, #eeeeee 25%, #cccccc 37%, #eeeeee 63%);
  background-size: 400% 100%;
  animation: skeletonLoading 1.4s ease infinite;
  height: 40px;
}
</style>
