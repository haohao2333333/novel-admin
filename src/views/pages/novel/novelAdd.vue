<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/novel' }">小说列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{}" >小说章节</el-breadcrumb-item>
        <el-breadcrumb-item>小说内容</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="page_content">
            小说名：
            <el-input v-model="input" placeholder="请输入小说名..." style="width: 200px" />
            <br />
            <br />
            小说内容: 
            <div style="border: 1px solid #ccc">
                <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editorRef"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"
                />
                <Editor
                    style="height: 500px; overflow-y: hidden;"
                    v-model="valueHtml"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onCreated="handleCreated"
                />
            </div>
        </div>
    </div>
</template>

<script>
import {useRoute,useRouter} from 'vue-router'
import { onBeforeUnmount, ref, shallowRef, onMounted,toRefs,reactive } from 'vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  components: { Editor, Toolbar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({

    })
    /*---------------富文本编辑器-----------*/
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('<p>hello</p>')

    // 模拟 ajax 异步获取内容
    onMounted(() => {
        setTimeout(() => {
            valueHtml.value = ''
        }, 1500)
    })

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
        ...toRefs(state),
        editorRef,
        valueHtml,
        mode: 'default', // 或 'simple'
        toolbarConfig,
        editorConfig,
        handleCreated
    };
  }
}
</script> 