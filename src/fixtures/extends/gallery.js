export default {
  type: "gallery",
  label: "图片及视频展示",
  config: {
    url: "https://github.com/dream2023/vue-ele-form-gallery",
    attrs: {
      config: {
        type: {
          type: "select",
          label: "类型",
          options: ["image", "video", "iframe"]
        },
        width: {
          type: "number",
          label: "缩略图宽度",
          attrs: {
            min: 0,
            step: 10
          }
        },
        height: {
          type: "number",
          label: "缩略图高度",
          attrs: {
            min: 0,
            step: 10
          }
        },
        lazy: {
          type: "switch",
          label: "缩略图是否懒加载"
        },
        thumbSuffix: {
          type: "input",
          label: "缩略图后缀"
        },
        thumbStyle: {
          type: "data-editor",
          label: "缩略图样式",
          attrs: {
            types: ["object"]
          }
        },
        carouselAttrs: {
          type: "data-editor",
          label: "轮播图属性",
          attrs: {
            types: ["object"]
          }
        }
      },
      data: {}
    },
    common: {
      config: {
        default: {
          type: "dynamic",
          label: "默认值",
          attrs: {
            columns: {
              type: "el-input",
              attrs: {
                placeholder: "图片链接"
              }
            }
          }
        }
      },
      data: {
        default: [
          "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        ]
      }
    }
  }
};
