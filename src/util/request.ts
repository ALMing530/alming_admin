import axios from 'axios'

export const instance = axios.create({
    baseURL:"http://localhost:53000"
})
export const get = instance.get
export const post = instance.post
export const del = instance.delete