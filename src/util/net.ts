export const createWebsocket=(path: string): WebSocket=>{
    // return new WebSocket("ws://59.110.164.105:53000/"+path)
    // return new WebSocket("ws://alming.cn:53000/"+path)
    return new WebSocket("ws://localhost:53000/"+path)

}