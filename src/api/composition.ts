import { Composition } from "../types/Composition";
import { API_service } from "./config/server_service";


export const SaveComp = async (data:Composition) => { 
    const request = await API_service.put("/composition/save",data)
    return request
}

export const MyComps = async () => {
    const request = await API_service.get("/composition/myComps")
    return request.data
}

export const deleteCompo = async (id:number) => {
    const request = await API_service.delete("composition/delete",{data: {id:id}})
    return request.status
}