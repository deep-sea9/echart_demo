// axios相关的配置

// todo ======================= 配置全局请求根路径 =======================
axios.defaults.baseURL = 'https://www.itcbc.com:8000'
// todo ======================= 添加请求拦截器 =======================
axios.interceptors.request.use(
    function (config) {

        // 在发送请求之前做些什么
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = token
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)
// todo ======================= 添加响应拦截器 =======================
axios.interceptors.response.use(
    function (response) {

        // 对响应数据做点什么
        const { code, message } = response.data
        if (code === 1) {
            alert(message)
        }
        return response
    },
    function (error) {
        if (error.response) {
            const { message, code } = error.response.data
            if (code === 1 && message === '身份认证失败') {
                localStorage.removeItem('token')
                location.href = './login.html'
            } else {
                alert(message)
            }
        }
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)


