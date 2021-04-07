/* eslint-disable */
let start = 0
let timer = -1
export function throttle(fn: () => void, wait: number) {
    const now = Date.now()
    if (now - start >= wait) {
        fn()
        start = now
    }
}
export function debounce(fn: () => void, time: number) {
    if (timer != -1) {
        window.clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
        fn()
        timer = -1
    }, time)
}
function pushUnique(arr: any[], element: any): any[] {
    if (arr.indexOf(element) == -1) {
        arr.push(element)
    }
    return arr
}
function deleteElement(arr: any[], element: any): any[] {
    const index = arr.indexOf(element)
    if (index != -1) {
        arr.splice(index, 1)
    }
    return arr
}
export const ArrayUtil = {
    pushUnique,
    deleteElement
}
//只是为了让ts 语法检查器闭嘴，没有实际意义
interface map{
    [key: string]: number
}
export const timeToStr=(date: Date,fmt: string)=>{
    var o: map = {
        "M+": date.getMonth() + 1 as any, //月份
        "d+": date.getDate() , //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds(), //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k].toString()
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
}