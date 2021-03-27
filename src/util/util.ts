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