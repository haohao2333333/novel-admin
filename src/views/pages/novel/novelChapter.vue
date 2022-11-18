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
    </div>

</template>

<script>
import {useRoute,useRouter} from 'vue-router'
import { reactive, onMounted, computed, toRefs, nextTick,onUpdated } from 'vue'
import { novelChapterListByIdApi } from '/src/util/novelApi'

export default {
    name: "novelChapter",
    setup(){
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            novelChapterList: [],
        });
        const novelChapterListById = () =>{
            const { id } = route.params
            novelChapterListByIdApi(id).then(res=>{
                state.novelChapterList = res.data;
            })
        }
        novelChapterListById()
        return {
            ...toRefs(state),
        }
    }
}
</script>

<style>

</style>