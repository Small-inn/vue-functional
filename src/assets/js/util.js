export const widthScreen = document.body.clientWidth

// 解决ios键盘回收问题
export const blur = () => {
  setTimeout(() => {
    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
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
