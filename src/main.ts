import "./extend";
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import ElementUI from "element-ui";
import EleForm from "vue-ele-form";
import codemirrorConfig from "./extend/codemirror";
import VueCompositionAPI from "@vue/composition-api";

// css样式
import "normalize.css";
import "element-ui/lib/theme-chalk/index.css";

// 插件
Vue.use(EleForm, {
  upload: {
    action: "https://jsonplaceholder.typicode.com/posts/", // 请求地址,
    data: { token: "xxx" }, // 附带的参数,
    responseFn(response: any, file: AnyObj) {
      return file.url;
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
