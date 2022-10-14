export default interface UserInterface {
    uid: string
    email: string
    nome: string
    token: string
    provedor: string
    imagemUrl: string
}

export interface IUserLogin{
    email:string
    password:string
}

export interface ILogedUser{
    email:string
    id:string
    token:string
}

export interface IUserCreate{
    name:string
    email:string
    password:string
}
