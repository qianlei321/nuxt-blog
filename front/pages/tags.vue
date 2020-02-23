<template>
    <section class="container">
        <h2 class="title"><span>标签云</span></h2>
        <ul class="content_icon">
            <li :key="index" :class="'color_'+index%4" v-for="(item,index) in tagsData" @click="clickTag(item.name)">
                {{item.name}}
            </li>
        </ul>
    </section>
</template>
<script>

export default {
    data() {
        return {
            tagsData:[],
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
    async asyncData (context) {
        let[res1] = await Promise.all([
            // 获取所有标签数据
            context.$axios.get(`/front/allTags`).then(res => {
                return res
            })
        ])
        return{
            tagsData : res1.data.date
        }
    },
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
.content_icon li{
    cursor: pointer;
}
.container .title{
    margin-bottom: 30px;
    font-size: 20px;
    text-align: center;
}
.container .title:after {
    content: "";
    display: block;
    width: 20px;
    height: 2px;
    margin: 5px auto 0;
    background: #666;
}
</style>
