<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>账号列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 白色内容区域 -->
        <div class="page_content">
            <!-- 搜索 添加 -->
            <div class="flex">
                <div class="input_box" style="margin-right: 10px;">
                    <el-input
                        v-model="keyWord"
                        placeholder="搜索用户"
                        class="input-with-select"
                        >
                        <template #append>
                            <el-button icon="Search" @click="findByName" />
                        </template>
                    </el-input>
                </div>
                <el-button type="primary" @click="add">添加用户</el-button>
            </div>
            <!-- 表格 -->
            <el-table :data="userList" style="width: 100%">
                <el-table-column prop="id" label="id" width="100" />
                <el-table-column prop="username" label="用户名" width="180" />
                <el-table-column prop="name" label="名字" width="180" />
                <el-table-column prop="email" label="邮箱" width="180" />
                <el-table-column rop="state" label="状态" width="100">
                    <template #default="scope">
                        <el-switch
                            v-model="scope.row.state"
                            class="ml-2"
                            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                            active-value="1"
                            inactive-value="0"
                        />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template #default="scope">
                        <el-button type="primary" icon="Edit"></el-button>
                        <el-button type="danger" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" :total="1000" />
        </div>
        <!-- 添加用户弹窗 -->
        <el-dialog v-model="dialogFormVisible" title="添加用户">
            <!-- Form 表单 -->
            <el-form
            ref="userForm" 
            :model="formData" 
            :rules="rules"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData.username" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password"  v-model="formData.password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item label="名称"  prop="name">
                    <el-input v-model="formData.name" placeholder="请输入名称" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData.email" placeholder="请输入邮箱" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="save(userForm)">添加</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { reactive, toRefs,ref } from 'vue'
import { userListApi,userAddApi } from '../../util/request.js'

export default{    

    name:'layout',
    setup(){
        const data = reactive({
            keyWord:"",
            userList:[],
            dialogFormVisible:false,
            formData:{
                username:"",
                password:"",
                name:"",
                email:"",
            },
            rules:{
                username:[
                    {required:true,message:"用户名必填",trigger:"blur"}
                ],
                password:[
                    {required:true,message:"密码必填",trigger:"blur"}
                ],
                name:[
                     {required:false,
                        message: "请输入名称",
                        trigger: "blur"
                    },
                ],
                email:[
                     {required:false,
                        pattern:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                        message: "请输入正确的邮箱",
                        trigger: ['blur', 'change'] }
                ],
            },
        })
        const findByName=()=>{
            userListApi().then(res=>{
                if(res.data){
                    console.log("用户数据",res);
                    data.userList=res.data
                }
            })
        }
        // 添加用户
        const add=()=>{
            data.dialogFormVisible=true
        }
        // 保存用户
        const save=(userForm)=>{
            userForm.validate(res=>{
                if(!res){
                    return
                }
                // 请求成功
                userAddApi(data.formData).then(res=>{
                    console.log(res);
                    if(res){
                        // 关闭弹窗
                        data.dialogFormVisible=false
                        // 清空form
                        data.formData={
                                username:"",
                                password:"",
                                name:"",
                                email:"",
                            }
                        // 方法初始化
                        findByName()
                    }
                })
            })
        }
        // 方法初始化
        findByName()
        const userForm = ref()
        return{
            ...toRefs(data),
            add,
            findByName,
            save,
            userForm
        }
    }
}

</script>

<style lang="scss" scoped>
    .input_box {
        width: 233px;
    }
</style>