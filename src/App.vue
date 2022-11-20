<template>
  <div id="app"> 
   <el-config-provider>
      <!-- 路由占位符 --> 
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
html,  
body, 
#app {
    height: 100%;
    margin: 0;
    padding: 0;
}
/* flex布局类名 */
.flex-float {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex {
  display: flex;
  align-items: center;
}
.language {
    position: absolute;
    left: 100%;
    transform: translate(-200%, 50%);
}
.page_content {
  box-sizing: border-box;
  display: block;
  widows: 100%;
  padding: 20px;
  background: #fff;
  margin-top: 20px;
}
</style>
