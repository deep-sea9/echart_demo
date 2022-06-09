// ======================= 所有菜单切换时加背景色 ======================= 
qsAll('.nav li a').forEach((item, index) => {
  item.onclick = function () {
    qsAll('.nav li a').forEach(item => item.classList.remove('active'))
    this.classList.add('active')
  }
  // 默认首个a标签高亮
  if (index === 0) item.onclick()
})

// 判断本地是否有token,如果没有就强制跳转到登录页
if (!window.localStorage.getItem('token')) {
  location.href = 'login.html'
}

// todo ======================= 退出登录 =======================
qs('.logout').onclick = function () {
  if (confirm('亲,确定要退出登录吗?')) {
    // 清除token
    window.location.href = 'login.html'
    window.localStorage.removeItem('token')
    // 跳转到登录页
  }
}

// todo ======================= 初始化数据 =======================
qs('.init').onclick = function () {
  axios.get('/init/data').then(res => {
    console.log(res)
  })
}