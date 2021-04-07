import axios from 'axios'

export const instance = axios.create({
    // baseURL:"http://59.110.164.105:53000"
    baseURL:"http://localhost:53000"
})
export const get = instance.get
export const post = instance.post
export const put = instance.put
export const del = instance.delete