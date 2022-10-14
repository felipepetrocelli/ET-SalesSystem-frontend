import axios from 'axios'
import { IUserCreate, IUserLogin } from '../../model/User'

const baseUrl = 'http://localhost:3333/'

export const api = axios.create({
    baseURL:baseUrl
})

export const createSession = async(user:IUserLogin) => {
    return await api.post('auth/sesion',user)
}

export const createUser= async(user:IUserCreate):Promise<IUserCreate> => {
    return await api.post('users/create',user)
}