export const USERS = 'users'

export interface IUser {
    id: number
    name: string
    surname?:string
    gender?: string
    height?:number
    weight?:number
    placeOfResidence?:string
    avatarPath?:string  
} 

export type TypeUserDataFilters = {
    page?: string | number
    perPage?: string | number
} 
