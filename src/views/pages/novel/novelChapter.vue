<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/novel' }">小说列表</el-breadcrumb-item>
        <el-breadcrumb-item>小说章节</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 白色内容区域 -->
        <div class="page_content">
            <!-- 搜索 添加 -->
            <div class="flex">
                <div class="input_box" style="margin-right: 10px;">
                    <el-input
                        v-model="keyWord"
                        placeholder="搜索章节"
                        class="input-with-select"
                        >
                        <template #append>
                            <el-button icon="Search" @click="findByName" />
                        </template>
                    </el-input>
                </div>
                <el-button type="primary" @click="add">添加章节</el-button>
            </div>
            <!-- 表格 -->
            <el-table :data="novelChapterList" style="width: 100%">
                <el-table-column prop="chapter_num" label="章节数" width="88" />
                <el-table-column prop="chapter_name" label="章节名" width="250" />
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
        <el-dialog v-model="novelChapterAddFormVisible" title="添加小说章节">
            <!-- Form 表单 -->
            <el-form
            ref="novelChapterForm" 
            :model="novelChapterData" 
            :rules="rules"
            >   
                <el-form-item label="章节数" prop="chapter_num">
                    <el-input v-model="novelChapterData.chapter_num" placeholder="请输入章节数" />
                </el-form-item>
                <el-form-item label="章节名" prop="chapter_name">
                    <el-input v-model="novelChapterData.chapter_name" placeholder="请输入章节名" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="novelAddFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="save(novelChapterForm)">添加</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {useRoute,useRouter} from 'vue-router'
import { reactive, toRefs,ref } from 'vue'
import { novelChapterListByIdApi,novelByIdApi,novelChapterAddApi } from '/src/api/novelApi'

export default {
    name: "novelChapter",
    setup(){
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            novel: {
                id: "",
                novel_name: ""
            },
            novelChapterList: [],
            novelChapterData: {
                novel_id: "",
                chapter_num: "",
                chapter_name: ""
            },
            rules:{
                chapter_name:[
                    {required:true,message:"章节名必填奥",trigger:"blur"}
                ],
            },
            novelChapterAddFormVisible: false,
        });
        // 查询章节列表
        const novelChapterListById = () =>{
            const { id } = route.params
            novelChapterListByIdApi(id).then(res=>{
                state.novelChapterList = res.data;
            })
        }
        const novelById = () => {
            const { id } = route.params
            novelByIdApi(id).then(res=>{
                console.log("用户数据",res);
                state.novel = res.data
            })
        }
        // 添加小说章节
        const add=()=>{
            state.novelChapterAddFormVisible=true
            state.novelChapterData.novel_id = state.novel.id
        }
        // 添加小说章节
        const save=(novelChapterForm)=>{
            novelChapterForm.validate(res=>{
                console.log(res);
                if(!res){
                    return
                }
                novelChapterAddApi(state.novelChapterData).then(res=>{
                    console.log(res);
                    if(res){
                        // 关闭弹窗
                        state.novelChapterAddFormVisible=false
                        // 清空form
                        state.novelChapterData={
                            novel_id: "",
                                novel_desc: "",
                                chapter_num: "",
                                chapter_name: "",
                            }
                        // 方法初始化
                        novelChapterListById()
                    }
                })
            })
        }
        // 查看小说
        const ViewNovel=row=>{
        // state.novelId = row.id
            router.push({ path: `/novel/${row.novel_id}/${row.id}` })
        }
        // 初始化方法
        novelChapterListById()
        novelById()
        const novelChapterForm = ref()
        return {
            ...toRefs(state),
            add,
            save,
            novelChapterListById,
            novelById,
            novelChapterForm,
            ViewNovel,

        }
    }
}
</script>

<style scoped>

</style>