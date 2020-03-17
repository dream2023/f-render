import "./extend";
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import ElementUI from "element-ui";
import EleForm from "vue-ele-form/lib/index.js";
import codemirrorConfig from "./extend/codemirror";
import VueCompositionAPI from "@vue/composition-api";
import "@/helpers/api";
// css样式
import "normalize.css";
import "element-ui/lib/theme-chalk/index.css";

// 插件
Vue.use(EleForm, {
  upload: {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    responseFn(response: any) {
      // 因为是 mock 地址, 所以, 总是返回同一张图片的URL, 正常使用的时候不会
      return response.url;
    }
  },
  "upload-file": {
    responseFn(response: any, file: AnyObj) {
      return {
        name: file.name,
        url: URL.createObjectURL(file.raw),
        size: file.size
      };
    }
  },
  codemirror: codemirrorConfig,
  bmap: {
    ak: "9YLHZRPvUNLhi34Oh2ojqeGSpzCf1rVG"
  }
});
Vue.use(ElementUI);
Vue.use(VueCompositionAPI);

// 配置
Vue.config.productionTip = false;

// 实例化
new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
