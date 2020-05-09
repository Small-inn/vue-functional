import {
  httpGet,
  httpPost,
  httpUpload
} from './config'

export const getInfo = params => {
  return httpGet('/vue/jksdfhjka/', params)
}

export const submitInfo = params => {
  return httpPost('/fdasf/fdasf', params)
}

export const uploadImg = params => {
  return httpUpload('/fdsfa/ipspa/', params)
}
