import _ from "lodash";
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
 * 移除双引号
 * @param {string} str
 * @example
 * reomveQuotes({"name": "zhang"}) => {name: "zhang"}
 */
export function reomveQuotes(str) {
  return str.replace(/"(\w+)":/g, "$1:");
}

/**
 * 移除无用的属性
 */
export function removeEmptyProps(obj = {}) {
  return _.omitBy(obj, val => val === undefined || val === null || val === "");
}
