export const unwarp = (obj: any) => obj && (obj.__v_raw || obj.valueOf() || obj)
export const getOptions = (axis: any[],data: any[]) => {
    return {
        tooltip:{
            trigger:"axis"
        },
        legend:{
            data:["CPU占用率"]
        },
        xAxis: {
            type: 'category',
            data: axis
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name:"CPU占用率",
            data: data,
            type: 'line',
            smooth: true
        }]
    };
}