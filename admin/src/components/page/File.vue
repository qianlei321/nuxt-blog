<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="visible = true">文件上传</el-button>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-date-picker
                    v-model="date"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                </el-date-picker>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="primary" icon="search" @click="reset">重置</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" >
                <el-table-column type="index" width="55" align="center"></el-table-column>
                <el-table-column prop="fileName" label="文件名称" >
                </el-table-column>
                <el-table-column prop="downloadNum" label="下载量">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" sortable>
                    <template slot-scope="scope">
                        {{scope.row.createTime|dateformat()}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="fa fa-download" @click="download(scope.$index, scope.row)">下载</el-button>
                        <el-button type="text" icon="fa fa-trash" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="pageSize" :total="total" :current-page='pageNum'>
                </el-pagination>
            </div>
        </div>
        <!-- 文件上传弹框-可拖动 -->
        <el-dialog v-dialogDrag title="文件上传" center :visible.sync="visible" width="410px">
            <el-upload
                ref="upload"
                class="upload-demo"
                drag
                :headers='headers'
                :on-success='uploadSuccess'
                :action="this.$url.file+'uploadfiles'">
                <i class="fa fa-cloud-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="visible = false">确 定</el-button>
            </span>
        </el-dialog>
        <iframe name="myIframe" style="display:none"></iframe>  
    </div>
</template>

<script>
    export default {
        name: 'File',
        data() {
            return {
                visible: false,
                headers:{'Authorization':''},
                tableData: [],
                total:10,
                pageNum: 1,
                pageSize:10,
                select_word:'',
                date:[],
            }
        },
        created() {
            this.headers = {'Authorization':'Bearer '+ localStorage.getItem('token')}
        },
        methods: {
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
                this.date = []
                this.pageNum = 1
                this.initData()
            },
            initData(){
                var params = {
                    select_word:this.select_word,
                    date:this.date,
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                }
                this.$get(this.$url.file+'searchFile',params).then((res)=>{
                    this.tableData = res.data
                    this.total = res.total
                })
            },
            download(index, row){
                window.open(this.$url.file+'download/'+row.fileName+'/?downloadPath='+row.downloadPath,'myIframe')
            },
            handleDelete(index,row){
                this.$confirm('文件删除后不可恢复，确定删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios('delete',this.$url.file+'deleteFile',{id:row._id}).then((res)=>{
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
    .upload-demo .fa-cloud-upload{
        font-size: 67px;
        color: #97a8be;
        margin: 40px 0 16px;
        line-height: 50px;
    }
</style>
