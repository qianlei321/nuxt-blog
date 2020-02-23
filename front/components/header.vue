<template>
    <div class="index_header">
        <div class="header-center">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="7">
                    <img src="@/assets/img/logo.png" class="myIcon" alt="">
                    <span class="myIcon_span">— 记录问题，分享知识</span>
                </el-col>
                <el-col :xs="0" :sm="17">
                    <el-menu :default-active="activeIndex" class="header-menu" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="index">
                            <!-- <a href="/">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconzhuye-"></use>
                                </svg>首页
                            </a> -->
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconzhuye-"></use>
                            </svg>首页
                            </el-menu-item>
                        <el-submenu :index="item.name" :key="index+2" v-for="(item,index) in this.$store.state.menuData" :show-timeout="100" :hide-timeout="100">
                            <template slot="title">{{item.name}}</template>
                                <el-menu-item :index="item_child.name" :key="index_child+2" v-for="(item_child,index_child) in item.children">{{item_child.name}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                menuData:[],
                activeIndex:"1",
            }
        },
        methods:{
            handleSelect(key, keyPath) {
                if(key == 'index'){
                    this.$router.push('/')
                }else{
                    this.$router.push('/category/'+key)
                }
            }
        },
        beforemounted(){
            console.log(33,store)
        },
        mounted(){
            // this.$axios.get('/front/searchAllMenu').then(res => {
            //     this.menuData = res.data
            // })
            this.menuData = this.$store.state.menuData
        }
    }
</script>
<style scope>
.index_header{
    width: 100%;
    background-color: #fff;
    padding: 0 .4rem .4rem .4rem;
    overflow: hidden;
    height: 3.2rem;
    border-bottom: 1px solid #eee;
    z-index:999;
}
.header-center{
    max-width: 1100px;
    margin: 0 auto;
}
.header-menu{
    float: right;
    padding-top: .3rem;
    margin-right: 10px;
}
.index_header a {
    text-decoration: none;
}
.index_header a:link {
    text-decoration: none;
}
.index_header a:visited {
    text-decoration: none;
}
.index_header a:hover {
    text-decoration: none;
}
.index_header a:active {
    text-decoration: none;
}
.el-menu--horizontal>.el-menu-item a, .el-menu--horizontal>.el-menu-item a:hover{
    color: #909399;
}
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
    border-bottom:none;
}
.el-menu--horizontal>.el-menu-item{
    height:40px;
    line-height: 40px;
}
.el-menu--horizontal>.el-submenu .el-submenu__title{
    height:42px;
    line-height: 42px;
    font-size:16px;
}
.header-menu .el-menu-item{
    border-bottom-color:#ffffff!important;
    font-size: 16px;
}
.el-menu.el-menu--horizontal{
    border-bottom:none;
}
.el-menu--horizontal .el-menu-item:hover{
    font-size: 18px;
}
.myIcon{
    width: 69px;
}
.myIcon_span{
    color: #00afef;
    font-weight: 600;
}
</style>
