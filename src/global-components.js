/**
 * 此文件用于注册全局组件
 */

import Vue from "vue";

import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

import EleFormDynamic from "vue-ele-form-dynamic";
import EleFormDataEditor from "vue-ele-form-data-editor";
import vueDraggable from "vuedraggable/src/vuedraggable";

Vue.use(PerfectScrollbar);
Vue.component("vue-draggable", vueDraggable);
Vue.component("dynamic", EleFormDynamic);
Vue.component("data-editor", EleFormDataEditor);
