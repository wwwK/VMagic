import axios from "axios";
import router from "../router";
import Qs from "qs";
import store from "../store";
import { Message, Loading } from "element-ui";

let loadingInstance;

// post请求头
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    /* const token = store.state.token;        
      token && (config.headers.Authorization = token);   */

    if (config.noLoading) {
      return config;
    }

    //Loading
    loadingInstance = Loading.service({
      lock: true,
      text: "努力拉取中 ~>_<~",
      background: "rgba(0, 0, 0, 0.7)",
    });
    // config.headers["Content-Type"] = "application/json";
    return config;
  },
  (err) => {
    return Promise.error(err);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (res) => {
    if (loadingInstance) {
      loadingInstance.close();
    }
    if (res.status === 200) {
      return res;
    } else {
      //错误信息提示
      Message.error(res.data.message);
    }
  },
  // 服务器状态码不是200的情况
  (err) => {
    if (err.response.status) {
      switch (err.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath },
          });
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message.error("登录过期，请重新登录");
          // 清除token
          localStorage.removeItem("token");

          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath,
              },
            });
          }, 1000);
          break;
        // 404请求不存在
        case 404:
          Message.error("网络请求不存在");
          break;
        // 其他错误，直接抛出错误提示
        default:
          Message.error(err.response.data.message);
      }
      return Promise.reject(err.response);
    }
  }
);

export default {
  /**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  post(url, params) {
    params = params || {};
    return axios({
      method: "post",
      url: url,
      baseURL: store.state.page.serverUrl,
      timeout: store.state.page.timeout,
      data: params,
      // data: Qs.stringify(params),
    }).catch(function(error) {
      // 由网络或者服务器抛出的错误
      alert(error.toString());
    });
  },
  /**
   * get方法，对应get请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  get(url, params) {
    return axios({
      method: "get",
      url: url,
      baseURL: store.state.page.serverUrl,
      params: params,
    }).catch(function(err) {
      // 由网络或者服务器抛出的错误
      Message.error(err.toString());
    });
  },
  getLocal(url) {
    return axios({
      method: "get",
      url: url,
      noLoading: true,
    }).catch(function(err) {
      // 由网络或者服务器抛出的错误
      Message.error(err.toString());
    });
  },
  uploadFile(url, data) {
    return axios({
      method: "post",
      url: url,
      baseURL: store.state.page.serverUrl,
      data: Qs.stringify(data),
      timeout: 30000,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "multipart/form-data",
      },
    }).catch(function(err) {
      // 由网络或者服务器抛出的错误
      Message.error(err.toString());
    });
  },
};
