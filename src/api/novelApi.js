import axios from "./novelService";

// 查询小说类目列表
export function NovelCategoryListApi(params) {
    return axios.get('/novelCategory', { params });
}

// 根据novel.id查询章节列表
export function novelChapterListByIdApi(id,params) {
    return axios.get(`/novelChapter/${id}`, { params });
}
// 添加小说章节
export function novelChapterAddApi(params) {
    return axios.post(`/novelChapter`,params);
}

// 查询所有小说
export function NovelListApi(params) {
    return axios.get(`/novel`, { params });
}
// 小说分页
export function NovelPageListApi(pageNum,pageSize,params) {
    return axios.get(`/novel/page/${pageNum}/${pageSize}`, { params });
}
// 根据novel.id查询 
export function novelByIdApi(id,params) {
    return axios.get(`/novel/${id}`, { params });
}
// 添加小说
export function novelAddApi(params) {
    return axios.post(`/novel`,params);
}
// 修改小说
export function novelUpdateApi(id, params) {
    return axios.put(`/novel/${id}`, params);
}
// 删除小说
export function novelDelApi(id) {
    return axios.delete(`/novel/${id}`);
}