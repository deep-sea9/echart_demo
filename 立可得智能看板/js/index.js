$(function () {
    // $('.monitor .tabs>a').on('click', function () {
    //     // 设备监控模块tab栏切换
    //     $(this).addClass('active').siblings('a').removeClass('active')
    //     let index = $(this).index()
    //     $('.monitor .content').eq(index).show().siblings('.content').hide()
    // })
    // 设备监控模块自动切换 + 轮播滚动
    let monitorIdex = 0
    setInterval(function () {
        monitorIdex++
        if (monitorIdex == 2) {
            monitorIdex = 0
        }
        $('.monitor .tabs>a').eq(monitorIdex).addClass('active').siblings('a').removeClass('active')
        $('.monitor .content').eq(monitorIdex).show().siblings('.content').hide()

    }, 5000)

    function carousel () {
        $('.monitor .content ul').animate({
            top: -525
        }, 10000, 'linear', function () {
            $('.monitor .content ul').css('top', 0)
        })
    }
    carousel()
    setInterval(carousel, 5000)

    // 订单量模块tabs栏切换
    let oderData = [
        { order: '301,987', amount: '99834' },
        { order: '20,301', amount: '9834' },
        { order: '1,987', amount: '3834' },
        { order: '987', amount: '834' },
    ]
    // $('.order .head>a').on('click', function () {
    //     $(this).addClass('active').siblings().removeClass('active')
    //     let index = $('.order .head>a').index(this)
    //     $('.order .data p').eq(0).text(oderData[index].order)
    //     $('.order .data p').eq(0).text(oderData[index].amount)
    // })

    let orderIndex = 0
    setInterval(function () {
        orderIndex++
        if (orderIndex == 4) {
            orderIndex = 0
        }
        $('.order .head>a').eq(orderIndex).addClass('active').siblings().removeClass('active')
        $('.order .data p').eq(0).text(oderData[orderIndex].order)
        $('.order .data p').eq(1).text(oderData[orderIndex].amount)
    }, 5000)

    // 
    let hotData = [
        [
            { name: '可爱多', num: '9,086' },
            { name: '娃哈哈', num: '8,341' },
            { name: '喜之郎', num: '7,407' },
            { name: '八喜', num: '6,086' },
            { name: '小洋人', num: '6,734' },
            { name: '好多鱼', num: '2,046' }
        ],
        [
            { name: '大郎', num: '9,086' },
            { name: '烧饼', num: '8,641' },
            { name: '茅台', num: '3,497' },
            { name: '卫龙', num: '1,086' },
            { name: '可口可乐', num: '6,734' },
            { name: '雪花', num: '2,566' }
        ],
        [
            { name: '可爱多', num: '7,086' },
            { name: '鱼仔', num: '9,141' },
            { name: '牛肉', num: '7,407' },
            { name: '四方', num: '5,986' },
            { name: '西瓜', num: '1,934' },
            { name: '沙琪玛', num: '2,406' }
        ],
        [
            { name: '烤鸡', num: '7,086' },
            { name: '雪碧', num: '8,641' },
            { name: '九江', num: '7,407' },
            { name: '麻辣谈', num: '6,281' },
            { name: '烧鸭', num: '3,764' },
            { name: '好多鱼', num: '5,446' }
        ],
        [
            { name: '思乐', num: '10,066' },
            { name: '八爪鱼', num: '8,341' },
            { name: '苹果', num: '3,407' },
            { name: '辣条', num: '6,886' },
            { name: '小洋人', num: '5,734' },
            { name: '好多鱼', num: '1,033' }
        ]
    ]

    // $('.hot .province ul:eq(0) li').on('click', function () {
    //     $(this).addClass('active').siblings().removeClass('active')
    //     let index = $(this).index()
    //     let arr = hotData[index]
    //     $('.hot .province ul:eq(1) li').each(function (index, ele) {
    //         $(ele).children('span').text(arr[index].name)
    //         $(ele).children('b').text(arr[index].num)
    //     })
    // })

    let hotIndex = 0
    setInterval(function () {
        hotIndex++
        if (hotIndex == 5) {
            hotIndex = 0
        }
        $('.hot .province ul:eq(0) li').eq(hotIndex).addClass('active').siblings().removeClass('active')
        let arr = hotData[hotIndex]
        $('.hot .province ul:eq(1) li').each(function (index, ele) {
            $(ele).children('span').text(arr[index].name)
            $(ele).children('b').text(arr[index].num)
        })
    }, 5000)

})

$(function () {
    // 饼图
    let myChart = echarts.init(document.querySelector('.point .echart .pie'))
    let option = {
        color: ['#006cff', '#60cda0', 'ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
        backgroundColor: '#2c343c',
        // title: {
        //   text: 'Customized Pie',
        //   left: 'center',
        //   top: 20,
        //   textStyle: {
        //     color: '#ccc'
        //   }
        // },
        tooltip: {
            trigger: 'item',
            position: function (point) {
                return [point[0] + 10, point[1] + 10]
            }
        },
        series: [
            {
                name: '点位统计分布',
                type: 'pie',
                radius: [10, 65],
                center: ['50%', '50%'],
                data: [
                    { value: 110, name: '云南' },
                    { value: 160, name: '北京' },
                    { value: 180, name: '山东' },
                    { value: 160, name: '河北' },
                    { value: 400, name: '广东' },
                    { value: 200, name: '江苏' },
                    { value: 320, name: '浙江' },
                    { value: 190, name: '山东' }
                ],
                roseType: 'radius',
                // label: {
                //   color: 'rgba(255, 255, 255, 0.3)'
                // },
                labelLine: {
                    lineStyle: {
                        // color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 2,
                    length2: 8
                },
                itemStyle: {
                    // color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200
                }
            }
        ]
    }
    myChart.setOption(option)
})

$(function () {
    let myChart = echarts.init(document.querySelector('.user .echart .bar'))
    let item = {
        value: 1000,
        itemStyle: {
            color: '254065',
            opacity: 0.6
        }
    }
    // 柱状图
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'none'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '13%',
            height: 170,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['上海', '广州', '北京', '深圳', '合肥', '', '.....', '杭州', '厦门', '济南', '成都', '重庆'],
            axisTick: {
                show: false,
                alignWithLabel: true
            },
            axisLabel: {
                show: true,
                color: '#4c9bfd'
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#01586b'
                }
            }
        },
        yAxis: [
            {
                show: true,
                type: 'value',
                axisTick: {
                    show: false,
                    alignWithLabel: true
                },
                axisLabel: {
                    show: true,
                    color: '#4c9bfd'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#01586b'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#01586b'
                    }
                }
            },
            {
                show: true,
                type: 'value',
                axisTick: {
                    show: false,
                    alignWithLabel: true
                },
                axisLabel: {
                    show: true,
                    color: '#4c9bfd'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#01586b'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#01586b'
                    }
                }
            },
        ],
        series: [
            {
                name: '用户统计',
                data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 850, 730],
                type: 'bar',
                // barWidth: '60%',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#00faf9' },

                        { offset: 1, color: '#0064cf' }
                    ])
                },
            }
        ]
    }

    myChart.setOption(option)
})

$(function () {
    let data = [
        [
            [20, 40, 101, 134, 90, 230, 210, 560, 342, 158, 432, 290],
            [40, 68, 140, 130, 200, 198, 106, 150, 310, 201, 185, 190]
        ],
        [
            [22, 53, 64, 198, 159, 205, 306, 216, 195, 150, 200, 205],
            [43, 21, 56, 54, 234, 65, 67, 129, 430, 209, 109, 185]
        ],
        [
            [24, 56, 67, 32, 65, 21, 190, 289, 389, 194, 301, 105],
            [32, 65, 32, 65, 323, 125, 213, 463, 212, 21, 435, 21]
        ],
        [
            [53, 32, 65, 212, 54, 194, 65, 290, 53, 54, 198, 78],
            [65, 32, 98, 78, 107, 301, 32, 54, 98, 18, 30, 201]
        ]
    ]
    let myChart = echarts.init(document.querySelector('.sales .echart .line'))
    // 折线图
    let option = {
        title: {
            text: '单位 万',
            textStyle: {
                color: '#4996f5',
                fontSize: 14,
            },
            top: 5
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '6%',
            height: 120,
            containLabel: true
        },
        tooltip: {
            // trigger: 'axis',
            // axisPointer: {
            //     type: 'none'
            // }
        },
        legend: {
            data: ['最高额度', '最低额度'],
            right: 10,
            top: 5,
            textStyle: {
                color: '4995f4'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                show: false
            },
            axisLabel: {
                align: 'left',
                color: '#438be5'
            },
            axisLine: {
                lineStyle: {
                    color: '#012b48'
                }
            }
        },
        yAxis: {
            type: 'value',
            max: 500,
            minInterval: 100,
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#438b35'
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#012b48'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#012b48'
                }
            }
        },
        series: [
            {
                name: '最高额度',
                type: 'line',
                data: [24, 40, 101, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                itemStyle: {
                    color: '#00f2f1'
                },
                symbolSize: 10,
                smooth: true
            },
            {
                name: '最低额度',
                type: 'line',
                data: [40, 64, 191, 324, 299, 330, 310, 213, 180, 200, 180, 79],
                itemStyle: {
                    color: '#dd3c36'
                },
                symbolSize: 10,
                smooth: true
            }
        ]
    }
    myChart.setOption(option)

    let saleIndex = 0
    setInterval(function () {
        saleIndex++
        if (saleIndex == 4) {
            saleIndex = 0
        }
        $('.sales h3>a').eq(saleIndex).addClass('active').siblings('a').removeClass('active')
        option.series[0].data = data[saleIndex][0]
        option.series[1].data = data[saleIndex][1]
        myChart.setOption(option)
    }, 5000)
})

$(function () {
    let myChart = echarts.init(document.querySelector('.quarter .echart .loop'))
    let // 环形图
        option = {
            series: [
                {
                    startAngle: 180,
                    name: 'Access From',
                    type: 'pie',
                    radius: ['70%', '90%'],
                    center: ['50%', '60%'],
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {
                            value: 3,
                            name: 'Search Engine',
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0, color: '#83bff6' },

                                    { offset: 1, color: '#188df0' }
                                ])
                            },

                        },
                        {
                            value: 1, name: 'Direct', itemStyle: {
                                color: '#d0274d'
                            }
                        },
                        {
                            value: 4, name: 'Email', itemStyle: {
                                color: 'transparent'
                            }
                        },

                    ]
                }
            ]
        }
    myChart.setOption(option)
})


