<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="newArticle">新建文章</el-button>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="primary" icon="search" @click="reset">重置</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" >
                <el-table-column type="index" width="55" align="center"></el-table-column>
                <el-table-column prop="title" label="标题" >
                </el-table-column>
                <el-table-column prop="pv" label="浏览量">
                </el-table-column>
                <el-table-column prop="likeNum" label="点赞量">
                </el-table-column>
                <el-table-column prop="createTime" label="状态" sortable>
                    <template slot-scope="scope">
                        {{scope.row.publish?'已发布':'未发布'}}
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="分类" sortable>
                </el-table-column>
                <el-table-column prop="tag" label="标签" sortable>
                    <template slot-scope="scope">
                        <label :key="index" v-for='(item,index) in scope.row.tag'>
                            <el-tag type="success">{{item}}</el-tag>
                        </label>                 
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="创建时间" sortable>
                    <template slot-scope="scope">
                        {{scope.row.date|dateformat()}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="220" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="fa fa-refresh" @click="change(scope.$index, scope.row)">更改状态</el-button>
                        <el-button type="text" icon="fa fa-edit" @click="clickEdit(scope.$index, scope.row)">更改内容</el-button>
                        <el-button type="text" icon="fa fa-trash" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="pageSize" :total="total" :current-page='pageNum'>
                </el-pagination>
            </div>
        </div>

        <el-dialog center :visible.sync="visible" width="80%" top='25px'>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="类型">
                    <span class="type_class">{{form.type?form.type:'无'}}</span>
                    <el-cascader
                        v-model="form.temp_type"
                        style="width:140px"
                        :options="MenuData"
                        :show-all-levels="false"
                        @change="chooseType"
                        :props="{ expandTrigger: 'hover',value:'name',label:'name' }">
                    </el-cascader>
                    <el-divider direction="vertical"></el-divider>
                <el-radio-group v-model="form.original">
                    <el-radio-button :label="true" >原创</el-radio-button>
                    <el-radio-button :label="false" >转载</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="前言">
                <el-input v-model="form.abstract"></el-input>
            </el-form-item>
            <el-form-item label="标签">
                <el-select
                    v-model="form.tag"
                    style="width:100%"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择文章标签">
                        <el-option
                            v-for="(item,index) in tags"
                            :key="index"
                            :label="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
            <el-form-item label="图片">
                <el-select v-model="form.picture" placeholder="请选择文件中存在图片">
                    <el-option
                    v-for="item in pictureData"
                    :key="item.fileName"
                    :label="item.fileName"
                    :value="item.fileName+'/?downloadPath='+item.downloadPath">
                    </el-option>
                </el-select>
            </el-form-item>
            </el-form>
            <quill-editor ref="myTextEditor" v-model="form.content" :options="editorOption"></quill-editor>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" v-if='!isEdit' @click="publish">发 布</el-button>
                <el-button type="warning" v-if='isEdit' @click="edit">更 改</el-button>
            </span>
        </el-dialog>
        <iframe name="myIframe" style="display:none"></iframe>  
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    export default {
        name: 'Articles',
        data() {
            return {
                visible: false,
                tableData: [],
                total:10,
                pageNum: 1,
                pageSize:10,
                select_word:'',
                editorOption: {
                    placeholder: 'Hello World'
                },
                tags:[],
                MenuData:[], //菜单数据
                pictureData:[], //图片数据
                form: {
                    type: '',
                    temp_type:'',
                    original: true,
                    title: '',
                    abstract: '',
                    picture: '',
                    tag: [],
                    content: '',
                    publish:true
                },
                isEdit:false,

            }
        },
        components: {
            quillEditor
        },

        methods: {
            chooseType(val){
                this.form.type = val[val.length-1]
            },
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            publish(){
                if (this.form.title&&this.form.abstract&&this.form.picture&&this.form.tag.length!=0&&this.form.content&&this.form.type) {
                    var params = {
                        type: this.form.type,
                        original: this.form.original,
                        title: this.form.title,
                        abstract: this.form.abstract,
                        picture: this.form.picture,
                        content: this.form.content,
                        tag: this.form.tag,
                        publish: this.form.publish,
                    }
                    this.$post(this.$url.article+'saveArticle',params).then((res)=>{
                        if (res.code == 200) {
                            this.$message.success('添加成功')
                            this.visible = false
                            this.cleanForm()
                            this.reset()
                        }else{
                            this.$message.error('添加失败，可能存在相同标题的文章')
                        }
                    }) 
                }else{
                    this.$message.error('请将信息填写完整')
                }
                
            },
            edit(){
                if (this.form.title&&this.form.abstract&&this.form.picture&&this.form.tag.length!=0&&this.form.content&&this.form.type) {
                    var params = {
                        _id: this.form._id,
                        type: this.form.type,
                        original: this.form.original,
                        title: this.form.title,
                        abstract: this.form.abstract,
                        picture: this.form.picture,
                        content: this.form.content,
                        tag: this.form.tag,
                        publish: this.form.publish,
                    }
                    this.$post(this.$url.article+'editArticle',params).then((res)=>{
                        if (res.code == 200) {
                            this.$message.success('更新成功')
                            this.visible = false
                            this.cleanForm()
                            this.reset()
                        }else{
                            this.$message.error('更新失败，可能存在相同标题的文章')
                        }
                    }) 
                }else{
                    this.$message.error('请将信息填写完整')
                }
            },
            cleanForm(){
                this.form = {
                    type: '',
                    temp_type:'',
                    original: true,
                    title: '',
                    abstract: '',
                    picture:'',
                    tag: [],
                    content: '',
                    publish:true
                }
            },
            uploadSuccess(response){
                if (response.code == 200) {
                    this.$message.success(response.message)
                }else{
                    this.$message.error(response.message)
                }
                this.visible = false
                this.$refs.upload.clearFiles();
                this.initData()
            },
            // 分页导航
            handleCurrentChange(val) {
                this.pageNum = val;
                this.initData()
            },
            search() {
                this.pageNum = 1
                this.initData()
            },
            reset() {
                this.select_word = ''
                this.pageNum = 1
                this.initData()
            },
            initData(){
                var params = {
                    select_word:this.select_word,
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                }
                this.$get(this.$url.article+'searchArtices',params).then((res)=>{
                    this.tableData = res.data
                    this.total = res.total
                })
            },
            newArticle(){
                this.cleanForm()
                this.getNewData()
                this.isEdit = false
                this.visible = true
            },
            clickEdit(index, row){
                this.getNewData()
                this.isEdit = true
                this.visible = true
                this.form = row
                this.form.temp_type = ''
            },
            getNewData(){
                //获取最新标签
                this.$get(this.$url.article+'getTag',{}).then((res)=>{
                    this.tags = res.data
                })
                //获得最新图片文件
                this.$get(this.$url.file+'searchPictureFile',{}).then((res)=>{
                    this.pictureData = res.data
                })
                //获得最新菜单分类
                this.$get(this.$url.menu+'searchAllMenu',{}).then((res)=>{
                    this.MenuData = res.data
                })
            },
            change(index, row){
                row.publish = !row.publish
                this.$post(this.$url.article+'changePublish',{data:row}).then((res)=>{
                    if (res.code) {
                        this.initData()
                        this.$message.success(res.message)
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleDelete(index,row){
                this.$confirm('文件删除后不可恢复，确定删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios('delete',this.$url.article+'deleteArtices',{id:row._id}).then((res)=>{
                        if (res.status == 200) {
                            this.$message.success(res.message)
                            this.search()
                        }
                    })               
                }).catch(() => {

                });
            },
        },
        mounted(){
            this.initData()
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
    .type_class{
        margin: 0 20px;
    }
</style>
