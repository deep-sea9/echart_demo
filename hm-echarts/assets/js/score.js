// todo ======================= 获取分数，展示列表 =======================
function getScore() {
    axios.get('/score/list').then(res => {
        const { data } = res.data
        qs('tbody').innerHTML = ''
        for (let item in data) {
            const tr = document.createElement('tr')
            tr.innerHTML = ` <th scope="row">${item}</th>
                            <td>${data[item].name}</td>
                            <td data-batch="1" data-id="${item}" class="score">${data[item].score[0]}</td>
                            <td data-batch="2" data-id="${item}" class="score">${data[item].score[1]}</td>
                            <td data-batch="3" data-id="${item}" class="score">${data[item].score[2]}</td>
                            <td data-batch="4" data-id="${item}" class="score">${data[item].score[3]}</td>
                            <td data-batch="5" data-id="${item}" class="score">${data[item].score[4]}</td>
                        `
            qs('tbody').appendChild(tr)
        }
    })
}
getScore()

// todo ======================= 可编辑的表格 =======================
qs('tbody').onclick = function (e) {
    if (e.target.classList.contains('score')) {

        const value = e.target.innerHTML
        const input = document.createElement('input')
        input.value = e.target.innerHTML
        e.target.innerHTML = ''
        e.target.appendChild(input)
        input.focus()
        input.onblur = function () {
            e.target.innerHTML = value
        }

        const stu_id = e.target.getAttribute('data-id')
        const batch = e.target.getAttribute('data-batch')


        input.onkeyup = function (e) {

            if (e.key === 'Enter') {
                const score = input.value.trim()
                axios({
                    url: '/score/entry',
                    method: 'post',
                    data: {
                        stu_id,
                        batch,
                        score
                    }
                }).then(res => {
                    const { code, message } = res.data
                    alert(message)
                    if (code === 0) {
                        getScore()
                    } else {
                        return
                    }
                })
            }
        }

    }
}
