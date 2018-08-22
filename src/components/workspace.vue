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
  background-color: #f56c6c;
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
  border: 1px solid #f56c6c;
  padding: 0 2px;
  color: #f56c6c;
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
  color: #f56c6c;
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
@media screen and (max-width: 1024px) {
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
    <div id="one">
      <div class="row">
        <el-input v-model="searchKey" placeholder="search content" size="small" @keyup.enter.native="search"></el-input>
        <el-button @click="search" size="small" style="margin-left:10px;">search</el-button>
      </div>
      <ul class="list">
        <li class="click search-item" v-for="item in searchResults" :key="item.id" @click="detail(item.id)">
          <span class="label">{{item.channel_cn}}</span>&nbsp;
          <span class="title" :title="item.title">{{item.title}}</span>
        </li>
      </ul>
    </div>
    <div id="two" v-if="itemDeatil.detail.poster !== ''">
      <ul class="list">
        <div class="flex-center"><img :src="itemDeatil.detail.poster" alt="" width="200" style="min-height:266px;"></div>
        <p v-if="itemDeatil.detail.id">影片地址: <a :href="`http://www.zimuzu.io/resource/${itemDeatil.detail.id}`" target="_blank">链接</a></p>
        <p v-if="itemDeatil.detail.cnname">中文名: {{itemDeatil.detail.cnname}}</p>
        <p v-if="itemDeatil.detail.enname">英文名: {{itemDeatil.detail.enname}}</p>
        <p v-if="itemDeatil.detail.channel_cn">频道: {{itemDeatil.detail.channel_cn}}</p>
        <p v-if="itemDeatil.detail.category">目录: {{itemDeatil.detail.category}}</p>
        <p v-if="itemDeatil.detail.favorite_status">收藏状态: {{itemDeatil.detail.favorite_status}}</p>
        <p v-if="itemDeatil.detail.play_status">当前状态: {{itemDeatil.detail.play_status}}</p>
        <!-- <p v-if="itemDeatil.detail.channel">channel: {{itemDeatil.detail.channel}}</p> -->
        <p v-if="detailInfo">{{detailInfo}}</p>
        <p v-if="itemDeatil.list">剧集：</p>
        <el-button v-for="item in itemDeatil.list" :key="item.id" @click="showSeasonDeatail(item.season)" :type="activeSeason === item.season ? 'success' :'primary' " size="mini" style="margin:0 4px 4px 0;">{{item.season_name}}</el-button>
        <el-button v-for="item in itemDeatil.search_list" :key="item.webname" @click="hrefTo(item.address)" type="primary" size="mini" style="margin:0 4px 4px 0;">{{item.webname}}</el-button>
      </ul>
    </div>
    <div id="three" v-if="seasonList">
      <p v-if="seasonList === 'null'">没有相关资源</p>
      <ul class="list" v-else>
        <li v-for="item in seasonList" :key="item.season" class="files-item">
          <p class="spisode-number">{{item.episode_name}}</p>
          <section v-for="(ite,key) in item.files" :key="key">
            <p>
              <span class="source-item">{{key}}</span>:
              <el-button v-for="it in ite" :key="it.address" @click="hrefTo(it.address)" type="primary" size="mini" style="margin:0 4px 4px 0;">{{it.way_name}}
                <span v-if="it.size">({{it.size}})</span> &nbsp;</el-button>
            </p>
          </section>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'workspace',
  data() {
    return {
      searchKey: '',
      searchResults: [],
      itemDeatil: { detail: { poster: '' } },
      detailInfo: '',
      seasonList: null,
      activeSeason: null,
    };
  },
  methods: {
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
      const res = await this.$http.get(`/index.php?g=api/pv2&m=index&a=resource&accesskey=519f9cab85c8059d17544947k361a827&id=${id}`);
      this.itemDeatil = res.data.data;
      this.detailInfo = res.data.info;
    },
    showSeasonDeatail(season) {
      this.activeSeason = season;
      if (!Object.prototype.hasOwnProperty.call(this.itemDeatil, 'list')) {
        return;
      }
      const findRes = this.itemDeatil.list.find(el => el.season === season);
      if (findRes && findRes.episodes) this.seasonList = findRes.episodes;
      else this.seasonList = 'null';
    },
    hrefTo(url) {
      window.open(url);
    },
  },
  mounted() {},
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
