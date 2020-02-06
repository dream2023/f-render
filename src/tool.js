import _ from 'lodash-es'
import configList from '@/config'

// 修改label => key + label 更明确告知用户属性名
export function changeFormLabel (obj = {}, exceptProperty = []) {
  obj = _.cloneDeep(obj)
  for (let key in obj) {
    // 并忽略辅助属性
    if (!exceptProperty.includes(key)) {
      obj[key].attrs = {
        ...obj[key].attrs,
        placeholder: obj[key].label
      }
      obj[key].label = `${key}: ${obj[key].label}`
    }
  }
  return obj
}

// 判断是否为 vscode
// vscode无法使用 localStorage
export function isVscode () {
  try {
    localStorage.getItem('test')
    return false
  } catch {
    return true
  }
}

// 新 增表单项
export function addFormItem ({ type, label, field }) {
  const {
    attrsData = {},
    attrsDefaultData = {},
    commonData = {},
    commonDefaultData = {}
  } = configList[type] || {}

  return Object.assign(
    {},
    _.cloneDeep(commonDefaultData),
    _.cloneDeep(commonData),
    {
      field: field,
      label,
      type,
      // 组件属性
      attrs: {
        ..._.cloneDeep(attrsDefaultData),
        ..._.cloneDeep(attrsData)
      }
    }
  )
}
