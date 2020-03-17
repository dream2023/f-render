# vue-ele-form-generator | vue-ele-form 的表单设计器

[![MIT](https://img.shields.io/github/license/dream2023/vue-ele-form-generator)](https://github.com/dream2023/vue-ele-form-generator)
![npm](https://img.shields.io/npm/dt/vue-ele-form-generator)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7a45ab0a-0a6b-4d27-b130-54de40296859/deploy-status)](https://app.netlify.com/sites/vue-ele-form-generator/deploys)
[![Star on GitHub](https://img.shields.io/github/stars/dream2023/vue-ele-form-generator.svg?style=social)](https://github.com/dream2023/vue-ele-form-generator/stargazers)

## 介绍

vue-ele-form-generator 是专为 [vue-ele-form](https://github.com/dream2023/vue-ele-form) 开发的可视化表单设计工具, 并且支持[vscode 插件](https://marketplace.visualstudio.com/items?itemName=dream2023.fgen-for-vscode)、[cli 本地启动](https://github.com/dream2023/fgen-cli)、[在线设计](https://vue-ele-form-generator.netlify.com/)多种方式, 让表单开发的效率更上一层楼!

[![vue-ele-form-generator 演示图](https://s2.ax1x.com/2020/01/14/lb1PL6.gif)](https://vue-ele-form-generator.netlify.com/)

## 特性

- 提供[vscode 插件](https://marketplace.visualstudio.com/items?itemName=dream2023.fgen-for-vscode)更贴近日常开发
- 可视化配置页面
- 提供 `vue-ele-form` 全部基础组件 和 全部扩展组件
- 支持组件属性点选配置
- 支持本地启动, 告别被墙的痛苦
- 数据持久化(刷新依然存在)
- 一键生成配置 json 数据
- 一键生成.vue 格式内容

## 安装 和 使用

### 第一步: 项目安装 vue-ele-form

本可视化项目是专为 vue-ele-form 组件开发的表单设计器, 如果想要在项目中使用生成的代码, 必须[安装](https://www.yuque.com/chaojie-vjiel/vbwzgu/xl46cd) `vue-ele-form` 组件, 点击[查看](https://www.yuque.com/chaojie-vjiel/vbwzgu/xl46cd);

### 第二步: 使用可视化设计表单

#### 第一种方式: 在线设计地址(有点慢, 请耐心)

[https://vue-ele-form-generator.netlify.com/](https://vue-ele-form-generator.netlify.com/)

#### 第二种方式: 本地启动

```bash
# 安装
yarn global add fgen-cli # 或 npm install -g fgen-cli
```

```bash
# 基本使用
fgen
```

```bash
# 指定端口
fgen -p 8080
```

```bash
# 更新
yarn global add fgen-cli # 或 npm update -g fgen-cli
```

**守护进程启动**

[私有化部署之守护进程的方式启动](https://github.com/dream2023/fgen-cli/wiki/%E5%A6%82%E4%BD%95%E4%BB%A5%E5%AE%88%E6%8A%A4%E8%BF%9B%E7%A8%8B%E6%96%B9%E5%BC%8F%E5%90%AF%E5%8A%A8fgen-cli)

#### 第三种方式: vscode 插件

插件市场搜索: `fgen-for-vscode`, 或者点击[链接](https://marketplace.visualstudio.com/items?itemName=dream2023.fgen-for-vscode&ssr=false#review-details)

## 其它

**将数据存到服务器**

[如何将将数据存到服务器](https://github.com/dream2023/vue-ele-form-generator/wiki/%E5%B0%86%E6%95%B0%E6%8D%AE%E5%AD%98%E5%88%B0%E6%9C%8D%E5%8A%A1%E5%99%A8)

## 生态

| Project                                                                                          | Status                                                                                                                         | Description                                 |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| [vue-ele-form](https://github.com/dream2023/vue-ele-form)                                        | [![npm](https://img.shields.io/npm/v/vue-ele-form)](https://github.com/dream2023/vue-ele-form)                                 | 接基于 ElementUI 的数据驱动表单             |
| [vue-ele-form-generator](https://github.com/dream2023/vue-ele-form-generator)                    | [![npm](https://img.shields.io/npm/v/vue-ele-form-generator)](https://github.com/dream2023/vue-ele-form-generator)             | 专为 vue-ele-form 开发的可视化表单设计工具  |
| [fgen-cli](https://github.com/dream2023/fgen-cli)                                                | [![npm](https://img.shields.io/npm/v/fgen-cli)](https://github.com/dream2023/fgen-cli)                                         | 本地启动 vue-ele-form-generator 的 cli 工具 |
| [fgen-for-vscode](https://marketplace.visualstudio.com/items?itemName=dream2023.fgen-for-vscode) | ![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/dream2023.fgen-for-vscode)             | vue-ele-form-generator 的 vscode 扩展       |
| [vue-ele-form-json-editor](https://github.com/dream2023/vue-ele-form-json-editor)                | [![npm](https://img.shields.io/npm/v/vue-ele-form-json-editor)](https://github.com/dream2023/vue-ele-form-json-editor)         | JSON 编辑器(vue-ele-form 扩展)              |
| [vue-ele-form-upload-file](https://github.com/dream2023/vue-ele-form-upload-file)                | [![npm](https://img.shields.io/npm/v/vue-ele-form-upload-file)](https://github.com/dream2023/vue-ele-form-upload-file)         | upload 文件上传组件(vue-ele-form 扩展)      |
| [vue-ele-form-image-uploader](https://github.com/dream2023/vue-ele-form-image-uploader)          | [![npm](https://img.shields.io/npm/v/vue-ele-form-image-uploader)](https://github.com/dream2023/vue-ele-form-image-uploader)   | 上传图片增强组件(vue-ele-form 扩展)         |
| [vue-ele-form-tree-select](https://github.com/dream2023/vue-ele-form-tree-select)                | [![npm](https://img.shields.io/npm/v/vue-ele-form-tree-select)](https://github.com/dream2023/vue-ele-form-tree-select)         | 树形选择框组件(vue-ele-form 扩展)           |
| [vue-ele-form-table-editor](https://github.com/dream2023/vue-ele-form-table-editor)              | [![npm](https://img.shields.io/npm/v/vue-ele-form-table-editor)](https://github.com/dream2023/vue-ele-form-table-editor)       | 表格编辑器(vue-ele-form 扩展)               |
| [vue-ele-form-dynamic](https://github.com/dream2023/vue-ele-form-dynamic)                        | [![npm](https://img.shields.io/npm/v/vue-ele-form-dynamic)](https://github.com/dream2023/vue-ele-form-dynamic)                 | 动态表单(vue-ele-form 扩展)                 |
| [vue-ele-form-video-uploader](https://github.com/dream2023/vue-ele-form-video-uploader)          | [![npm](https://img.shields.io/npm/v/vue-ele-form-video-uploader)](https://github.com/dream2023/vue-ele-form-video-uploader)   | 上传视频增强组件(vue-ele-form 扩展)         |
| [vue-ele-form-quill-editor](https://github.com/dream2023/vue-ele-form-quill-editor)              | [![npm](https://img.shields.io/npm/v/vue-ele-form-quill-editor)](https://github.com/dream2023/vue-ele-form-quill-editor)       | 富文本编辑器(vue-ele-form 扩展)             |
| [vue-ele-form-markdown-editor](https://github.com/dream2023/vue-ele-form-markdown-editor)        | [![npm](https://img.shields.io/npm/v/vue-ele-form-markdown-editor)](https://github.com/dream2023/vue-ele-form-markdown-editor) | markdown 编辑器(vue-ele-form 扩展)          |
| [vue-ele-form-bmap](https://github.com/dream2023/vue-ele-form-bmap)                              | [![npm](https://img.shields.io/npm/v/vue-ele-form-bmap)](https://github.com/dream2023/vue-ele-form-bmap)                       | 百度地图组件(vue-ele-form 扩展)             |
| [vue-ele-form-codemirror](https://github.com/dream2023/vue-ele-form-codemirror)                  | [![npm](https://img.shields.io/npm/v/vue-ele-form-codemirror)](https://github.com/dream2023/vue-ele-form-codemirror)           | 代码编辑器(vue-ele-form-gallery 扩展)       |
| [vue-ele-form-gallery](https://github.com/dream2023/vue-ele-form-gallery)                        | [![npm](https://img.shields.io/npm/v/vue-ele-form-gallery)](https://github.com/dream2023/vue-ele-form-gallery)                 | 图片/视频展示组件(vue-ele-form 扩展)        |

<h2 align="center">特别感谢赞助者</h2>
<!--platinum start-->
<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <a href="http://www.youkefu.cn" target="_blank">
          <img width="200px" src="https://portrait.gitee.com/uploads/avatars/user/400/1200081_ukewo_admin_1578945969.png">
          <div>优客服</div>
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="http://www.sagedoit.com/" target="_blank">
          <img width="200px" src="https://i.loli.net/2020/02/10/capiUTAPgCWvLkM.png">
          <div>圣捷远创</div>
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://github.com/DamonNie" target="_blank">
          <img width="200px" src="https://avatars2.githubusercontent.com/u/16314117?s=460&v=4">
          <div>damonnie</div>
        </a>
      </td>
    </tr><tr></tr>
  </tbody>
</table>
<!--platinum end-->

> 如果您觉得对您有所帮助, 可以请作者喝一杯咖啡, 让开源走的更远, 点击进入[码云赞赏](https://gitee.com/dream2023/vue-ele-form-generator)一下, 并加入下面交流群, 将链接发送给我

## 交流群

![交流群](https://i.loli.net/2020/02/07/MmY1u7f4wR3igcB.jpg)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://dream2023.github.io"><img src="https://avatars0.githubusercontent.com/u/19297757?v=4" width="100px;" alt=""/><br /><sub><b>张超杰</b></sub></a><br /><a href="https://github.com/dream2023/vue-ele-form-generator/commits?author=dream2023" title="Documentation">📖</a> <a href="https://github.com/dream2023/vue-ele-form-generator/commits?author=dream2023" title="Code">💻</a> <a href="#ideas-dream2023" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/Wisenl"><img src="https://avatars0.githubusercontent.com/u/17942052?v=4" width="100px;" alt=""/><br /><sub><b>Wisen</b></sub></a><br /><a href="https://github.com/dream2023/vue-ele-form-generator/commits?author=Wisenl" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/IWANABETHATGUY"><img src="https://avatars1.githubusercontent.com/u/17974631?v=4" width="100px;" alt=""/><br /><sub><b>IWANABETHATGUY</b></sub></a><br /><a href="https://github.com/dream2023/vue-ele-form-generator/commits?author=IWANABETHATGUY" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
