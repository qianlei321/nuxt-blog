<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="newMenu(false)">新建一级菜单</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" default-expand-all row-key="_id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column type="index" width="75" align="center"></el-table-column>
                <el-table-column prop="name" label="菜单名称" >
                </el-table-column>
                <el-table-column prop="order" label="排序">
                </el-table-column>
                <el-table-column label="操作" width="260" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="fa fa-plus-square" v-show="scope.row.children" class="green" @click="newMenu(scope.row)">新增二级菜单</el-button>
                        <el-button type="text" icon="fa fa-edit" @click="editTopMenu(scope.row)">修改</el-button>
                        <el-button type="text" icon="fa fa-trash" class="red" @click="deleteTopMenu(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog center :visible.sync="visible" width="400px">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="菜单名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="顺序">
                    <el-input-number v-model="form.order" :min="1" label="顺序"></el-input-number>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" v-if='!isEdit' @click="addMenu">新 增</el-button>
                <el-button type="warning" v-if='isEdit' @click="editMenu">更 改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'Menu',
        data() {
            return {
                visible: false,
                tableData: [],
                form:{
                    name:'',
                    order:1
                },
                isEdit:false,
                isTop:true,
                nowTopMenuData:null,
            }
        },
        methods: {
            //验证二级菜单是否重复
            isSameMenu(){
                let isSame = false
                this.tableData.forEach((item)=>{
                    item.children.forEach((item1)=>{
                        if(item1.name == this.form.name){
                            isSame = true
                        }
                    })
                })
                return isSame
            },
            newMenu(row){
                if(row){
                    this.isTop = false
                    this.nowTopMenuData = row
                }else{
                    this.isTop = true
                }
                this.form = {name:'',order:1}
                this.isEdit = false
                this.visible = true
            },
            //添加
            addMenu(){
                if (this.form.name&&this.form.order) {
                    if(this.isSameMenu()){
                        this.$message.error('添加失败，可能存在相同的菜单')
                        return
                    }
                    
                    if(this.isTop){
                        this.$post(this.$url.menu+'saveTopMenu',this.form).then((res)=>{
                            if (res.code == 200) {
                                this.$message.success('添加成功')
                                this.visible = false
                                this.initData()
                            }else{
                                this.$message.error('添加失败，可能存在相同的菜单')
                            }
                        })
                    }else{
                        const params = {
                            f_id:this.nowTopMenuData._id,
                            name:this.form.name,
                            order:this.form.order,
                        }
                        this.$post(this.$url.menu+'saveMenu',params).then((res)=>{
                            if (res.code == 200) {
                                this.$message.success('添加成功')
                                this.visible = false
                                this.initData()
                            }else{
                                this.$message.error('添加失败，可能存在相同的菜单')
                            }
                        })
                    }
                }else{
                    this.$message.error('请将信息填写完整')
                }
            },
            //修改一级菜单
            editTopMenu(row){
                this.isTop = true
                this.visible = true
                this.isEdit = true
                this.form = {f_id:row.f_id,_id:row._id,name:row.name,order:row.order}
            },
            //修改二级菜单
            editMenu(){
                if(this.isSameMenu()){
                    this.$message.error('添加失败，可能存在相同的菜单')
                    return
                }
                if (this.form.name&&this.form.order) {
                    this.$post(this.$url.menu+'editTopMenu',this.form).then((res)=>{
                        if (res.code == 200) {
                            this.$message.success('修改成功')
                            this.visible = false
                            this.initData()
                        }else{
                            this.$message.error('修改失败，可能存在相同的菜单')
                        }
                    })
                }else{
                    this.$message.error('请将信息填写完整')
                }
            },
            //删除菜单
            deleteTopMenu(row){
                this.$confirm('删除后不可恢复，确定删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        const params = {
                            f_id:row.children?null:row.f_id,
                            id:row._id
                        }
                        this.$axios('delete',this.$url.menu+'deleteMenu',params).then((res)=>{
                            if (res.status == 200) {
                                this.$message.success(res.message)
                                this.initData()
                            }
                        })       
                    }).catch(() => {

                    });
            },
            initData(){
                this.$get(this.$url.menu+'searchAllMenu',"").then((res)=>{
                    this.tableData = res.data
                })
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
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .green{
        color: green;
    }
</style>
