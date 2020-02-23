<template>
    <section class="container">
        <div class="all-list-header">
            <div class="list-header">当前标签：{{categoryName}}</div>
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
        <div class="noData" v-if="articesData.length == 0">
            啊哦，暂无数据~
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
//import {state} from "vuex";
export default {
    data() {
        return {
            articesData:[],
            categoryName:'',
            total:0,
            pageNo:1,
            pageSize:20,
        }
    },
    validate ({ params, store }) {
        //校验 `params.name ` 是否存在
        var is = false
        store.state.tagsData.forEach(element => {
            if(element == params.name){
                is = true
            }
        });
        return is
    },
    methods:{
        currentChange(val){
            this.pageNo = val
            this.$axios.get('/front/tags_ArticesByPage',{params:{pageNo:this.pageNo,pageSize:this.pageSize,name:this.categoryName}}).then(res => {
                this.articesData = res.data.data
            })
        }
    },
    async asyncData (context) {
        let res1 = context.params.name
        let[res2] = await Promise.all([
            // 获取文章数据
            context.$axios.get(`/front/tags_ArticesByPage`,{params:{pageNo:1,pageSize:20,name:context.params.name}}).then(res => {
                return res
            })
        ])
        return{
            categoryName : res1,
            articesData : res2.data.data,
            total : res2.data.total
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
    color: #888;
    line-height: 1.6rem;
}
.articles_div{
    margin: 2rem 0;
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
    color: #ccc;
    text-align:right;
}
.articles_line{
    height: 1.3rem;
    width: 100%;
    background-color: #f4f5f5;
}
pre.ql-syntax {
    background-color: #4b4b59;
    color: #f8f8f2;
    overflow: visible;
    padding: .5rem !important;
    overflow-y: auto;
    font-weight: 300;
    font-family: Menlo, monospace;
    border-radius: .3rem;
    font-size: 1rem;
}
.container .el-breadcrumb{
    padding: .8rem;
    border-bottom: 1px solid #eee;
    background-color: #e1f0ff;
    font-size: 15px;
}
.detailed-title{
    font-size: 1.6rem;
    text-align: center;
    padding: 1rem;
}
.center{
    text-align: center;
}
.list-icon {
    padding: .5rem 0;
    color: #ccc;
}
.list-icon span {
    display: inline-block;
    padding: 0 10px;
}
.detailed-content {
    padding: 1.3rem;
    font-size: 1.05rem;
    color: #777;
    line-height: 1.9rem;
}
.detailed-content p {
    margin-top: 0;
    margin-bottom: 1em;
}
.detailed-content img {
    width: 100%;
    border: 1px solid #f3f3f3;
}
.articles_abstract{
    font-size: 1.0rem;
    text-indent:2.0rem;
    color: #888;
    line-height: 1.6rem;
}
.detailed-main{
    border-top: 1px solid #d9dada;
    padding: 1.3rem;
    margin-bottom: 2rem;
    margin-top: 2rem;
    -webkit-margin-bottom-collapse: 2rem;
    color: #333;
    font-size: 1.3rem;
    font-weight: bold;
}
.detailed-main::-webkit-scrollbar{
    background-color:  #333;
}
.noData{
    text-align: center;
    padding:3.125rem;
}
.pagination{
    text-align: center;
}
</style>