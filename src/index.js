import FRender from "./f-render";

if (window !== undefined && window.Vue) {
  window.Vue.component("f-render", FRender);
}

export default FRender;
