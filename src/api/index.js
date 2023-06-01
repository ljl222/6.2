import axios from "../utils/request"

/**
 * 网络请求访问路径
 */
const base = {
    baseUrl:"/api",
    register:"/api/register",
    repeatusername:"/api/repeat/username",
    login:"/api/login",
    list:"/api/list"
}

/**
 * 网络请求方法
 */
const api = {

    register(params){
        return axios.post(base.baseUrl + base.register,params);
    },
    /**
     * 用户名重复验证
     */
    repeatUserName(params){
        return axios.get(base.baseUrl+base.repeatusername,{
            params
        })
    },
    /**
     * 登陆接口
     */
    login(params){
        return axios.post(base.baseUrl + base.login,params)
    },
    /**
     * 首页列表数据
     */
    list(){
        return axios.get(base.baseUrl + base.list)
    }
}

export default api;