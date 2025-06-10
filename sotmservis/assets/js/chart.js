document.addEventListener('DOMContentLoaded', function () {
    const chartDom = document.getElementById('visitChart');
    const myChart = echarts.init(chartDom);

    const days = ['1-kun', '2-kun', '3-kun', '4-kun', '5-kun', '6-kun', '7-kun', '8-kun', '9-kun', '10-kun'];
    const values = [2, 40, 45, 16, 30, 10, 45, 33, 42, 48];

    const option = {
        animation: false,
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [
            {
                type: 'slider',
                xAxisIndex: 0,
                filterMode: 'filter'
            },
            {
                type: 'inside',
                xAxisIndex: 1,
                filterMode: 'filter'
            }
        ],
        grid: {
            top: 60,
            right: 20,
            bottom: 80,
            left: 50
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#ddd',
            borderWidth: 1,
            textStyle: {
                color: '#333'
            },
            alwaysShowContent: false,
            position: function (point, params, dom, rect, size) {
                return [point[0], point[1] - size.contentSize[1] - 10];
            }
        },
        xAxis: {
            type: 'category',
            data: days,
            axisLine: {
                lineStyle: {
                    color: '#ddd'
                }
            },
            axisLabel: {
                color: function (index) {
                    return index === days.length - 1 ? '#000' : '#666';
                },
                fontSize: 10,
                rotate: 30,
                formatter: function (value, index) {
                    return index === days.length - 1 ? value + '\n(Oxirgi kun)' : value;
                }
            }
        },
        yAxis: {
            type: 'value',
            max: 50,
            interval: 1,
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#eee',
                    size: 10
                }
            },
            axisLabel: {
                color: '#666',
                fontSize: 7
            }
        },
        series: [
            {
                name: 'Bemorlar soni',
                type: 'line',
                data: values,
                smooth: true,
                symbol: 'circle',
                symbolSize: 15,
                itemStyle: {
                    color: function (params) {
                        return params.dataIndex === values.length - 1
                            ? '#ff0000'
                            : 'rgba(252, 141, 98, 1)';
                    },
                    borderColor: '#fff',
                    borderWidth: 2,
                    opacity: 0.7
                },
                emphasis: {
                    itemStyle: {
                        opacity: 1
                    },
                    label: {
                        show: true,
                        formatter: function (params) {
                            return params.value + (params.dataIndex === values.length - 1
                                ? ' (Oxirgi kun)'
                                : '');
                        },
                        position: 'top',
                        color: '#000',
                        backgroundColor: '#fff',
                        borderColor: '#ddd',
                        borderWidth: 1,
                        padding: 5
                    }
                },
                lineStyle: {
                    color: 'rgba(252, 141, 98, 1)',
                    width: 3
                },
                markPoint: {
                    symbol: 'pin',
                    symbolSize: 50,
                    data: [
                        {
                            name: 'Oxirgi kun',
                            coord: [days[days.length - 1], values[values.length - 1]],
                            itemStyle: {
                                color: '#ff0000'
                            },
                            label: {
                                show: true,
                                formatter: 'Oxirgi kun ' + values[values.length - 1],
                                data: values[values.length - 1],
                                position: 'inside',
                                color: '#000'
                            }
                        }
                    ]
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(252, 141, 98, 0.3)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(252, 141, 98, 0.05)'
                            }
                        ]
                    }
                }
            }
        ]
    };

    myChart.setOption(option);

    // Dastlab oxirgi nuqtani ta'kidlash
    myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: values.length - 1
    });

    // Oxirgi nuqta uchun tooltip ko'rsatish
    myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: values.length - 1
    });

    window.addEventListener('resize', function () {
        myChart.resize();
    });
});