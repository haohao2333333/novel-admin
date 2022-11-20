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
                <el-table-column prop="user_id" label="id" width="100" />
                <el-table-column prop="username" label="用户名" width="180" />
                <el-table-column prop="name" label="名字" width="180" />
                <el-table-column prop="email" label="邮箱" width="180" />
                <el-table-column rop="state" label="状态" width="100">
                    <template #default="scope">
                        <el-switch
                            v-model="scope.row.state"
                            class="ml-2"
                            :active-value="1" 
                            :inactive-value="0"
                            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                            @click="switchChange(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template #default="scope">
                        <el-button type="primary" icon="Edit" @click="editUser(scope.row)"></el-button>
                        <el-button type="danger" icon="Delete" @click="delUser(scope.row)"></el-button>
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
        <!-- 编辑用户弹窗 -->
        <el-dialog v-model="dialogFormEditVisible" title="编辑用户">
            <!-- Form 表单 -->
            <el-form
            ref="userForm2" 
            :model="formData2" 
            :rules="rules2"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData2.username" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData2.password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item label="名称"  prop="name">
                    <el-input v-model="formData2.name" placeholder="请输入名称" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData2.email" placeholder="请输入邮箱" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormEditVisible = false">取消</el-button>
                    <el-button type="primary" @click="edit(userForm2)">编辑</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { reactive, toRefs,ref } from 'vue'
import { userListApi,userAddApi,userChangeStateApi,userDelApi,userUpdateApi } from '/src/api/request'
import { ElMessage } from 'element-plus'

export default{    
    name:'layout',
    setup(){
        const data = reactive({
            keyWord:"",
            userList:[],
            dialogFormVisible:false,
            dialogFormEditVisible:false,
            formData:{
                username:"",
                password:"",
                name:"",
                email:"",
            },
            formData2:{
                id:"",
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
            rules2:{
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
        // 查找用户
        const findByName=()=>{
            userListApi().then(res=>{
                if(res.data){
                    // console.log("用户数据",res);
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
                // console.log(res);
                if(!res){
                    return
                }
                // 请求成功
                userAddApi(data.formData).then(res=>{
                    // console.log(res);
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
        // 修改用户状态
        const switchChange=row=>{
            // console.log("操作的数据状态更改",row)
            userChangeStateApi(row.user_id,row.state,row).then(res=>{
                // console.log(res);
                if(res.data){
                    findByName()
                }
            })
        }
        // 修改用户
        const editUser=row=>{
            // console.log("操作的数据更改",row)
            // 打开修改弹窗
            data.dialogFormEditVisible=true
            // 展示数据
            data.formData2.user_id = row.user_id
            data.formData2.username = row.username
            data.formData2.password = row.password
            data.formData2.name = row.name
            data.formData2.email = row.email
        }
        // 编辑用户
        const edit=(userForm2)=>{
            userForm2.validate(res=>{
                // console.log(res);
                if(!res){
                    return
                }
                userUpdateApi(data.formData2.user_id,data.formData2).then(res=>{
                    // console.log(res);
                    if(res){
                        // 关闭弹窗
                        data.dialogFormEditVisible=false
                        // 方法初始化
                        findByName()
                    }
                })
            })
        }
        // 删除用户
        const delUser=row=>{
            // console.log("删除的数据",row)
            userDelApi(row.user_id).then(res=>{
                // console.log(res);
                if(res) {
                    // 方法初始化
                    findByName()
                }
            })
        }
        // 方法初始化
        findByName()
        const userForm = ref()
        const userForm2 = ref()
        return {
            ...toRefs(data),
            add,
            findByName,
            save,
            userForm,
            switchChange,
            editUser,
            edit,
            userForm2,
            delUser
        }
    }
}
</script>

<style lang="scss" scoped>
    .input_box {
        width: 233px;
    }
</style>