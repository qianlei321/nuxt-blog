<template>
  <section class="container">
    <div class="all-list-header">
      <div class="list-header">所有文章</div>
    </div>
    <div class="articles_div" :key="index" v-for="(item,index) in articesData">
      <div class="articles_header">
        <span class="classify">{{item.type}}</span>
        <nuxt-link :to="'/detailed/'+item._id">{{item.title}}</nuxt-link>
        <!-- <a :href="'/detailed/'+item._id">{{item.title}}</a> -->
      </div>
      <div class="list-icon">
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconriqi"></use>
          </svg>
          {{item.date|dateformat('YYYY-MM-DD')}}
        </span>
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconhuo"></use>
          </svg>
          {{item.pv}}
        </span>
      </div>
      <p>
        <img :src="'/api/admin/file/download/'+item.picture" :alt="item.title" class="articles_img">
      </p>
      <div class="articles_abstract">{{item.abstract}}</div>
      <div class="articles_line"></div>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="currentChange"
        :page-size="pageSize"
        :current-page="pageNo"
        :total="total">
      </el-pagination>
    </div>
    
  </section>
</template>
<script>

export default {
  data() {
    return {
      articesData:null,
      total:0,
      pageNo:1,
      pageSize:10,
    }
  },
  methods:{
    currentChange(val){
      this.pageNo = val
      this.$axios.get('/front/ArticesByPage',{params:{pageNo:this.pageNo,pageSize:this.pageSize}}).then(res => {
        this.articesData = res.data.data
      })
    }
  },
  async asyncData (context) {
    let[res1] = await Promise.all([
        // 获取文章数据
        context.$axios.get(`/front/ArticesByPage`,{params:{pageNo:1,pageSize:10}}).then(res => {
            return res
        })
    ])
    return{
        articesData : res1.data.data,
        total : res1.data.total
    }
  },
  mounted(){
  

  }
}

</script>
<style>
.container{
  background-color: #FFF;
  padding: .3rem;
  border-radius: .3rem;
  border: 1px solid #eee;
  margin-top:5px;
  margin-bottom: 16px;
}
.all-list-header{
  border-bottom:1px solid #e8e8e8;
  padding:12px 0;
}
.articles_header{
  font-size: 1.4rem;
  color: #1e90ff;
  padding: 0 0.5rem;
  margin-top: 1.3rem;
}
.articles_header a{
  color: #1890ff;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    -webkit-transition: color 0.3s;
    transition: color 0.3s;
    -webkit-text-decoration-skip: objects;
}
.articles_header .classify{
  position: relative;
    margin-right: 10px;
    padding: 3px 5px;
    background-color: #9466ff;
    border-radius: 3px;
    font-size: 12px;
    color: #fff;
}
.articles_header .classify:after{
  content: "";
  position: absolute;
  right: -10px;
  top: 50%;
  border: 5px solid transparent;
  border-left-color: #17af91;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.articles_abstract{
  font-size: 1.0rem;
  text-indent:2.0rem;
  color: #6f6f6f;
  line-height: 1.6rem;
}
.articles_div{
  margin: 1rem 0;
}
.articles_div .articles_img{
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ccc;
    max-width: 1000px !important;
    display: block;
    margin: 8px auto;
}
.list-icon{
    padding: .5rem 0;
    color: #6f6f6f;
    text-align:right;
}
.articles_line{
  height: 1.3rem;
  width: 100%;
  background-color: #f4f5f5;
  margin-top: 15px;
}
.pagination{
  text-align: center;
}
</style>
