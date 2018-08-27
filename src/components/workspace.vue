<style scoped>
#app {
  display: flex;
  height: 100%;
}
#main {
  display: flex;
}
#one,
#two,
#three {
  padding: 15px;
  box-shadow: 1px 1px 2px 1px rgba(178, 178, 178, 0.3);
  overflow-y: auto;
}
#one {
  flex: 0 0 300px;
}
#two {
  flex: 0 0 240px;
}
#three {
  flex: 1;
}
.label {
  border: 1px solid #f34f4f;
  padding: 0 2px;
  color: #f34f4f;
  border-radius: 2px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 3em;
  text-align: center;
}
.title {
  text-decoration: underline;
  cursor: pointer;
}
.row {
  display: flex;
  margin: 10px 0;
}
.search-item {
  white-space: nowrap;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  margin-bottom: 4px;
  width: 300px;
}
.files-item {
  margin-bottom: 10px;
  position: relative;
  box-shadow: 2px 2px 4px 1px rgba(178, 178, 178, 1);
  padding: 6px 12px 4px;
}
.spisode-number {
  white-space: nowrap;
  height: 28px;
  line-height: 28px;
  padding: 0 4px;
  margin-bottom: 4px;
  position: absolute;
  right: 0;
  top: 0;
  color: #f34f4f;
}
.source-item {
  color: #909399;
  width: 2em;
  height: 28px;
  line-height: 28px;
  padding: 0 4px;
}
#two > .list > p {
  margin: 10px 0;
}
.thunder-button {
  padding-top: 0;
  padding-bottom: 0;
  height: 28px;
}
@media screen and (max-width: 1024px) {
  #main {
    flex-direction: column;
  }
  #main > #one,
  #main > #two {
    flex: 1;
  }
  #main > #three {
    height: 100%;
  }
}
/** next **/
.el-header {
  display: flex;
}
.el-header .el-icon-menu {
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #545c64;
  color: #f34f4f;
}
.el-header #menu {
  flex: 1;
}
#hidebar {
  opacity: 0;
  visibility: hidden;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  background-color: #fff;
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
  align-items: center;
}
#hidebar p,
#hidebar img {
  margin-bottom: 10px;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  opacity: 0;
  visibility: hidden;
  z-index: 11;
  transition: all 0.3s ease-out;
}
.mask.on,
#hidebar.on {
  opacity: 0.618;
  visibility: visible;
}
#hidebar.on {
  opacity: 1;
}
#logout {
  position: absolute;
  right: 15px;
  bottom: 15px;
  cursor: pointer;
}
</style>

<template>
  <div id="app">
    <el-container direction="vertical">
      <el-header class="el-header">
        <div class="el-icon-menu" @mouseover="showHideBar = true"></div>
        <h1 v-if="innerWidth > 1024" style="background-color:#545c64;line-height:60px;color:#fff;">YYeTs-clean</h1>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#f34f4f" id="menu">
          <el-menu-item index="1" v-if="innerWidth < 1024">搜索</el-menu-item>
          <el-menu-item index="2" v-if="innerWidth < 1024">资源详情</el-menu-item>
          <el-menu-item index="3" v-if="innerWidth < 1024">剧集列表</el-menu-item>
        </el-menu>
      </el-header>
      <el-main id="main">
        <div id="one" v-show="innerWidth > 1024 || activeIndex === '1'" v-loading="loading1">
          <div class="row">
            <el-input v-model="searchKey" placeholder="search content" size="small" @keyup.enter.native="search"></el-input>
            <el-button @click="search" size="small" style="margin-left:10px;">搜索</el-button>
          </div>
          <ul class="list">
            <li class="click search-item" v-for="item in searchResults" :key="item.id" @click="detail(item.id)">
              <span class="label">{{item.channel_cn}}</span>&nbsp;
              <span class="title" :title="item.title">{{item.title}}</span>
            </li>
          </ul>
        </div>
        <div id="two" v-show="innerWidth > 1024 || activeIndex === '2'" v-if="itemDeatil.detail.poster !== ''" v-loading="loading2">
          <ul class="list">
            <div class="flex-center"><img :src="itemDeatil.detail.poster" alt="" width="200" style="min-height:266px;"></div>
            <p v-if="itemDeatil.detail.id">影片地址:
              <a href="javascript:void(0)" @click="$openUrl(`http://www.zimuzu.io/resource/${itemDeatil.detail.id}`)">链接</a>
            </p>
            <p v-if="itemDeatil.detail.cnname">中文名: {{itemDeatil.detail.cnname}}</p>
            <p v-if="itemDeatil.detail.enname">英文名: {{itemDeatil.detail.enname}}</p>
            <p v-if="itemDeatil.detail.channel_cn">频道: {{itemDeatil.detail.channel_cn}}</p>
            <p v-if="itemDeatil.detail.category">目录: {{itemDeatil.detail.category}}</p>
            <p v-if="itemDeatil.detail.favorite_status">收藏状态: {{itemDeatil.detail.favorite_status}}</p>
            <p v-if="itemDeatil.detail.play_status">当前状态: {{itemDeatil.detail.play_status}}</p>
            <!-- <p v-if="itemDeatil.detail.channel">channel: {{itemDeatil.detail.channel}}</p> -->
            <p v-if="detailInfo" style="color:#f34f4f">{{detailInfo}}</p>
            <p v-if="itemDeatil.list">剧集：</p>
            <el-button v-for="item in itemDeatil.list" :key="item.id" @click="showSeasonDeatail(item)" :type="activeSeason.season === item.season ? 'success' :'default' " size="mini" style="margin:0 4px 4px 0;">{{item.season_name}}</el-button>
            <el-button v-for="item in itemDeatil.search_list" :key="item.webname" @click="$openUrl(item.address)" type="default" size="mini" style="margin:0 4px 4px 0;">{{item.webname}}</el-button>
          </ul>
        </div>
        <div id="three" v-show="innerWidth > 1024 || activeIndex === '3'" v-if="seasonList">
          <p v-if="seasonList === 'null'">没有相关资源</p>
          <ul class="list" v-else>
            <el-button @click="thunderLinks" type="default" size="mini" style="margin-bottom:10px;">批量下载该列表（迅雷）</el-button>
            <li v-for="item in seasonList" :key="item.season" class="files-item">
              <p class="spisode-number">{{item.episode_name}}</p>
              <section v-for="(ite,key) in item.files" :key="key">
                <p>
                  <span class="source-item">{{key}}</span>:
                  <el-button-group v-for="it in ite" :key="it.address" style="margin:0 4px 4px 0;">
                    <el-button @click="$openUrl(it.address)" type="default" size="mini">{{it.way_name}}
                      <span v-if="it.size && it.size !== '0'">({{it.size}})</span> &nbsp;</el-button>
                    <el-button @click="thunderLink(it)" class="thunder-button" type="default" size="mini" v-if="it.address.indexOf('ed2k:') === 0||it.address.indexOf('magnet:') === 0">
                      <svg t="1535099216220" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2389" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16">
                        <defs></defs>
                        <path d="M432.64 407.04s199.68-217.6 468.48-322.56c0 0 12.8-5.12 2.56 7.68s-56.32 84.48-66.56 97.28l-35.84 33.28 17.92-5.12-35.84 79.36-46.08 46.08 33.28-10.24-38.4 92.16-40.96 40.96 35.84-20.48s-17.92 38.4-35.84 66.56c0 0 163.84 17.92 302.08 81.92 0 0-76.8 20.48-107.52 28.16l-33.28-7.68 15.36 10.24-35.84 15.36c-2.56 0-28.16-7.68-40.96-2.56 0 0 15.36 5.12 17.92 10.24l-38.4 15.36s-7.68 5.12-15.36 5.12c-5.12 0-38.4-7.68-48.64-2.56 0 0 20.48 10.24 28.16 10.24 0 0-12.8 17.92-122.88 23.04 0 0 81.92 227.84 79.36 258.56-2.56 30.72-48.64-35.84-48.64-35.84s-69.12-76.8-89.6-92.16c-20.48-15.36-79.36-25.6-204.8-104.96s-125.44-181.76-117.76-230.4c7.68-48.64 7.68-84.48-23.04-94.72s-81.92-23.04-189.44-25.6c0 0-17.92-12.8 12.8-12.8 30.72 2.56 112.64 2.56 156.16-5.12 48.64-10.24 66.56-25.6 104.96-20.48 38.4 5.12 87.04 17.92 140.8 71.68z" fill="#f34f4f" p-id="2390"></path>
                      </svg>
                    </el-button>
                  </el-button-group>
                </p>
              </section>
            </li>
          </ul>
        </div>
      </el-main>
    </el-container>
    <div class="mask" :class="{'on':showHideBar}" @mouseover="showHideBar = false"></div>
    <el-menu id="hidebar" :class="{'on':showHideBar}">
      <img :src="userInfo.userpic" alt="" width="100">
      <p v-if="userInfo.nickname">昵称:{{userInfo.nickname}}</p>
      <p v-if="userInfo.point">积分:{{userInfo.point}}</p>
      <p v-if="userInfo.group_name">用户组:{{userInfo.group_name}}</p>
      <el-popover
        placement="bottom"
        title="为什么要登录"
        width="200"
        trigger="hover"
        content="建议使用账号登录后搜索，权限更高，内容更多。"
        v-else>
        <el-button slot="reference" @click="showLogin = true" >登录</el-button>
      </el-popover>
      <svg t="1535357328421" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4204" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" id="logout" @click="logout">
        <defs></defs>
        <path d="M810.666667 512l-170.666667-170.666667v128H341.333333v85.333334h298.666667v128z" fill="#606266" p-id="4423"></path><path d="M170.666667 170.666667v682.666666a42.666667 42.666667 0 0 0 42.666666 42.666667h298.666667v-85.333333H256V213.333333h256V128H213.333333a42.666667 42.666667 0 0 0-42.666666 42.666667z" fill="#606266" p-id="4424"></path>
      </svg>
    </el-menu>
    <login-component @close="loginChange" v-if="showLogin"></login-component>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <p><b>本应用为非官方人员开发，承诺不会收集用户隐私。</b></p>
      <p>建议使用账号登录后搜索，权限更高，内容更多。</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="noDialogMore">不再提示</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import loginComponent from './login.vue';

export default {
  name: 'workspace',
  components: {
    'login-component': loginComponent,
  },
  data() {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || {
      userpic: 'http://files.zmzjstu.com/ftp/avatar/f_noavatar_s.gif',
    };
    return {
      dialogVisible: false,
      searchKey: process.env.NODE_ENV === 'development' ? '逍遥法外' : '',
      searchResults: [],
      itemDeatil: { detail: { poster: '' } },
      seasonList: null,
      detailInfo: '',
      activeSeason: { season: -1 },
      activeIndex: '1',
      innerWidth: window.innerWidth,
      showHideBar: false,
      showLogin: false,
      loading1: false,
      loading2: false,
      userInfo,
    };
  },
  methods: {
    noDialogMore() {
      window.localStorage.setItem('noDialogMore', 1);
      this.dialogVisible = false;
    },
    logout() {
      this.showHideBar = false;
      this.showLogin = false;
      this.seasonList = null;
      this.activeSeason = { season: -1 };
      this.userInfo = {
        userpic: 'http://files.zmzjstu.com/ftp/avatar/f_noavatar_s.gif',
      };
      if (this.itemDeatil.detail.id) this.detail(this.itemDeatil.detail.id);
      window.localStorage.removeItem('userInfo');
      this.$message({
        message: '登出成功',
        type: 'success',
      });
    },
    loginChange(info) {
      this.showHideBar = false;
      this.showLogin = false;
      this.seasonList = null;
      this.activeSeason = { season: -1 };
      if (info) this.userInfo = info;
      if (this.itemDeatil.detail.id) this.detail(this.itemDeatil.detail.id);
    },
    handleSelect(e) {
      if (this.innerWidth < 1024) {
        this.activeIndex = e;
      }
    },
    async search() {
      if (this.searchKey === '') {
        this.$message.error('请输入要搜索的关键词');
        return;
      }
      this.loading1 = true;
      const res = await this.$http.get('/index.php', {
        params: {
          a: 'search',
          limit: 200,
          k: this.searchKey,
        },
      });
      this.loading1 = false;
      if (!res.data.data) this.$message.warning('没有相关结果');
      this.searchResults = res.data.data;
    },
    async detail(id) {
      this.activeIndex = '2';
      this.loading2 = true;
      const res = await this.$http.get('/index.php', {
        params: {
          a: 'resource',
          id,
        },
      });
      this.loading2 = false;
      this.itemDeatil = res.data.data;
      this.detailInfo = res.data.info;
    },
    showSeasonDeatail(item) {
      this.activeIndex = '3';
      this.activeSeason = item;
      if (!Object.prototype.hasOwnProperty.call(this.itemDeatil, 'list')) {
        return;
      }
      const findRes = this.itemDeatil.list.find(el => el.season === item.season);
      if (findRes && findRes.episodes) this.seasonList = findRes.episodes;
      else this.seasonList = 'null';
    },
    thunderLink(it) {
      window.thunderLink.newTask({
        downloadDir: 'yyets',
        tasks: [
          {
            name: it.name,
            url: it.address,
          },
        ],
      });
    },
    thunderLinks() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      const arr = [];
      this.activeSeason.episodes.forEach((el) => {
        let type;
        for (const c in el.files) {
          if (c !== 'APP') {
            type = c;
            break;
          }
        }
        const ed2kOrMag = el.files[type].find(ol =>
          ol.address.indexOf('ed2k') === 0 ||
            ol.address.indexOf('magnet') === 0) || { address: '' };
        arr.push({
          name: ed2kOrMag.name,
          url: ed2kOrMag.address,
        });
      });
      loading.close();
      window.thunderLink.newTask({
        downloadDir: 'yyets',
        taskGroupName:
          this.activeSeason.season_name + this.itemDeatil.detail.cnname,
        tasks: arr,
      });
    },
    async checkLoginStatus() {
      if (!window.localStorage.getItem('userInfo')) return;
      const res = await this.$http.get('/index.php', {
        params: {
          a: 'fav_list_v2',
        },
      });
      if (res.data.status !== 1) {
        window.localStorage.removeItem('userInfo');
        this.$notify.warning({
          title: '登录状态失效',
          message: '需要重新登录',
          showClose: false,
          duration: 2000,
          onClose() {
            window.location.reload();
          },
        });
      }
    },
  },
  created() {
    this.checkLoginStatus();
  },
  mounted() {
    window.onresize = () => {
      this.innerWidth = window.innerWidth;
    };
    if (!window.localStorage.getItem('noDialogMore')) this.dialogVisible = true;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
