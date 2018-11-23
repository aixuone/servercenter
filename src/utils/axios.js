import axios from 'axios'
import Message from 'message'

var instance = axios.create({
    // baseURL: process.env.VUE_APP_URL,
    withCredentials: true
  });

instance.interceptors.response.use(
res => {
    // console.log(res);
    if (res.data !== "" && res.data.code !== 200) {
    Message.error(res.data.message);
    return Promise.reject(res.data.message);
    }
    return res;
},
error => {
    if (!error.status) {
    Message.error("网络错误");
    } else if (error.response.data.code >= 500) {
    Message.error("服务内部错误");
    }
    // 对响应错误做点什么
    return Promise.reject(error);
}
);

export default instance;