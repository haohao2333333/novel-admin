import axios from "./novelService";

// 查询所有小说
export function NovelListApi() {
    return axios.get('/novel');
}

// 查询小说类目列表
export function NovelCategoryListApi() {
    return axios.get('/novel/NovelCategoryList');
}

// 根据novel.id查询章节列表
export function novelChapterListByIdApi(id) {
    return axios.get(`/novel/NovelChappterList/${id}`);
}

// 添加小说
export function novelAddApi(params) {
    return axios.post('/novel',params);
}

// 修改小说
export function novelUpdateApi(id, params) {
    return axios.put(`/novel/${id}`,params);
}

// 删除小说
export function novelDelApi(id) {
    return axios.delete(`/novel/${id}`);
}