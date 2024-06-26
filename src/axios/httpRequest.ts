import axios from 'axios';
const service = axios.create({
  // baseURL: '',
  timeout: 3000,
  withCredentials: true, // 异步请求携带cookie
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  }
});

// 请求拦截
service.interceptors.request.use((config) => {
  config.headers.peojectId = 1;
  return config;
});

// 响应拦截
service.interceptors.response.use((response) => {
  if(response.data.code === '1004') {
    alert('校验错误')
    return;
  }
  return response.data;
}, (error) => {
  // switch(error.response.statue) {
  //   case 404:
  //     alert('404')  
  //     return;
  //   case 500:
  //     alert('500')
  //     return;
  // }
  return Promise.reject(error)
})
export default service;