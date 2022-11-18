<template>
  <div class="login">
    <h1>你是天上的星星 最亮的那一颗星</h1>
    <hr width="40%">
    <div class="box">
      <h2>Login</h2>
      <form action="#" method="get">
        <div class="input-box">
          <label>账号:</label>
          <input type="text" placeholder=" 请输入用户名..." id="username" v-model="loginForm.username"/>
        </div>
        <div class="input-box">
          <label>密码:</label>
          <input type="password" placeholder="请输入密码..." id="password" v-model="loginForm.password"/>
        </div>
        <div>
          <a href="../js/register.html">忘记密码？</a>
          <div>
            <button type="submit" @click="handleLogin">登录</button>
            <a><button type="button">注册</button></a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive,toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from "vue-router"
import { loginApi } from '../util/request.js'

export default {
  name: "Login",
  data(){
    const store = useStore()
    const router = useRouter()
    const data = reactive({ 
      loginForm:{
          id:"",
          username:"hoho",
          password:"admin",
      },
    })
    const handleLogin=()=>{
        loginApi(data.loginForm).then(res=>{
        if(res){
          console.log(res.data);
          store.commit('setUserInfo', res.data);
          localStorage.setItem("loginForm",JSON.stringify(data.loginForm))
          // 跳转/user
          router.push({ path: `/user` })
        }
      })
    }
    return{
      ...toRefs(data),
      handleLogin,
    }
  }
}
</script>

<style scoped>
.login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url("../assets/login.jpg");
    background-size:100%;
}
h1{
    color: rgba(255,255,255,0.7);
    margin-bottom: 5px;
    font-family:'STXingkai';
    font-size: 40px;
}

.box{
    display: flex;
    flex-direction: column;
    justify-content: center;;
    align-items: center;
    width: 360px;
    height: 380px;
    border: 1px solid rgba(255,255,255,0.2);
    backdrop-filter: blur(5px);
    background: rgba(50,50,50,0.4);
    margin-top: 20px;
}

h2{
    color: rgba(255,255,255,0.7);
    margin-bottom: 25px;
}

 .input-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 10px;
}

 .input-box > label{
    margin-bottom: 5px;
    color: rgba(255,255,255,0.7);
    font-size: 13px;
}
 .input-box > input{
    box-sizing: border-box;
    margin-bottom: 5px;
    color: white;
    font-size: 14px;
    height: 35px;
    width: 250px;
    background: rgba(255,255,255,0.3);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 5px;
    transition: 0.3s;
    outline: none;
    padding: 0 10px;
}
 .input-box > input:focus{
    border: 1px solid rgba(255,255,255,0.8);
}

  a{
    color:  rgba(255,255,255,0.5);
    font-size: 13px;
    text-decoration: none;
    transition: 0.2s;
    width: 250px;
    text-align:end;
}

 a:hover{
    color: blue;
    font-size: 13px;
}


button{
    width: 120px;
    height: 35px;
    border:  1px solid rgba(197,81,58,0.8);
    background: rgba(197,81,58,0.5);
    color: rgba(255,255,255,0.9);
    border-radius: 5px;
    margin-top: 20px;
}
button:hover {
    border:  1px solid rgba(255,255,255,0.8);
    background: rgba(255,255,255,0.5);
    width: 120px;
    height: 35px;
}
</style>