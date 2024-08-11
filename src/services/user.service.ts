import { axiosClassic} from "@/api/api.interceptor"
import { IUser, TypeUserDataFilters, USERS } from "./user.interface"

export const UserService =  {

    async getAll(queryData = {} as TypeUserDataFilters){
            return axiosClassic<IUser[]>({
            url: USERS,
            method: 'GET',
            params: queryData
        })
    },
    async getCountUsers(){
        return axiosClassic({
            url: 'users/count',
            method: 'GET',
        })
    },
    async getById(id: string | number){
        return axiosClassic<IUser>({
            url: `${USERS}/${id}`,
            method: 'GET',
        })
    },
    async create(data:IUser){
        return axiosClassic<IUser>({
            url: USERS,
            method: 'POST',
            data
        })
    },
    async update(id: string | number, data: IUser){
        return axiosClassic<IUser>({
            url: `${USERS}/${id}`,
            method: 'PUT',
            data
        })
    },
    async delete(id: string | number){
        return axiosClassic<IUser>({
            url: `${USERS}/${id}`,
            method: 'DELETE',
        })
    },
}
