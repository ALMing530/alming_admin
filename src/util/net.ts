export const createWebsocket=(path: string): WebSocket=>{
    return new WebSocket("ws://localhost:53000/"+path)
}