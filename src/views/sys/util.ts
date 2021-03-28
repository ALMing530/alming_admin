export const getOptions = (axis: any[],data: any[]) => {
    return {
        title: {
            text: '资源情况'
        },
        tooltip: {},
        legend: {
            data: ['CPU占用率']
        },
        xAxis: {
            data: axis
        },
        yAxis: {},
        series: [{
            name: 'CPU占用率',
            type: 'line',
            data: data
        }]
    }
}