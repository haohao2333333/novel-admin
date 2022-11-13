import axios from "axios";
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'

let loadingOBJ = null

const Service = axios.create({
    timeout:6000,
    baseURL: "/api",
    headers:{
        'Content-Type':'application/json;charset=utf-8'
    }
})

// 请求拦截
Service.interceptors.request.use(config=>{
    loadingOBJ = ElLoading.service({
        lock: true,
        text: '努力加载中...',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    setTimeout(() => {
        loadingOBJ.close()
      }, 1000)
    return config
}),error=>{

}
// 响应拦截
Service.interceptors.response.use(response=>{
    return response.data
}),error=>{ 
    ElMessage({
        message:"服务器错误，请重试一下",
        type:"error",
        duration:1000
    })
}

// post请求
export const post=config=>{
    return Service({
        ...config,
        method:"post",
        data:config.data
    })
}
// get请求
export const get=config=>{
    return Service({
        ...config,
        method:"get",
        params:config.data
    })
}