import axios from 'axios'
export const CDN_BASE_URL = 'http://cntaipingapp.oss-cn-hangzhou.aliyuncs.com/oldage/img/'

let baseURL = ''
switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = ''
    break
  case 'test':
    baseURL = ''
    break
  case 'production':
    baseURL = ''
    break
}

const http = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

// 请求拦截
http.interceptors.request.use(config => {
  config.headers['token'] = ''
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
http.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 200) {
    return Promise.reject(new Error(res.message) || 'error')
  } else {
    return res
  }
}, error => {
  return Promise.reject(error)
})

// 2.0
export function httpGet(url, params = {}) {
  return new Promise((resolve, reject) => {
    http({
      url: url,
      method: 'get',
      params: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function httpPost(url, params = {}) {
  return new Promise((resolve, reject) => {
    http({
      url: url,
      method: 'post',
      data: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function httpUpload(url, params = {}) {
  return new Promise((resolve, reject) => {
    http({
      url: url,
      method: 'get',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export default http
