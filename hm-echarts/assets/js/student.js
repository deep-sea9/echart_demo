// todo ======================= 获取学员数据 =======================
function getStudents() {
    qs('tbody').innerHTML = ''
    axios.get('/student/list').then(res => {
        res.data.data.forEach(item => {
            const tr = document.createElement('tr')
            tr.innerHTML = `<th scope="row">${item.id}</th>
                            <td>${item.name}</td>
                            <td>${item.age}</td>
                            <td>${item.sex}</td>
                            <td>${item.group}</td>
                            <td>${item.phone}</td>
                            <td>${item.salary}</td>
                            <td>${item.truesalary}</td>
                            <td>${item.province + item.city + item.county}</td>
                            <td>
                            <button data-id='${item.id}' type="button" class="btn btn-primary btn-sm update">修改</button>
                            <button data-id='${item.id}' type="button" class="btn btn-danger btn-sm delete">删除</button>
                            </td>`
            // 添加到表格中
            qs('tbody').appendChild(tr)

        })

    })
}
getStudents()

// todo ======================= 添加显示弹层 =======================
qs('#addBtn').onclick = function () {
    qs('#addModal').classList.add('show')
    qs('#backdrop').classList.add('show')


}
// 关闭模态框并清空表单
qs('#closeAddBtn').onclick = function () {
    // if (confirm('确认要关闭吗,当前表单将会清空')) {
    qs('#addModal').classList.remove('show')
    qs('#backdrop').classList.remove('show')
    // } else {
    //     return
    // }
}

// todo ======================= 获取省 =======================
axios.get('/geo/province').then(res => {
    qsAll('[name=province]').forEach((item, index) => {
        item.innerHTML = ' <option selected value="">--省--</option>'
        // console.log(item)
        res.data.forEach((item1) => {
            const option = document.createElement('option')
            option.value = item1
            option.innerText = item1
            item.appendChild(option)

        })
    })
})



// todo ======================= 省切换的时候，选择市 =======================

qsAll('[name=province]').forEach((item, i) => {
    item.onchange = function () {
        qsAll('[name=city]')[i].innerHTML = ' <option selected value="">--市--</option>'
        qsAll('[name=county]')[i].innerHTML = ' <option selected value="">--区/县--</option>'
        const province = this.value

        axios.get('/geo/city', {
            params: {
                pname: province
            }
        }).then(res => {
            res.data.forEach((item) => {
                const option = document.createElement('option')
                option.value = item
                option.innerText = item
                qsAll('[name=city]')[i].appendChild(option)

            })
        })

    }

})


// todo ======================= 市切换的时候，选择县 =======================
qsAll('[name=city]').forEach((item, i) => {
    item.onchange = function () {
        qsAll('[name=county]')[i].innerHTML = ' <option selected value="">--区/县--</option>'
        const province = qsAll('[name=province]')[i].value
        const city = this.value
        if (province && city) {
            axios.get('/geo/county', {
                params: {
                    pname: province,
                    cname: city
                }
            }).then(res => {
                res.data.forEach((item) => {
                    const option = document.createElement('option')
                    option.value = item
                    option.innerText = item
                    qsAll('[name=county]')[i].appendChild(option)
                })
            })
        }
    }
})


// todo ======================= 添加完成 =======================
function getFormData(selector) {
    let form = {}
    qsAll(`${selector} [type=text]`).forEach(item => {
        form[item.name] = item.value.trim()
        // console.log(item.value)
    })
    qsAll(`${selector} select`).forEach(item => {
        form[item.name] = item.value
    })
    qsAll(`${selector} [type=radio]`).forEach(item => {
        if (item.checked) {
            form[item.name] = item.value
        }
    })
    return form
}


qs('.addStudents').onclick = function (e) {
    e.preventDefault()
    // 获取表单数据
    const data = getFormData('#addModal')
    if (data) {
        axios.post('/student/add', data).then(res => {
            if (res.data.code === 0) {
                alert(res.data.message)
                qs('#addModal').classList.remove('show')
                qs('#backdrop').classList.remove('show')
                getStudents()
            } else {
                return
            }
        })
    } else {
        return alert('学员信息不能为空!')
    }

}

// todo ======================= 修改显示弹层 =======================
// 修改学员 / 删除学员(事件委托)
let id = 0
qs('tbody').onclick = function (e) {
    if (e.target.classList.contains('delete')) {
        const id = e.target.getAttribute('data-id')
        if (confirm('确定要删除该学员吗?')) {
            axios.delete('/student/delete', {
                params: {
                    id
                }
            }).then(res => {
                alert(res.data.message)
                if (res.data.code === 0) {
                    getStudents()
                } else {
                    return
                }
            })
        } else {
            return
        }
    } else if (e.target.classList.contains('update')) {
        qs('#updateModal').classList.add('show')
        qs('#backdrop').classList.add('show')
        id = e.target.getAttribute('data-id')
        axios.get('/student/one', {
            params: {
                id
            }
        }).then(res => {
            const data = res.data.data
            // console.log(data)
            // qs('#updateModal [name=province]').value = '广东省'
            for (const i in data) {
                qsAll('#updateModal [type=text]').forEach(item => {
                    if (item.name === i) {
                        item.value = data[i]
                    }
                })
            }
            qs('#updateModal [name=group]').value = data.group
            qs('#updateModal [name=province]').value = data.province
            qs('#updateModal select[name=city]').innerHTML = `<option value="${data.city}">${data.city}</option>`
            qs('#updateModal select[name=county]').innerHTML = `<option value="${data.county}">${data.county}</option>`

            qsAll('#updateModal [type=radio]').forEach(item => {
                if (item.value === data.sex) {
                    item.checked = true
                }
            })
        })

    }
}

// todo ======================= 修改学员 - 确认修改 =======================
qs('.fade .btn-close').onclick = function () {
    qs('#updateModal').classList.remove('show')
    qs('#backdrop').classList.remove('show')
    qs('.fade form').reset()
}
qs('.update-form button').onclick = function (e) {
    e.preventDefault()
    const form = getFormData('#updateModal')
    form['id'] = id
    console.log(form)
    axios.put('/student/update', form).then(res => {
        alert(res.data.message)
        if (res.data.code === 0) {
            qs('#updateModal').classList.remove('show')
            qs('#backdrop').classList.remove('show')
            qs('.fade form').reset()
            getStudents()
        } else {
            return
        }
    })
}
