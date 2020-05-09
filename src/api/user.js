import http from './config'

export function login(data) {
  return http({
    url: '/vue/djkf',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return http({
    url: '/hdjkahf/hjkahk',
    method: 'get',
    params: {
      token
    }
  })
}
