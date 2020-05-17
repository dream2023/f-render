/******************/
// 与业务无关的工具函数
/******************/
import _ from "lodash";

/**
 * 获取文件名
 * @param str 文件路径
 */
export function getFileName(str) {
  const pos1 = str.lastIndexOf("/");
  const pos2 = str.lastIndexOf(".");
  return str.substring(pos1 + 1, pos2);
}

// 将数组转为对象, 并删除原字段
export function keyBy(list, key) {
  // 1.数组转以 key值 的对象
  const obj = _.keyBy(_.cloneDeep(list), key);
  // 2.删除原 key
  const deleteKey = obj => _.omit(obj, key);
  return _.mapValues(obj, deleteKey);
}

// 过滤对象属性
export function filterObjBy(obj, fn) {
  return Object.keys(obj).reduce((acc, key) => {
    if (fn(obj[key], key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

// 深度去除默认值
export function filterObjByDefault(obj = {}, defaultObj = {}) {
  const filterDefault = (val, key) => defaultObj[key] !== val;
  return filterObjBy(obj, (v, k) => {
    if (_.isPlainObject(v)) {
      obj[k] = filterObjByDefault(v, defaultObj[k]);
      return Object.keys(obj[k]).length;
    } else {
      return filterDefault(v, k);
    }
  });
}

// 模糊搜索
export function fuzzySearch(searcher, target) {
  if (target.length > searcher.length) return false;
  let i = 0;
  let j = 0;
  outer: while (i < target.length) {
    while (j < searcher.length && searcher[j] !== target[i]) {
      j++;
    }
    if (j === searcher.length) {
      break outer;
    }
    i++;
  }
  return i === target.length;
}
