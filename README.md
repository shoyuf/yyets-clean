[![YYETS-CLEAN](./logo.png)](https://github.com/shoyuf/yyets-clean)
( **Not Official** )

<!-- [![build status](https://travis-ci.org/)](https://travis-ci.org/) -->
<!-- [![coverage]()]() -->
<!-- [![size](https://img.shields.io/github/size/)]() -->
![platform](https://img.shields.io/badge/platform-Windows-blue.svg)

## YYETS-CLEAN

一个基于人人影视客户端 API 的 Electron 客户端，可实现点播和下载美剧电影等功能。

### 平台支持

| Windows | Mac OS | Linux | Browser | 
| - | - | - | - |
| ✔ | ✔ | ✍ | ✔ |

### 功能完整程度

- [x] 基础观看功能
- [x] 各类 Scheme 打开方式
- [x] 登录功能，登陆等级高的账号后能观看更多剧集
- [x] 移动端界面优化
- [x] 迅雷批量下载
- [x] 浏览器端支持
- [x] Mac OS
- [ ] 收藏功能
- [ ] Linux 客户端
- [ ] 自动更新
- [ ] 单元测试
- [ ] api没有token自动失效机制

### 界面

![screenshot_desktop](./screenshot_desktop.jpg)

<img src="./screenshot_mobile.png" width="400"/>

### 使用

1. 下载对应平台的 [release](https://github.com/shoyuf/yyets-clean/releases) 版本

2. 前往 [http://yyets.shoyuf.top](http://yyets.shoyuf.top) 使用在线版本 **不推荐，可能服务存在不稳定性**

### 构建

`Node.js` 版本大于 `8.11.x` ，建议使用 `Yarn`

执行 `yarn build:electron`

### 鸣谢

- [Vue.js](https://vuejs.org/)
- [Electron](https://electronjs.org/)
- [Element](https://element.eleme.io/)
- [electron-builder](https://www.electron.build/)
- [Vue CLI 3](https://cli.vuejs.org/)
- [Vue CLI Plugin Electron Builder](https://nklayman.github.io/vue-cli-plugin-electron-builder)
- [axios](https://github.com/axios/axios)
- [Electron DevTools Installer](https://github.com/MarshallOfSound/electron-devtools-installer)

### License

MIT
