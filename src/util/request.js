import axios from "./service";

// 登录
export function loginApi(params) {
    return axios.post('/user/login',params);
}

// 查询所有用户
export function userListApi() {
    return axios.get('/user');
}

// 用户添加
export function userAddApi(params) {
    return axios.post('/user', params);
}

// 更改用户状态
export function userChangeStateApi(id,state,params) {
    return axios.put(`/user/${id}/${state}`, params);
}

// 修改用户
export function userUpdateApi(id, params) {
    return axios.put(`/user/${id}`,params);
}

// 删除用户
export function userDelApi(id) {
    return axios.delete(`/user/${id}`);
}
