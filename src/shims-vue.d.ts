declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.ejs" {
  let str: string;
  export default str;
}
