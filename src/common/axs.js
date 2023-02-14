import axios from 'axios';
// const Domain = "http://127.0.0.1:3000";  // 定义根域名
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; // 设置post提交数据的格式
axios.defaults.headers.post['token'] = localStorage.getItem("token"); // 设置post提交数据的格式
axios.defaults.headers.get['token'] = localStorage.getItem("token"); // 设置post提交数据的格式

 
// 封装 post 请求
export function post(url, params){
  return new Promise((resolve, reject) => {
    // url 判断是测试环境 就要拿 测试环境的域名， 正式环境的就要用 正式域名
    axios.post(url, params,{
      headers:{
        token:localStorage.getItem("token")
      }
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  });
}
 
// 封装 get 请求
export function get(url, params){
  return new Promise((resolve, reject) => {
    axios.get(url, params,{
      headers:{
        token:localStorage.getItem("token")
      }
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  });
}
 
export default {
  post(action, params){
    return post(action, params)
  },
  get(action, params){
    return get(action, params)
  }
}