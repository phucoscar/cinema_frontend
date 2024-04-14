import { role } from "./role"

export interface User {
    id: number
    address?: string
    blocked?: boolean
    dateOfBirth?: string
    email?: string
    fullname?: string
    password?:string
    phone?: string
    refreshToken?: string
    role: any
    token?: string
    username?: string
}