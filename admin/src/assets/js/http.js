import axios from 'axios';
import qs from 'qs'
import router from './../../router'

axios.defaults.timeout = 6000;
axios.defaults.baseURL ='';


//http request 拦截器
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token') 
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    }
    if(token){
      config.headers = {'Authorization':'Bearer '+token,'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    // if(response.data.errCode ==2){
    //   router.push({
    //     path:"/login",
    //     querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
    //   })
    // }
    //console.log('response',response)
    return response;
  },
  error => {
    //console.log('error',error)
    if (error&&error.response) {
      switch(error.response.status){
        case 400:
          error.message = '错误请求'
          break;
        case 401:
          error.message = '授权失败'
          router.push({path:"/login"})
          break;
        case 403:
          error.message = '拒绝访问'
          break;
        case 404:
          error.message = '错误请求，未找到该资源'
          break;
        case 408:
          error.message = '请求超时'
          break;
        case 500:
          error.message = '服务端出错'
          break;
        case 501:
          error.message = '网络未实现'
          break;
        case 502:
          error.message = '网络错误'
          break;
        case 503:
          error.message = '服务不可用'
          break;
        case 504:
          error.message = '网络超时'
          break;
        case 505:
          error.message = 'http版本不支持该请求'
          break;
        default:
          error.message =`连接错误${error.response.status}`
      }
    }else{
      error.message = '连接到服务器失败'
    }
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params,
      paramsSerializer: function(params) {
        return qs.stringify(params, {arrayFormat: 'repeat'})
      }//axios的get方法中使用params时对于js数组类型的参数的默认操作比较诡异，会使得参数名后带上'[]'字符串
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.post(url,qs.stringify(data, { indices: false }))
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
  })
}

/**
 * 封装全部Axios请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function newAxios(type,url,options){
  return new Promise((resolve,reject) => {
    // console.log(type)
    // console.log(url)
    // console.log(options)
    // console.log(qs.stringify(options))
    axios({
      method: type,
      url: url,
      params: type === 'get'||type === 'delete' ? options : null,
      paramsSerializer: function(params) {
        return qs.stringify(params, {arrayFormat: 'repeat'})
      },//axios的get方法中使用params时对于js数组类型的参数的默认操作比较诡异，会使得参数名后带上'[]'字符串
      
      data: type !== 'get'&&type !== 'delete' ? qs.stringify(options, { indices: false }) : null
    }).then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}

