import { AxiosError} from "axios"
import { ApiResponse } from "../types/APIresponse"
import { LoginInput } from "../types/LoginInput"
import { RegisterInput } from "../types/RegisterInputs";
import { API_service } from "./config/server_service";

export const LoginRequest= async (data:LoginInput) => {
    let request;
    try {
        request = await API_service.post("/auth/login",data)
        return (request.status)
    }
    catch (error) {
        alert((JSON.parse(((error as AxiosError).request.response))as ApiResponse).message) 
        return (((error as AxiosError).toJSON() as ApiResponse).status)
    }        //alert((request.data as ApiResponse))
}

export const RegisterRequest = async (data:RegisterInput) => {
    let request;
    try {
        request = await API_service.post("/auth/register",data)  
        //alert((request.data as ApiResponse).message)
        return (request.status)
    }
    catch (error) {
        //alert((JSON.parse(((error as AxiosError).request.response))as ApiResponse).message) 
        return (((error as AxiosError).toJSON() as ApiResponse).status)
    }
}

export const LogoutRequest = async () => {
    let request;
    try {
        request = await API_service.post("/auth/logout") 
        return (request.status)
    }
    catch(error) {
        return (((error as AxiosError).toJSON() as ApiResponse).status)
    }
}

export const changePassword = async (data:LoginInput) => {
    return data 
}

export const getUserInfo = async () => {
    let request;
    try {
        request = await API_service.get("/me") 
        return (request.data)
    }
    catch(error) {
        return (((error as AxiosError).toJSON() as ApiResponse).status)
    }
} 

export const checkLogin = async () => {
    try {
        await API_service.get("/auth/check")
        return true
    }catch (error) {
        return false
    }
}