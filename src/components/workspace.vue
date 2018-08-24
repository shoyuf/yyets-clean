<style scoped>
#app {
  display: flex;
  height: 100%;
}
#app > div {
  box-shadow: 1px 1px 2px 1px rgba(178, 178, 178, 0.3);
  padding: 15px;
  overflow: auto;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f34f4f;
}
#one {
  flex: 0 0 360px;
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
.icon-button{
  padding-top: 0;
  padding-bottom: 0;
  height: 28px;
}
#menu{display: none}
@media screen and (max-width: 1024px) {
  #menu{
    display: block;
  }
  #app {
    flex-direction: column;
  }
  #app > #one,
  #app > #two {
    flex: 1;
  }
  #app > #three {
    height: 100%;
  }
}
</style>

<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#f34f4f" id="menu">
      <el-menu-item index="1">搜索</el-menu-item>
      <el-menu-item index="2">资源详情</el-menu-item>
      <el-menu-item index="3">剧集列表</el-menu-item>
    </el-menu>
    <div id="one" v-show="activeIndex === '1'">
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
    <div id="two" v-show="activeIndex === '2'" v-if="itemDeatil.detail.poster !== ''">
      <ul class="list">
        <div class="flex-center"><img :src="itemDeatil.detail.poster" alt="" width="200" style="min-height:266px;"></div>
        <p v-if="itemDeatil.detail.id">影片地址:
          <a href="javascript:void(0)" @click="hrefTo(`http://www.zimuzu.io/resource/${itemDeatil.detail.id}`)">链接</a>
        </p>
        <p v-if="itemDeatil.detail.cnname">中文名: {{itemDeatil.detail.cnname}}</p>
        <p v-if="itemDeatil.detail.enname">英文名: {{itemDeatil.detail.enname}}</p>
        <p v-if="itemDeatil.detail.channel_cn">频道: {{itemDeatil.detail.channel_cn}}</p>
        <p v-if="itemDeatil.detail.category">目录: {{itemDeatil.detail.category}}</p>
        <p v-if="itemDeatil.detail.favorite_status">收藏状态: {{itemDeatil.detail.favorite_status}}</p>
        <p v-if="itemDeatil.detail.play_status">当前状态: {{itemDeatil.detail.play_status}}</p>
        <!-- <p v-if="itemDeatil.detail.channel">channel: {{itemDeatil.detail.channel}}</p> -->
        <p v-if="detailInfo">{{detailInfo}}</p>
        <p v-if="itemDeatil.list">剧集：</p>
        <el-button v-for="item in itemDeatil.list" :key="item.id" @click="showSeasonDeatail(item)" :type="activeSeason.season === item.season ? 'success' :'default' " size="mini" style="margin:0 4px 4px 0;">{{item.season_name}}</el-button>
        <el-button v-for="item in itemDeatil.search_list" :key="item.webname" @click="hrefTo(item.address)" type="default" size="mini" style="margin:0 4px 4px 0;">{{item.webname}}</el-button>
      </ul>
    </div>
    <div id="three" v-show="activeIndex === '3'" v-if="seasonList">
      <p v-if="seasonList === 'null'">没有相关资源</p>
      <ul class="list" v-else>
        <el-button @click="thunderLinks" type="default" size="mini" style="margin-bottom:10px;">批量下载该列表（迅雷）</el-button>
        <li v-for="item in seasonList" :key="item.season" class="files-item">
          <p class="spisode-number">{{item.episode_name}}</p>
          <section v-for="(ite,key) in item.files" :key="key">
            <p>
              <span class="source-item">{{key}}</span>:
              <el-button-group v-for="it in ite" :key="it.address" style="margin:0 4px 4px 0;">
                <el-button @click="hrefTo(it.address)" type="default" size="mini">{{it.way_name}}<span v-if="it.size && it.size !== '0'">({{it.size}})</span> &nbsp;</el-button>
                <el-button @click="thunderLink(it)" class="icon-button" type="default" size="mini" v-if="it.address.indexOf('ed2k:') === 0||it.address.indexOf('magnet:') === 0">
                  <svg t="1535099216220" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2389" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><defs></defs><path d="M432.64 407.04s199.68-217.6 468.48-322.56c0 0 12.8-5.12 2.56 7.68s-56.32 84.48-66.56 97.28l-35.84 33.28 17.92-5.12-35.84 79.36-46.08 46.08 33.28-10.24-38.4 92.16-40.96 40.96 35.84-20.48s-17.92 38.4-35.84 66.56c0 0 163.84 17.92 302.08 81.92 0 0-76.8 20.48-107.52 28.16l-33.28-7.68 15.36 10.24-35.84 15.36c-2.56 0-28.16-7.68-40.96-2.56 0 0 15.36 5.12 17.92 10.24l-38.4 15.36s-7.68 5.12-15.36 5.12c-5.12 0-38.4-7.68-48.64-2.56 0 0 20.48 10.24 28.16 10.24 0 0-12.8 17.92-122.88 23.04 0 0 81.92 227.84 79.36 258.56-2.56 30.72-48.64-35.84-48.64-35.84s-69.12-76.8-89.6-92.16c-20.48-15.36-79.36-25.6-204.8-104.96s-125.44-181.76-117.76-230.4c7.68-48.64 7.68-84.48-23.04-94.72s-81.92-23.04-189.44-25.6c0 0-17.92-12.8 12.8-12.8 30.72 2.56 112.64 2.56 156.16-5.12 48.64-10.24 66.56-25.6 104.96-20.48 38.4 5.12 87.04 17.92 140.8 71.68z" fill="#f34f4f" p-id="2390"></path></svg>
                </el-button>
              </el-button-group>
            </p>
          </section>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
let shell;
if (window.navigator.userAgent.indexOf('Electron') !== -1) {
  // eslint-disable-next-line
  shell = require('electron').shell;
}

export default {
  name: 'workspace',
  data() {
    return {
      searchKey: process.env.NODE_ENV === 'development' ? '神盾局' : '',
      searchResults: [],
      itemDeatil: { detail: { poster: '' } },
      detailInfo: '',
      seasonList: null,
      activeSeason: { season: -1 },
      activeIndex: '1',
      innerWidth: window.innerWidth,
    };
  },
  methods: {
    handleSelect(e) {
      this.activeIndex = e;
    },
    async search() {
      if (this.searchKey === '') {
        this.$message.error('请输入要搜索的关键词');
        return;
      }
      const res = await this.$http.get(`/index.php?g=api/pv2&m=index&a=search&accesskey=519f9cab85c8059d17544947k361a827&limit=200&k=${
        this.searchKey
      }`);
      if (!res.data.data) this.$message.warning('没有相关结果');
      this.searchResults = res.data.data;
    },
    async detail(id) {
      this.activeIndex = '2';
      const res = await this.$http.get(`/index.php?g=api/pv2&m=index&a=resource&accesskey=519f9cab85c8059d17544947k361a827&id=${id}`);
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
    hrefTo(url) {
      if (window.navigator.userAgent.indexOf('Electron') !== -1) {
        shell.openExternal(url);
      } else {
        window.open(url);
      }
    },
    thunderLink(it) {
      window.thunderLink.newTask({
        downloadDir: 'yyets',
        tasks: [{
          name: it.name,
          url: it.address,
        }],
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
        const ed2kOrMag = el.files[type].find(ol => ol.address.indexOf('ed2k') === 0 || ol.address.indexOf('magnet') === 0) || { address: '' };
        arr.push({
          name: ed2kOrMag.name,
          url: ed2kOrMag.address,
        });
      });
      loading.close();
      console.log(JSON.parse(JSON.stringify(arr)));
      window.thunderLink.newTask({
        downloadDir: 'yyets',
        taskGroupName: this.activeSeason.season_name + this.itemDeatil.detail.cnname,
        tasks: arr,
      });
    },
  },
  mounted() {
    window.onresize = () => { this.innerWidth = window.innerWidth; };
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
