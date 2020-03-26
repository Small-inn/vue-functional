export const widthScreen = document.body.clientWidth

// 解决ios键盘回收问题
export const blur = () => {
  setTimeout(() => {
    const scrollHeight =
      document.documentElement.scrollTop || document.body.scrollTop || 0
    window.scrollTo(0, Math.max(scrollHeight - 1, 0))
  }, 200)
}
// 返回顶部
export const toTop = () => {
  // window.scrollTo(0,0);
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  let timer = null
  cancelAnimationFrame(timer)
  timer = requestAnimationFrame(function fn () {
    if (scrollTop > 0) {
      scrollTop -= 40
      document.documentElement.scrollTop = document.body.scrollTop = scrollTop
      timer = requestAnimationFrame(fn)
    } else {
      cancelAnimationFrame(timer)
    }
  })
}

// scrollTop为滚动条在Y轴上的滚动距离。
// clientHeight为内容可视区域的高度。
// scrollHeight为内容可视区域的高度加上溢出（滚动）的距离。
// 由这些dom属性可知：滚动条到底部的公式为：scrollTop + clientHeight == scrollHeight
export const getScrollTop = () => {
  // 1.0
  // let scrollTop = 0
  // let bodyScrollTop = 0
  // let documentScrollTop = 0
  // if (document.body) {
  //   bodyScrollTop = document.body.scrollTop
  // }
  // if (document.documentElement) {
  //   documentScrollTop = document.documentElement.scrollTop
  // }
  // scrollTop =
  //   bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop
  // return scrollTop
  // 2.0
  return document.documentElement.scrollTop || document.body.scrollTop || 0
}
// 为0时，则为滚动到最顶部
export const getScrollHeight = () => {
  let scrollHeight = 0
  let bodyScrollHeight = 0
  let documentScrollHeight = 0
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight
  }
  scrollHeight =
    bodyScrollHeight - documentScrollHeight > 0
      ? bodyScrollHeight
      : documentScrollHeight
  return scrollHeight
}
export const getClientHeight = () => {
  let windowHeight = 0
  if (document.compatMode === 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight
  } else {
    windowHeight = document.body.clientHeight
  }
  return windowHeight
}

export const scrollToBottom =
  getScrollTop() + getClientHeight() >= getScrollHeight()
