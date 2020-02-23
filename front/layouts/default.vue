<template>
  <div>
    <index_header id="index_header"/>
    <div class="comm-main">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="18">
          <div>
            <nuxt />
          </div>
        </el-col>
        <el-col :xs="0" :sm="6">
          <div id="notice">
            <div class="sidebar-list">
              <div class="header">
                <p>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icongonggao"></use>
                  </svg>博主简介
                </p>
              </div>
              <div class="content" style="text-indent: 2.0rem;">
                一位专注全栈技术的前端工程师，整理工作所遇的各种所遇问题，分享个人个心得体会。
                <p>前端即兴趣，兴趣即未来！！！</p>
                <p>网站源码：
                  <a href="https://github.com/qianlei321/nuxt-blog" target="_blank">
                    <img alt="GitHub stars" src="https://img.shields.io/github/stars/qianlei321/nuxt-blog.svg?style=social">
                  </a>
                </p>
                
              </div>
            </div>
            <div class="sidebar-list notice">
              <div class="header">
                <p>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconbaifangtongjis"></use>
                  </svg>统计
                </p>
              </div>
              <ul class="content">
                <li class="list">分类：{{MenuNum}}个</li>
                <li class="list">文章：{{ArticleNum}}个</li>
                <li class="list">标签：{{TagNum}}个</li>
                <li class="list">最后更新时间：<br/>{{LastArticleDate|dateformat()}}</li>
              </ul>
            </div>
            <div class="sidebar-list">
              <div class="header">
                <p>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-"></use>
                  </svg>标签云
                  <nuxt-link :to="'/tags'" class="tags_more">更多</nuxt-link>
                </p>
              </div>
              <div class="content">
                <ul class="content_icon">
                  <li :key="index" :class="'color_'+index%4" v-for="(item,index) in Icon15" @click="clickTag(item.name)">
                    {{item.name}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
        </el-col>
      </el-row>
    </div>
    <index_footer/>
  </div>
</template>
<script>
import index_header from '~/components/header.vue'
import index_footer from '~/components/footer.vue'
export default {
  components: {
    index_header,
    index_footer
  },
  data() {
    return {
      MenuNum:0,
      ArticleNum:0,
      TagNum:0,
      LastArticleDate:'',
      Icon15:[],
      color_0:'color_0',
      color_1:'color_1',
      color_2:'color_2',
      color_3:'color_3',
    }
  },
  methods:{
    clickTag(name){
      this.$router.push('/category_tags/'+name)
    }
  },
  mounted(){
    //header吸顶
    var a;
    var title = document.getElementById('index_header');
    var v = title.offsetTop;//存储原来的距离顶部的距离
    window.onscroll = function(){
        a = document.documentElement.scrollTop;//存储滚动高度
        if(a>v){
            title.style.position = 'fixed';
            title.style.top = 0;
        }else if(title.style.position != 'static'){
            title.style.position = 'static';
        }
    }
    //获取分类数量
    this.$axios.get('/front/searchAllMenuNum').then(res => {
        this.MenuNum = res.data.count
    })
    //获取文章数量
    this.$axios.get('/front/searchAllArticleNum').then(res => {
        this.ArticleNum = res.data.count
    })
    //获取标签数量
    this.$axios.get('/front/searchAllTagNum').then(res => {
        this.TagNum = res.data.count
    })
    //查询最后文章创建时间
    this.$axios.get('/front/searchLastArticleDate').then(res => {
        this.LastArticleDate = res.data.date
    })
    //查询前15个标签
    this.$axios.get('/front/searchIcon15').then(res => {
        this.Icon15 = res.data.date
    })
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body{
  background-color:#f4f5f5;
  font-family: "-apple-system,system-ui,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif"
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.comm-main{
  margin-top: .5rem !important;
  max-width: 1100px;
  margin: 0 auto;
}
.sidebar-list {
    margin-top: 7px;
    padding: 10px;
    border-radius: 4px;
    background: #fff;
}
.sidebar-list .header {
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #e9eaed;
}
.content{
  font-size: 14px;
  color: #666;
}
.content_icon{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-left: 0px;
}
.content_icon li{
  list-style: none;
  margin: 10px 5px 0 0;
  padding: 3px 6px;
  border-radius: 4px;
  cursor: pointer;
}
.color_0{
  background: #f5cd79;
}
.color_1{
  background: #778beb;
}
.color_2{
  background: #20bf6b;
}
.color_3{
  background: #79f5f5;
}
.tags_more{
  float: right;
  text-decoration: none;
  -webkit-transition: .5s;
  transition: .5s;
  color: #666;
}
</style>
