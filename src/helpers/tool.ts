/******************/
// 业务相关的工具函数
/******************/

import _ from "lodash-es";
import comps from "./comps";
import configList from "@/config";
import { FormDescData, FormDesc } from "@/types/formList";

/**
 * 修改label => key + label, 同时修改 attrs: { placeholder:  key + label } 更明确告知用户属性名
 * @param obj 要更改的 formDesc
 * @param exceptFields 需要排除的字段
 */
export function changeFormLabel(
  obj: FormDesc,
  exceptFields: string[] = []
): FormDesc {
  const changeLabel = (val: FormDescData, key: string) => {
    if (!exceptFields.includes(key)) {
      val.attrs = {
        ...val.attrs,
        placeholder: val.label
      };
      val.label = `${key}: ${val.label}`;
    }
    return val;
  };
  return _.mapValues(_.cloneDeep(obj), changeLabel);
}

/**
 * 判断是否为 vscode
 * vscode无法使用 localStorage
 */
export const isVscode: boolean = (() => {
  try {
    localStorage.getItem("test");
    return false;
  } catch {
    return true;
  }
})();

type formItem = {
  type: string;
  label: string;
  field: string;
};
/**
 * 新增表单项
 * @param formItem 表单项
 */
import { FormDescListItem } from "@/types/formList";

export function addFormItem(
  type: string,
  common: AnyObj = {},
  attrs?: AnyObj
): FormDescListItem {
  const {
    attrsData = {},
    attrsDefaultData = {},
    commonData = {},
    commonDefaultData = {}
  } = configList[type] || {};

  common.field = common.field || "key_" + Date.now();
  common.label = common.label || _.find(comps, { type: "input" })?.label;

  return Object.assign(
    {},
    _.cloneDeep(commonDefaultData),
    _.cloneDeep(commonData),
    {
      ...(common as { field: string }),
      type,
      // 组件属性
      attrs: {
        ...attrs,
        ..._.cloneDeep(attrsDefaultData),
        ..._.cloneDeep(attrsData)
      }
    }
  );
}
