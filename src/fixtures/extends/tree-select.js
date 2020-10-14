export default {
  type: "tree-select",
  label: "树形下拉选择器",
  config: {
    url: "https://github.com/dream2023/vue-ele-form-tree-select",
    attrs: {
      config: {
        placeholder: {
          type: "input",
          label: "占位符"
        },
        appendToBody: {
          type: "switch",
          label: "弹窗插入body"
        },
        multiple: {
          type: "switch",
          label: "是否开启多选模式"
        },
        searchable: {
          type: "switch",
          label: "是否开启搜索功能"
        },
        async: {
          type: "switch",
          label: "是否开启异步搜索"
        },
        autoFocus: {
          type: "switch",
          label: "是否自动聚焦"
        },
        clearable: {
          type: "switch",
          label: "是否显示清除图标"
        },
        limit: {
          type: "number",
          label: "多选数量显示",
          vif: data => data.multiple,
          attrs: {
            min: 1
          }
        },
        maxHeight: {
          type: "number",
          label: "弹出菜单高度",
          attrs: {
            min: 0,
            step: 10
          }
        },
        alwaysOpen: {
          type: "switch",
          label: "一直打开选项菜单"
        },
        flattenSearchResults: {
          type: "switch",
          label: "是否展平搜索结果",
          vif: data => data.async
        },
        autoLoadRootOptions: {
          type: "switch",
          label: "是否自定加载根节点选项"
        }
      }
    },
    common: {
      config: {
        default: {
          type: "tree-select",
          label: "默认值",
          prop: data => data.prop,
          optionsLinkageFields: data => data.optionsLinkageFields,
          options: data => data.options
        }
      },
      data: {
        isOptions: true,
        options: [
          {
            id: "a",
            label: "a",
            children: [
              {
                id: "aa",
                label: "aa"
              },
              {
                id: "ab",
                label: "ab"
              }
            ]
          },
          {
            id: "b",
            label: "b"
          },
          {
            id: "c",
            label: "c"
          }
        ]
      }
    }
  }
};
