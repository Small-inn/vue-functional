import dataURLtoBlob from './dataURLtoBlob'

function createObjectURL(file) {
  if (window.URL) {
    return window.URL.createObjectURL(file)
  } else {
    return window.webkitURL.createObjectURL(file)
  }
}

function revokeObjectURL(url) {
  if (window.URL) {
    return window.URL.revokeObjectURL(url)
  } else {
    return window.webkitURL.revokeObjectURL(url)
  }
}

export default function fixedSizeCompressFile(file) {
  return new Promise((resolve) => {
    // 压缩图片需要的一些元素和对象
    let img = new Image() //创建一个img对象

    // createObjectURL 相对 FileReader.readerAsDataURL，效率较高，内存占用少
    img.src = createObjectURL(file)

    // base64地址图片加载完毕后执行
    img.onload = function () {
      // 释放内存
      revokeObjectURL(this.src)

      // 缩放图片需要的canvas
      var canvas = document.createElement('canvas')
      var context = canvas.getContext('2d')

      // 铺白色底色，由于png图片转jpg，透明背景会变成了黑色
      context.fillStyle = '#fff'

      // 图片原始尺寸
      var originWidth = this.width
      var originHeight = this.height

      // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
      var maxWidth = 4096,
        maxHeight = 4096

      // 目标尺寸
      var targetWidth = originWidth,
        targetHeight = originHeight

      // 图片大小大于1.5M或单边 > 4096 否则不做处理,上传原图
      if (file.size / 1024 > 1537 || originWidth > maxWidth || originHeight > maxHeight) {
        // 图片尺寸超过4096x4096的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth
            targetHeight = Math.round(maxWidth * (originHeight / originWidth))
          } else {
            targetHeight = maxHeight
            targetWidth = Math.round(maxHeight * (originWidth / originHeight))
          }
        }

        // canvas对图片进行缩放
        canvas.width = targetWidth
        canvas.height = targetHeight
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight)
        // 图片压缩
        /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/
        context.drawImage(img, 0, 0, targetWidth, targetHeight)

        //压缩后的图片转base64 url 再转 file原文件
        let handleFile = dataURLtoBlob(canvas.toDataURL('image/jpeg'))

        if (handleFile.size / 1024 > 1537) {
          // 图片大小大于1.5M
          file = dataURLtoBlob(canvas.toDataURL('image/jpeg', 0.6))
        } else {
          file = handleFile
        }
      }
      // 抛出
      resolve(file)

    }
  })
}
