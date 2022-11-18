<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>小说列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 白色内容区域 -->
        <div class="page_content">
            <!-- 搜索 添加 -->
            <div class="flex">
                <div class="input_box" style="margin-right: 10px;">
                    <el-input
                        v-model="keyWord"
                        placeholder="搜索小说"
                        class="input-with-select"
                        >
                        <template #append>
                            <el-button icon="Search" @click="findByName" />
                        </template>
                    </el-input>
                </div>
                <el-button type="primary" @click="add">添加小说</el-button>
            </div>
            <!-- 表格 -->
            <el-table :data="novelList" style="width: 100%">
                <el-table-column prop="id" label="id" width="88" />
                <el-table-column prop="novel_name" label="小说名" width="180" />
                <el-table-column prop="author_name" label="作者名" width="180" />
                <el-table-column prop="category_name" label="类目名" width="150" />
                <el-table-column prop="img" label="图片" width="150" >
                    <template #default="scope">
                        <img :src="scope.row.img" alt="" style="height:88px;" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="scope">
                        <el-button type="warning" icon="View" @click="ViewNovel(scope.row)"></el-button>
                        <el-button type="primary" icon="Edit" @click="editNovel(scope.row)"></el-button>
                        <el-button type="danger" icon="Delete" @click="delNovel(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" :total="1000" />
        </div>
        <!-- 添加小说弹窗 -->
        <el-dialog v-model="novelAddFormVisible" title="添加小说">
            <!-- Form 表单 -->
            <el-form
            ref="novelForm" 
            :model="novelData" 
            :rules="rules"
            >
                <el-form-item label="小说名" prop="novel_name">
                    <el-input v-model="novelData.novel_name" placeholder="请输入小说名" />
                </el-form-item>
                <el-form-item label="小说简介" prop="novel_desc">
                    <el-input v-model="novelData.novel_desc" placeholder="请输入小说简介" />
                </el-form-item>
                <el-form-item label="作者名称"  prop="author_name">
                    <el-input v-model="novelData.author_name" placeholder="请输入作者名称" />
                </el-form-item>
                <el-form-item label="类目选择" prop="category_name">
                    <el-select v-model="novelData.category_name" class="m-2" placeholder="类目名称">
                        <el-option
                        v-for="item in NovelCategoryList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name"
                        />
                    </el-select>
                    <!-- <el-input v-model="novelData.category_name" placeholder="请输入类目名" /> -->
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="novelAddFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="save(novelForm)">添加</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 编辑小说弹窗 -->
        <el-dialog v-model="novelEditFormVisible" title="修改小说">
            <!-- Form 表单 -->
            <el-form
            ref="novelForm2" 
            :model="novelData2" 
            :rules="rules2"
            >
                <el-form-item label="小说名" prop="novel_name">
                    <el-input v-model="novelData2.novel_name" placeholder="请输入小说名" />
                </el-form-item>
                <el-form-item label="小说简介" prop="novel_desc">
                    <el-input v-model="novelData2.novel_desc" placeholder="请输入小说简介" />
                </el-form-item>
                <el-form-item label="作者名称"  prop="author_name">
                    <el-input v-model="novelData2.author_name" placeholder="请输入作者名称" />
                </el-form-item>
                <el-form-item label="类目" prop="category_name">
                    <el-select v-model="novelData2.category_name" class="m-2" placeholder="类目名称">
                        <el-option
                        v-for="item in NovelCategoryList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="novelEditFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="edit(novelForm2)">修改</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {useRoute,useRouter} from 'vue-router'
import { reactive, toRefs,ref } from 'vue'
import { NovelListApi,NovelCategoryListApi,novelAddApi,novelUpdateApi,novelDelApi } from '/src/util/novelApi.js'


export default{    
    name:'novel',
    setup(){
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            keyWord:"",
            novelId: "",
            novelList: [],
            NovelCategoryList: [],
            novelData: {
                novel_name: "",
                novel_desc: "",
                author_name: "",
                category_name: "",
            },
            novelData2: {
                id: "",
                novel_name: "",
                novel_desc: "",
                author_name: "",
                category_name: "",
            },
            rules:{
                novel_name:[
                    {required:true,message:"小说名必填奥",trigger:"blur"}
                ],
            },
            rules2:{
                novel_name:[
                    {required:true,message:"小说名必填奥",trigger:"blur"}
                ],
            },
            novelAddFormVisible: false,
            novelEditFormVisible: false,
        })
        // 查找小说
        const findByName=()=>{
            NovelListApi().then(res=>{
                if(res.data){
                    console.log("小说数据",res);
                    state.novelList=res.data
                }
            })
        }
        // 类目列表
        const NovelCategory=()=>{
            NovelCategoryListApi().then(res=>{
                if(res.data){
                    console.log("小说类目数据",res);
                    state.NovelCategoryList=res.data
                }
            })
        }
        // 添加小说
        const add=()=>{
            state.novelAddFormVisible=true
        }
        // 保存小说
        const save=(novelForm)=>{
            novelForm.validate(res=>{
                console.log(res);
                if(!res){
                    return
                }
                // 请求成功
                novelAddApi(state.novelData).then(res=>{
                    console.log(res);
                    if(res){
                        // 关闭弹窗
                        state.novelAddFormVisible=false
                        // 清空form
                        state.novelData={
                                novel_name: "",
                                novel_desc: "",
                                author_name: "",
                                category_name: "",
                            }
                        // 方法初始化
                        findByName()
                    }
                })
            })
        }
        // 查看小说
        const ViewNovel=row=>{
            // state.novelId = row.id
            router.push({ path: `/novel/${row.id}` })
        }
        const editNovel=row=>{
            // console.log("操作的数据更改",row)
            // 打开修改弹窗
            state.novelEditFormVisible=true
            // 展示数据
            state.novelData2.id = row.id
            state.novelData2.novel_name = row.novel_name
            state.novelData2.novel_desc = row.novel_desc
            state.novelData2.author_name = row.author_name
            state.novelData2.category_name = row.category_name
        }
        // 编辑小说
        const edit=(novelData2)=>{
            novelData2.validate(res=>{
                if(!res){
                    return
                }
                novelUpdateApi(state.novelData2.id,state.novelData2).then(res=>{
                    if(res){
                        // 关闭弹窗
                        state.novelEditFormVisible=false
                        // 方法初始化
                        findByName()
                    }
                })
            })
        }
        // 删除用户
        const delNovel=row=>{
            // console.log("删除的数据",row)
            novelDelApi(row.id).then(res=>{
                // console.log(res);
                if(res) {
                    // 方法初始化
                    findByName()
                }
            })
        }
        // 方法初始化
        findByName()
        NovelCategory()
        const novelForm = ref()
        const novelForm2 = ref()
        return {
            ...toRefs(state),
            findByName,
            NovelCategory,
            add,
            save,
            novelForm,
            ViewNovel,
            editNovel,
            edit,
            novelForm2,
            delNovel,
        }
    }
}
</script>

<style scoped>

</style>