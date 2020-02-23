<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="新密码">
                        <el-input v-model="form.newPassword"  placeholder="请输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="form.newPassword1"  placeholder="请再次输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'adminSet',
        data: function(){
            return {
                form: {
                    newPassword: '',
                    newPassword1: '',
                }
            }
        },
        methods: {
            onSubmit() {
                if (this.form.newPassword !=this.form.newPassword1) {
                    this.$message.error('两次新密码输入不一致！')
                }
                this.$post(this.$url.admin_user+'changePassword',this.form).then((res)=>{
                    if (res.message) { 
                        this.$message(res.message)
                        if (res.code) {
                            this.$router.push({path:'/login'})
                        }
                    }else{  
                        this.$message(res.message)
                    }
                })
            }
        }
    }
</script>