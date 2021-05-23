export default (Vue) => {
  Vue.directive('loading', {
    update(el, binding, vnode) {
      console.log(el, binding, vnode)
      // debugger
      if (binding.value) {
        const div = document.createElement('div')
        div.innerText = '加载中...'
        div.setAttribute('id', 'loading')
        div.style.position = 'fixed'
        div.style.top = 0
        div.style.left = 0
        div.style.width = '100%'
        div.style.height = '100%'
        div.style.display = 'flex'
        div.style.justifyContent = 'center'
        div.style.alignItems = 'center'
        div.style.color = 'white'
        div.style.background = 'rgba(0, 0, 0, .7)'
        document.body.append(div)
      } else {
        const div = document.getElementById('loading')
        div && document.body.removeChild(div)
      }
    }
  })
}
