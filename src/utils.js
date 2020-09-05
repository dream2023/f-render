import _ from "lodash";
const equal = require("fast-deep-equal");
const cloneDeep = require("clone");
/**
 * 对象转为数组
 * @param {object} obj
 * @example
 * objectToArr({a1: { name: "张", age: 10 }, a2: { name: "李", age: 20 }}, 'id')
 * // [{ name: "张", age: 10, id: 'a1' }, { name: "李", age: 20, id: 'a2' } ]
 */
export function objectToArr(obj, keyField) {
  return Object.keys(obj).reduce((acc, key) => {
    acc.push(Object.assign({}, { [keyField]: key }, obj[key]));
    return acc;
  }, []);
}

/**
 * 数组转为对象
 * @param {array} arr
 * @example
 * arrToObject([{ name: "张", age: 10, id: 'a1' }, { name: "李", age: 20, id: 'a2' } ], 'id')
 * // {a1: { name: "张", age: 10 }, a2: { name: "李", age: 20 }}
 */
export function arrToObject(arr, key) {
  return cloneDeep(arr).reduce((acc, cur) => {
    acc[cur[key]] = cur;
    delete cur[key];

    return acc;
  }, {});
}

// 改变 formDesc 的 Label
export function changeFormDescLabel(formDesc = {}) {
  return _.mapValues(formDesc, (obj, key) => {
    // 将 label 改为 key:label，
    // 例如 max: { label: "最大值" } => max: { label: "max:最大值" }
    const label = `${key}: ${obj.label}`;

    // 因为 placeholder 会采用 label 做为默认值
    // 所以我们需要手动赋值保持 placeholder 不变
    if (!obj.attrs) {
      obj.attrs = {};
    }
    obj.attrs.placeholder = obj.label;
    return { ...obj, label };
  });
}

/**
 * 新增表单项
 * 应用场景：1.拖拽新增  2.批量添加
 * @param {array} comps 表单项配置
 * @param {string} type 表单项类型
 * @param {object} common 通用配置
 * @param {object} attrs 属性配置
 * comps: [
 *  { type: "input",
 *    config: {
 *      common: { defaultData: {}, requiredData: {} },
 *      attrs: { defaultData: {}, requiredData: {} }
 *    }
 *  }
 * ]
 */
export function addFormItem({
  type,
  field,
  label,
  config = {},
  commonData = {}
}) {
  // 获取配置
  const formItemConfig = cloneDeep(config);
  // 通用属性 = 默认通用配置 + 自定义通用配置（默认值）+  自定义通用配置（必填值）+ 三个特殊属性
  const requiredData = {
    ...commonData,
    ...(formItemConfig?.config?.common?.defaultData || {}),
    ...(formItemConfig?.config?.common?.requiredData || {}),
    // 放置后面，其到覆盖的作用
    type: type || formItemConfig.type,
    label: label || formItemConfig.label,
    field: field || "key_" + Date.now()
  };

  // 组件属性配置 =  配置（默认值）+ 配置（必填值）
  const attrsData = {
    ...(formItemConfig?.config?.attrs?.defaultData || {}),
    ...(formItemConfig?.config?.attrs?.requiredData || {})
  };

  // 返回通用配置 + 属性配置
  return {
    ...requiredData,
    attrs: attrsData
  };
}

/**
 * 移除双引号
 * @param {string} str
 * @example
 * reomveQuotes({"name": "zhang"}) => {name: "zhang"}
 */
export function reomveQuotes(str) {
  return str.replace(/"(\w+)":/g, "$1:");
}

/**
 * 移除无用的属性(默认值 + 空属性 + 隐藏的属性)
 */
export function removeUselessAttrs(obj = {}, defaultObj = {}) {
  const isEmpty = val => _.isNil(val);
  const isDefault = (val, key) => equal(val, defaultObj[key]);

  return _.omitBy(obj, (val, key) => isEmpty(val) || isDefault(val, key));
}
