// todo ======================== 点击去注册 ========================
qs('.register a').onclick = function () {
    qs('.login').style.display = 'block'
    qs('.register').style.display = 'none'
}

// todo ======================== 点击去登录 ========================
qs('.login a').onclick = function () {
    qs('.login').style.display = 'none'
    qs('.register').style.display = 'block'
}

// todo ======================== 注册功能 ========================
// 给注册表单添加submit时间
qs('.register form').addEventListener('submit', (e) => {
    // 阻止默认行为
    e.preventDefault()
    // 获取输入框的用户名和密码
    const username = qs('.register [name=username]').value.trim()
    const password = qs('.register [name=password]').value.trim()
    // 注册时间表单的预校验
    if (!username || !password) {
        return alert('请输入完整的用户名和密码!')
    }

    // 发送注册请求
    axios({
        url: '/api/register',
        method: 'post',
        data: {
            username,
            password
        }
    }).then(res => {
        const { code, message } = res.data
        // 如果code为0,则是账号已存在
        if (code !== 0) {
            return alert(message)
        }
        // 注册成功后展示登录页并清空注册表单
        alert(message)
        qs('.login').style.display = 'block'
        qs('.register').style.display = 'none'
        // 清空注册表单
        qs('.register form').reset()
    })

})
// todo ======================== 登录功能 ========================
qs('.login form').addEventListener('submit', (e) => {
    // 阻止默认行为
    e.preventDefault()
    // 获取输入框的用户名和密码
    const username = qs('.login [name=username]').value.trim()
    const password = qs('.login [name=password]').value.trim()
    // 注册时间表单的预校验
    if (!username || !password) {
        return alert('请输入完整的用户名和密码!')
    }

    // 发送注册请求
    axios({
        url: '/api/login',
        method: 'post',
        data: {
            username,
            password
        }
    }).then(res => {
        console.log(res)
        const { code, message, token } = res.data
        // 如果code为0,则是账号已存在
        if (code !== 0) {
            return alert(message)
        }
        // 注册成功后展示登录页并清空注册表单
        alert(message)
        // 将响应过来的token存储到本地
        window.location.href = 'index.html'
        window.localStorage.setItem('token', token)
    })


})

