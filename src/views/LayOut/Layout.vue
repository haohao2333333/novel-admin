<template>
    <div class="common-layout">
        <el-container>
            <!-- 导航栏 -->
            <el-header class="common-header flex-float">
                <div class="flex">
                    <img class="logo" src="../../assets/bj001.jpg" alt="" />
                    <h1 class="title">小说后台</h1>
                </div>
                <!-- 退出 -->
                <el-button type="danger" round plain @click="loginOut">退出</el-button>
            </el-header>
            <el-container>
                <!-- 侧边栏 -->
                <el-aside class="common-aside" width="200px">
                    <el-menu router="false">
                        <el-sub-menu index="1">
                            <template #title>
                                <el-icon><UserFilled /></el-icon>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/user">用户列表</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon><UserFilled /></el-icon>
                                <span>角色管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/role">角色列表</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title>
                                <el-icon><Menu /></el-icon>
                                <span>小说管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/novel">小说列表</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                    </el-menu>
                </el-aside>
                <!-- 内容 -->
                <el-main>
                    <el-config-provider :locale="locale">
                    <!-- 路由占位符 --> 
                    <router-view></router-view>
                    </el-config-provider>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default{
    name:'layout',
    setup(){
        const store = useStore()
        const router = useRouter()
        const loginOut=()=>{
            localStorage.removeItem('Authorization');
            store.commit("setUserInfo", {})
            router.push({
                path:'/login'
            })
        }
        return{
            loginOut,
        }
    }
}
</script>

<style>
.el-container {
    height: 100vh;
    overflow: hidden;
}
.common-header {
    background: rgb(255, 255, 255);
    display: flex;
    height: 65px;
    box-shadow: 0 0 10px #ddd;
}
.common-aside {
    background: rgb(255, 255, 255);
}
.logo { 
    width: 60px;
    height: 60px;
    border-radius: 50%;
    padding: 10px;   
    box-shadow: 0 0 10px #ddd;
}
.title {
    color: rgb(0, 0, 0);
    position: absolute;
    transform: translate(-50%);
    left: 50%;
}
</style>