import axios from 'axios';
import { Message } from 'element-ui';
// import store from "../store";

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
const instance = axios.create({
    baseURL: '/',
    //跨站访问
    // withCredentials: true
});

instance.interceptors.request.use(
    config => {
        //  config.headers.Authorization = store.state.user.token;
        // Spin.show()
        // 在发送请求之前做些什么
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
    );
    
    instance.interceptors.response.use(
        res => {        
            //   if (res.data !== "" && res.data.code !== 200) {
                if(res.data.success !== true){
                    Message.error("传输错误，"+res.data.code);
                    return Promise.reject(res);
                }
        return res;
    },
    error => {
        console.log("error->",error);
      if (!error.success) {
        Message.error("网络错误");
      } else if (error.response.data.code >= 500) {
        Message.error("服务器内部错误");
      }
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );
  
  export default instance;
  