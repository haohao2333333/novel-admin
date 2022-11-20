import axios from "axios";
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'

const NETWORK_ERROR = '网络请求异常, 请稍后重试OoO'

let loadingOBJ = null

const Service = axios.create({
    timeout:6000,
    baseURL: "/api/user",
    headers:{
        'Content-Type':'application/json;charset=utf-8'
    }
})
// 请求拦截器，内部根据返回值，重新组装，统一管理。
Service.interceptors.request.use((req) =>{
    loadingOBJ = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    setTimeout(() => {
        loadingOBJ.close()
      }, 233)
    // jwt token
    if (localStorage.getItem('Authorization'))
     {      
        config.headers.Authorization = localStorage.getItem('Authorization');    
     }
    return req
   
}, error => {
    ElMessage.error("请求出错了哇咔咔")
    return Promise.reject(error);  
})
// 响应拦截器
Service.interceptors.response.use((res) =>{
    const { code, data, messsage } = res.data
    if( code == 200 ) {
        return res.data
    } else {
      // 请求出错
        ElMessage.error(messsage || NETWORK_ERROR)
        return Promise.reject(messsage || NETWORK_ERROR)
    }
})

export default Service