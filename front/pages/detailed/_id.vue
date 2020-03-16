<template>
    <section class="container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{articeData.type}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{articeData.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="detailed-title">{{articeData.title}}{{articeData.original?'':'(转载)'}}</div>
        <div class="list-icon center">
            <span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconriqi"></use>
                </svg>
                {{articeData.date|dateformat('YYYY-MM-DD')}}
            </span>
            <span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconwenjianjia"></use>
                </svg>
                {{articeData.type}}
            </span>
            <span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconhuo"></use>
                </svg>
                {{articeData.pv}}
            </span>
            <span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-"></use>
                </svg>
                {{articeData.tag.join('、')}}
            </span>
        </div>
        <div class="detailed-content">
            <p>
                <img :src="'/api/admin/file/download/'+articeData.picture" :alt="articeData.title">   
            </p>
            <div class="articles_abstract">{{articeData.abstract}}</div>
        </div>
        <div v-html="articeData.content" class="detailed-main"></div>
    </section>
</template>
<script>
//import {state} from "vuex";
export default {
    head(){
        return{
            title:this.articeData.title,
            meta:[{
                'name':'keywords',
                'content': this.articeData.tag.join('、')
            }]
        }
    },
    data() {
        return {
            articeData:'',
        }
    },
    validate ({ params, store }) {
        //校验 `params.id` 是否存在
        return store.state.articesIds.indexOf(params.id) != -1
    },
    async asyncData (context) {
        let[res1] = await Promise.all([
            // 获取文章数据
            context.$axios.get(`/front/searchArtice`,{params:{id:context.params.id}}).then(res => {
                return res
            })
        ])
        return{
            articeData : res1.data[0]
        }
    },
    mounted(){
        //百度推送连接
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        }
        else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
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
    line-height: 1.4rem;
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
    color: #6f6f6f;
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
    color: #6f6f6f;
    line-height: 1.6rem;
}
.detailed-main{
    border-top: 1px solid #d9dada;
    padding: 1.3rem;
    margin-bottom: 2rem;
    margin-top: 2rem;
    -webkit-margin-bottom-collapse: 2rem;
    font-size: 1.05rem;
    color: #404040;
    line-height: 2.2rem;
}
.detailed-main::-webkit-scrollbar{
    background-color:  #333;
}
</style>