// 修改label => key + label 更明确告知用户属性名
import cloneDeep from 'lodash.clonedeep'

export function changeFormLabel (obj = {}, exceptProperty = []) {
  obj = cloneDeep(obj)
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
